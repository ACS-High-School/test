node {
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        // ECR 레포지토리 주소로 이미지 빌드
        app = docker.build("052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins/my-nodejs-app")
    }

    stage('Push image') {
        sh 'rm ~/.dockercfg || true'
        sh 'rm ~/.docker/config.json || true'
        
        // ECR 레포지토리 주소 및 Jenkins에서 설정한 자격증명 ID로 변경
        docker.withRegistry('https://052402487676.dkr.ecr.ap-northeast-2.amazonaws.com', 'ecr:ap-northeast-2:AWS_CREDENTIALS') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}
