# Node.js 공식 이미지를 사용합니다.
FROM node:14

# 앱 디렉토리를 생성합니다.
WORKDIR /usr/src/app

# 애플리케이션 코드를 복사합니다.
COPY . .

# 앱이 8080 포트에서 수신 대기하도록 설정합니다.
EXPOSE 8080

# 서버를 시작하는 명령어입니다. 
CMD [ "node", "server.js" ]
