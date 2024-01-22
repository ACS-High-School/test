pipeline {
    agent any

    environment {
        // 환경 변수 설정
        IMAGE_TAG = 'latest'
        ECR_REGISTRY = '052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins'
        IMAGE_NAME = 'my-nodejs-app'
        FULL_IMAGE_NAME = "${ECR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
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
                    // 'test/node/' 디렉토리 안에서 Docker 이미지를 빌드합니다.
                    dir('test/node') {
                        sh "/opt/homebrew/bin/docker build -t ${FULL_IMAGE_NAME} ."
                    }
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    // ECR에 로그인합니다.
                    sh "aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                    // Docker 이미지를 ECR로 푸시합니다.
                    sh "docker push ${FULL_IMAGE_NAME}"
                }
            }
        }
    }
}
