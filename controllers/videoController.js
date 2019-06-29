import routes from "../routes";
import Video from "../models/Video";

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
export const home = async (req, res) => {
  try{
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home",  { pageTitle: "Home" ,videos});
  }catch(error){
    console.log(error);
    res.render("home",  { pageTitle: "Home" ,videos:[]});
  }
}

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
export const search = async (req, res) =>{
  const {
    query : {term: searchingBy}
  } = req;
  let videos = [];
  try{
    videos = await Video.find({
      title:{$regex: searchingBy, $options: "i"}
    });
  } catch(error){
    console.log(error);
  }
  res.render("search",{pageTitle:"Search", searchingBy, videos})
}

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = async (req, res) => {
  /*

  < ES 6 이전 문법 >

    const title = req.body.title;
    const description = req.body.description;
    const path = req.body.file.path

  */
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({
     fileUrl: path,
     title,
     description
   });
   res.redirect(routes.videoDetail(newVideo.id));

}


export const videos = (req, res) => res.render("videos", { pageTitle: "Videos" });
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};


export const getEditVideo = async(req, res) => {
  const {
    params : {id}
  } = req;
  try{
    const video = await Video.findById(id);
    res.render("editVideo", {pageTitle:`Edit ${video.title}`, video});
  } catch (error){
    res.redirect(routes.home);
  }
}
export const postEditVideo = async(req, res) =>{
  const{
    params:{id},
    body:{title, description}
  } = req;
  try{
    await Video.findOneAndUpdate({_id:id}, {title, description});
    res.redirect(routes.videoDetail(id));
  } catch(error){
    res.redirect(routes.home);
  }
}

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
