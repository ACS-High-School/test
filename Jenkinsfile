pipeline {
    agent any

    environment {
        // 환경 변수 설정
        DOCKER_IMAGE = 'my-app:latest'
        // ECR 레지스트리 주소를 스크린샷에서 확인된 주소로 수정
        ECR_REGISTRY = '052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins'
        // AWS 자격 증명을 위한 변수 (실제 자격 증명 ID로 교체해야 함)
        AWS_CREDENTIALS_ID = 'AWS_ECR'
    }

    stages {
        stage('Checkout') {
            steps {
                // 소스 코드 체크아웃
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // ECR 레지스트리와 이미지 이름을 사용하여 Docker 이미지 빌드
                    docker.build("${ECR_REGISTRY}:${DOCKER_IMAGE}")
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    // AWS 자격 증명을 사용하여 ECR 레지스트리에 로그인
                    docker.withRegistry("https://${ECR_REGISTRY}", AWS_CREDENTIALS_ID) {
                        // 빌드된 Docker 이미지를 ECR에 푸시
                        docker.image("${ECR_REGISTRY}:${DOCKER_IMAGE}").push()
                    }
                }
            }
        }
    }
}
