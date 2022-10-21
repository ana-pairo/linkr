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

function getPostLikes(postId) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `/likes/${postId}`, header);
  return promise;
}

function likePost(postId) {
  const header = createHeader();
  const promise = axios.get(BASE_URL + `/like/${postId}`, header);
  return promise;
}

function unlikePost(postId) {
  const header = createHeader();
  const promise = axios.delete(BASE_URL + `/like/${postId}`, header);
  return promise;
}

export { signUp, signIn, validToken, getPostLikes, likePost, unlikePost };
