pipeline {
    agent any
    environment {
        // 환경 변수 설정
        PATH = "/usr/local/bin:/opt/homebrew/bin:$PATH" // Docker 및 AWS CLI 경로 추가
        DOCKER_REPO_URI = "052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        AWS_CREDENTIALS_ID = "AWS_ECR"
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
