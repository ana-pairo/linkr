import axios from "axios";

const BASE_URL = "http://localhost:4000/"; //link da url

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

function listPosts() {
  const header = createHeader();
  const promise = axios.get(BASE_URL + "timeline", header);
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
  updatePost
};