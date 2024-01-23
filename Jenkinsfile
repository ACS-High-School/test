node {
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        // ECR 레포지토리 주소로 이미지 빌드
        app = /opt/homebrew/bin/docker.build("052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins")
    }

    stage('Push image') {
        // 현재 사용자의 Docker 자격 증명 삭제
        sh 'rm ~/.dockercfg || true'
        sh 'rm ~/.docker/config.json || true'

        // Docker 레지스트리에 로그인하고 이미지를 푸시
        docker.withRegistry('https://052402487676.dkr.ecr.ap-northeast-2.amazonaws.com', 'ecr:ap-northeast-2:AWS_ECR') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}
