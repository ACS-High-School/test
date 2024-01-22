pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-app:latest'
        ECR_REGISTRY = '052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins'
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
                    docker.build("${ECR_REGISTRY}:${DOCKER_IMAGE}")
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    docker.withRegistry('https://${ECR_REGISTRY}', 'ecr:region:my-aws-credentials') {
                        docker.image("${ECR_REGISTRY}:${DOCKER_IMAGE}").push()
                    }
                }
            }
        }
    }
}
