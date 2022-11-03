![메인 소개 이미지](https://qportminiprojectmini.s3.ap-northeast-2.amazonaws.com/post/1666864365169.jpeg)

---------------------------

# ✨Q-Port (Question Port)

- **모든 궁금증과 답이 연결되어 있는 통로.**

# 📆 프로젝트 기간

- 2022/10/21 ~ 2022/10/27

# 👒 팀 소개
| 역할 | 이름 | git |
| ------ | -- | ----|
| Back-end | 왕준혁 | https://github.com/Monggle88|
| Back-end | 최원선 | https://github.com/wonsunny|
| Back-end | 장용호 | https://github.com/JangKroed|
| Front-end | 한세준 | https://github.com/hansejun|
| Front-end | 이민기 | https://github.com/Pasilda123|  


# 👔 Project Architecture

![아키텍처](https://qportminiprojectmini.s3.ap-northeast-2.amazonaws.com/post/1666853140031.png)


# 🩳 API 명세서
[▶ Q-Port REST API 바로가기](https://www.notion.so/88eac097402442b4a0e7d54d5fc60c77?v=ce5ebdb9fb1a44dcb1842f8022d5bfd7)

# 🧦 DB 설계도(ERD)
![erd최최치최최최최최최최치ㅗ치ㅚ최최최최종](./img/ERD.png)



# 👟 사용한 라이브러리(패키지)


### ✅ 백엔드에서 이미지 처리를 한 이유

- 이미지 용량 제한을 할 수 있고, DB와 S3를 연동하여 확실한 데이터 처리가 가능함. 예를 들어, 유저가 게시물을 삭제하거나 회원 탈퇴할 경우, 어떤 유저의 파일인지 추적, 처리하여 메모리 낭비를 줄이고, 데이터의 무결성을 증대할 수 있음.



### ✅ 관계형 데이터베이스(RDBMS)를 사용한 이유

- 프로젝트 구조 상 유저를 중심으로 관계를 맺는 데이터가 많기 때문에 DB indexing으로 데이터 관리를 용이하게 함.



### ✅ 왜 session이 아닌 jwt방식을 선택했을까?

- **세션 방식**은 서버의 메모리 내부에 유저의 정보를 저장함. 유저의 수가 증가할수록 세션의 양이 많아지는 만큼 메모리에 부하가 걸릴 수 있음. 실제 서비스 배포를 위한 프로젝트에서는 유저의 수가 적지 않을 거라 예상하여 **JWT 토큰 인증방식** 선택. JWT는 서버의 메모리에 저장 공간을 확보하지 않고 토큰 발급 및 확인 절차만 거치므로 서버 자원과 비용을 절감할 수 있음.
- 하지만 현재 Q-Port의 **jwt 방식은 토큰의 유효기간이 만료되지 않으면 소멸하지 않기 때문에 토큰 탈취, 해킹 등 보안에 취약점을 가지고 있음. access token/refresh token으로 변경하여 보안 강화 필요.**

# 💍 기술 소개

```json

"dependencies"
	
    "aws-sdk": "^2.1238.0",     // aws 서비스를 사용하기 위한 라이브러리
    "bcrypt": "^5.0.1",         // 비밀번호 해쉬화를 위한 라이브러리
    "cookie-parser": "^1.4.6",  // 요청 된 쿠키를 추출 할 수있게 해주는 미들웨어
    "cors": "^2.8.5",           // CORS 이슈 해결을 위한 라이브러리
    "bcrypt": "^5.1.0",         // 유저 비밀번호 해쉬를 위한 라이브러리
    "dotenv": "^16.0.3",        //.env의 정보를 환경변수로 등록해주는 라이브러리
    "express": "^4.18.2",       // 웹 서버를 구현하기 위한 라이브러리
    "helmet": "^6.0.0",         // header에 설정을 통해 웹 취약점으로부터 서버 보호
    "jsonwebtoken": "^8.5.1",   // jwt로그인 방식을 위한 라이브러리
    "multer": "^1.4.5-lts.1",   // image를 form데이터로 받기 위한 라이브러리
    "multer-s3": "^2.10.0",     // aws s3를 multer와 연결해주는 라이브러리
    "mysql2": "^2.3.3",         // mysql을 사용할 수 있게 해주는 라이브러리
    "joi": "^17.6.4",           // 들어오는 입력값에 대한 유효성 검사를 해주는 
    "prettier": "^2.7.1",       // 코드 컨벤션을 위한 라이브러리
    "sequelize": "^6.25.3",     // ORM 라이브러리
    

"devDependencies": {
    "sequelize-cli": "^6.4.1",   // Sequelize 지원 라이브러리
    "nodemon": "^2.0.20",        // 서버 재 가동을 쉽게 해주는 라이브러리
    "morgan": "^1.10.0",         // 통신 로그를 남기기 위한 라이브러리
  }
  
```

# 💎트러블 슈팅

