pipeline {
    agent any
    environment {
        // 환경 변수 설정
        DOCKER_REPO_URI = "052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins"
        IMAGE_TAG = "latest"
        AWS_CREDENTIALS_ID = "AWS_ECR"
        PATH = "/opt/homebrew/bin:$PATH"
    }
    }
    stages {
        stage('Checkout') {
            steps {
                // GitHub 레포지토리에서 소스 코드를 가져옵니다.
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Docker 이미지를 빌드합니다.
                    sh "docker build -t ${DOCKER_REPO_URI}:${IMAGE_TAG} ."
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    // ECR에 로그인합니다.
                    sh "aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${DOCKER_REPO_URI}"
                    // Docker 이미지를 ECR로 푸시합니다.
                    sh "docker push ${DOCKER_REPO_URI}:${IMAGE_TAG}"
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
