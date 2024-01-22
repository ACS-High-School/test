pipeline {
    agent any

    environment {
        // ECR 레지스트리 주소를 환경 변수로 설정합니다.
        ECR_REGISTRY = '052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins'
        // 이미지 태그를 환경 변수로 설정합니다.
        IMAGE_TAG = 'my-nodejs-app:latest'
        // AWS 자격 증명 ID를 설정합니다. Jenkins에 구성된 실제 자격 증명 ID로 교체해야 합니다.
        AWS_CREDENTIALS_ID = 'AWS_ECR'
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
                    // Docker 이미지 빌드
                    sh "docker build -t ${ECR_REGISTRY}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    // AWS CLI를 사용하여 ECR에 로그인합니다.
                    sh "aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                    // 빌드된 Docker 이미지를 ECR에 푸시합니다.
                    sh "docker push ${ECR_REGISTRY}:${IMAGE_TAG}"
                }
            }
        }
    }
}
