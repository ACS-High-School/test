pipeline {
 
    tools {
        maven('mvn363')         // 개발 Jenkins에 maven이 'mvn363'이라는 이름으로 설치가 되어 있어 pipeline 스크립트에서 사용을 위해 명시를 해주었다.
    }
 
    environment {
        registry = '052402487676.dkr.ecr.ap-northeast-2.amazonaws.com/jenkins'     // 개발 AWS에 생성한 컨슈머용 ECR 주소
        registryCredential = 'AWS_ECR'                                                                  // Jenkins에 셋팅한 AWS용 Credential ID
        app = ''
    }
 
    agent any
 
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    app = docker.build("jenkins:${version}", "--build-arg ENVIRONMENT=${env} .")   // Docker Build를 하는데 나의 경우 version을 Jenkins 매개변수로 입력 받게 셋팅하였다. Jenkins 매개변수는 ${변수명} 이렇게 사용 가능하다
                }
            }
        }
        stage('Push Image') {
            steps {
                script{
                    docker.withRegistry("https://" + registry, "ecr:ap-northeast-2:" + registryCredential) {   // withRegistry(이미지 올릴 ECR 주소, Credentail ID) 이렇게 셋팅하면 된다.
                        app.push("${version}")   // tag 정보
                        app.push("latest")       // tag 정보
                    }
                }
            }
        }
    }
}
