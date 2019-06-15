// const express = require("express");
import express from "express";
// morgan (로깅) 공식 홈페이지 : https://www.npmjs.com/package/morgan
import morgan from "morgan";
// helmet (보안) 공식 홈페이지 : https://www.npmjs.com/package/helmet
import helmet from "helmet";
// cookieParser (쿠키) 공식 홈페이지 : https://www.npmjs.com/package/cookie-parser
import cookieParser from "cookie-parser";
// bodyParser (post 요청) 공식 홈페이지 : https://www.npmjs.com/package/body-parser
import bodyParser from "body-parser";
// ES6 의 export 및 import 관련 참고 자료 : https://enyobook.wordpress.com/2016/08/17/export-default%EC%97%90-%EB%8C%80%ED%95%B4/
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";


const app = express();
app.set("view engine", "pug");
/*

< middleware 사용법 >

  const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
  };


<  app 전체에 미들웨어를 적용하고 싶을 때는 아래와 같이 적용 >

 : app.use(betweenHome);


< 특정 route 에만 미들웨어를 적용하고 싶을 때 >

 : app.get("/profile", betweenHome, handleProfile);


 < 미들웨어로써 응답을 끝내버리고 싶은 경우. 즉, 최종 res 함수가 호출되기를 원하지 않은 경우 >

   const betweenHome = (req, res, next) => {
      res.send("not happening");
   };

 : 응답을 middleware 에서 보내버린다.

*/
// 기본적인 보안을 해주는 설정 ( TODO: 추후 어떤 보안들을 해주는지 검토 해 보기 )
app.use(helmet());
app.use(cookieParser());
// parse application/json ( json data 받기 위한 목적)
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded ( form data 받기 위한 목적 )
app.use(bodyParser.urlencoded({ extended: true }));
// 접속 log 를 남겨주는 설정 ( log 를 남기는 방법 및 테마에 대한 여러 설정들이 있음 )
app.use(morgan("dev"));
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);



export default app;
