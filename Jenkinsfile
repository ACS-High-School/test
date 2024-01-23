pipeline {
    agent any

    environment {
        // 환경 변수
        IMAGE_NAME = '052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins/my-nodejs-app'
        ECR_PATH = '052402487676.dkr.ecr.ap-northeast-2.amazonaws.com'
        REGION = 'ap-northeast-2'
        AWS_CREDENTIAL_NAME = 'AWS_ECR' // Jenkins에서 설정한 자격증명 ID
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('dockerizing project by dockerfile') {
            steps {
                script {
                    sh '''
                    /opt/homebrew/bin/docker build -t $IMAGE_NAME:$BUILD_NUMBER .
                    /opt/homebrew/bin/docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:latest
                    '''
                }
            }
            post {
                success {
                    echo 'success dockerizing project'
                }
                failure {
                    error 'fail dockerizing project' // exit pipeline
                }
            }
        }

        stage('upload aws ECR') {
            steps {
                script {
                    // Cleanup current user docker credentials

                    
                    // AWS 자격증명을 사용하여 ECR에 로그인합니다.
                    sh "/opt/homebrew/bin/aws ecr get-login-password --region ${REGION} | /opt/homebrew/bin/docker login --username AWS --password-stdin ${ECR_PATH}"
                    
                    // Docker 이미지를 ECR로 푸시합니다.
                    sh "/opt/homebrew/bin/docker push $IMAGE_NAME:$BUILD_NUMBER"
                    sh "/opt/homebrew/bin/docker push $IMAGE_NAME:latest"
                }
            }
            post {
                success {
                    echo 'success upload image'
                }
                failure {
                    error 'fail upload image' // exit pipeline
                }
            }
        }
    }
}
