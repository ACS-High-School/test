pipeline {
    agent any
    environment {
        // 환경 변수 설정
        PATH = "/usr/local/bin:/opt/homebrew/bin:$PATH" // Docker 및 AWS CLI 경로 추가
        DOCKER_REPO_URI = "052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        AWS_CREDENTIALS_ID = "AWS_ECR"
        DEPLOYMENT_FILE = "node/deployment.yaml" // 파일 경로 수정
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_REPO_URI}:${IMAGE_TAG} ."
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${DOCKER_REPO_URI}"
                    sh "docker push ${DOCKER_REPO_URI}:${IMAGE_TAG}"
                }
            }
        }
        stage('Update Deployment File') {
            steps {
                def previousTag = sh(script: "echo $((BUILD_NUMBER - 1))", returnStdout: true).trim()
                
                withCredentials([usernamePassword(credentialsId: 'GitCredential', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                    script {
                        sh "git config --local credential.helper '!f() { echo username=\\$GIT_USERNAME; echo password=\\$GIT_PASSWORD; }; f'"
                        // deployment.yaml 파일에서 이미지 태그를 업데이트합니다.
                        sh "sed -i 's/${DOCKER_REPO_URI}:${previousTag}/${DOCKER_REPO_URI}:${env.NEW_TAG}/g' ${DEPLOYMENT_FILE}"

                        // 변경 사항을 git에 커밋하고 푸시합니다.
                        sh """
                        git add ${DEPLOYMENT_FILE}
                        git commit -m 'Update the image tag to ${env.NEW_TAG}'
                        git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/ACS-High-School/test.git HEAD:main
                        """
                }
            }
        }
    }
    post {
        success {
            echo 'Build and push process completed successfully.'
        }
        failure {
            echo 'Build and push process failed.'
        }
    }
}
