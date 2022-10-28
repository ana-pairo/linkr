import axios from "axios";

//const BASE_URL = "https://linkr-agij-api.herokuapp.com/";
const BASE_URL = "http://localhost:4000/";

function createHeader() {
  const auth = JSON.parse(localStorage.getItem("Linkr"));
  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };
  return config;
}

function signUp(body) {
  const promise = axios.post(BASE_URL + "sign-up", body);
  return promise;
}

function signIn(body) {
  const promise = axios.post(BASE_URL + "sign-in", body);
  return promise;
}

function validToken() {
  const header = createHeader();
  const promise = axios.get(BASE_URL + "token", header);
  return promise;
}

function listPosts(number) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + "timeline/" + number, header);
  return promise;
}

function getQuant() {
  const header = createHeader();
  const promise = axios.get(BASE_URL + "quant", header);
  return promise;
}

function listUsersSearch(search) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + "user/search/" + search, header);
  return promise;
}

function listPostsByUser(id) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + "user/" + id, header);
  return promise;
}

function listPostsByHashtag(hashtag) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + "hashtag/" + hashtag, header);
  return promise;
}

function getPostLikes(postId) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `likes/${postId}`, header);
  return promise;
}

function likePost(postId) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `like/${postId}`, header);
  return promise;
}

function unlikePost(postId) {
  const header = createHeader();
  const promise = axios.delete(BASE_URL + `like/${postId}`, header);
  return promise;
}

function deletePostById(postId) {
  const header = createHeader();
  const promise = axios.delete(BASE_URL + `post/${postId}`, header);
  return promise;
}

function createPost(body) {
  const header = createHeader();
  const promise = axios.post(BASE_URL + `post/`, body, header);
  return promise;
}

function getHashtags() {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `hashtags`, header);
  return promise;
}

function updatePost(postId, body) {
  const header = createHeader();
  const promise = axios.patch(BASE_URL + `post/${postId}`, body, header);
  return promise;
}

function checkFollows(body) {
  const header = createHeader();
  const promise = axios.post(BASE_URL + "followed", body, header);
  return promise;
}

function follow(body) {
  const header = createHeader();
  const promise = axios.post(BASE_URL + "follow", body, header);
  return promise;
}

function getTotalPostShares(postId) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `shares/${postId}`, header);
  return promise;
}

function sharePost(postId) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `share/${postId}`, header);
  return promise;
}

function getTotalComments(postId) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `comments/${postId}`, header);
  return promise;
}

function getOriginalPostUserData(postId) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `userdata/${postId}`, header);
  return promise;
}

function commentPost(postId, body){
  const header = createHeader();
  const promise = axios.post(BASE_URL + `comments/${postId}`, body, header);
  return promise;
}

function getFollowersByUser(userId){
  const header = createHeader();
  const promise = axios.get(BASE_URL + `followers/${userId}`, header);
  return promise;
};

export {
  signUp,
  signIn,
  validToken,
  listPosts,
  listUsersSearch,
  listPostsByUser,
  listPostsByHashtag,
  getPostLikes,
  likePost,
  unlikePost,
  deletePostById,
  createPost,
  getHashtags,
  updatePost,
  getTotalPostShares,
  sharePost,
  checkFollows,
  follow,
  getTotalComments,
  getQuant,
  getOriginalPostUserData,
  commentPost,
  getFollowersByUser
};
