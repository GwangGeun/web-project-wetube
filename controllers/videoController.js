import {videoList} from "../db";
import routes from "../routes";
/*

  < Global하게 변수를 사용하는 방법 >

    1. res.locals ( 요청 기간 동안에만 유효하다. 본 코드에서는 middlewares.js 참고 )

    - 데이터 받는 법

      : export const home = (req, res) => console.log(res.locals.변수);

    2. app.locals ( 요청 기간의 개념이 없음. application 자체가 살아있는 동안 유효 )

     - 데이터 받는 법

       : export const home = (req, res) => console.log(req.app.변수);

  < 참고 자료>

     - https://stackoverflow.com/questions/35111143/express4-whats-the-difference-between-app-locals-res-locals-and-req-app-local/35111195
     - http://expressjs.com/en/api.html#res.locals

*/
export const home = (req, res) => res.render("home",  { pageTitle: "Home",videoList });

/*

  < ES6 이전에 queryString 받는 방법 >

    const searchingBy = req.query.term;

  < ES6 : destructuring >

    const {
      query : {term: searchingBy}
    } = req;

  < 참고 자료 >

     - https://poiemaweb.com/es6-destructuring
     - https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js

*/
export const search = (req, res) =>{
  const {
    query : {term: searchingBy}
  } = req;
  res.render("search",{pageTitle:"Search", searchingBy, videoList})
}

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = (req, res) => {
  const {
    body:{file,title,description}
  } = req;
  res.redirect(routes.videoDetail(123213));
}


export const videos = (req, res) => res.render("videos", { pageTitle: "Videos" });
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });
