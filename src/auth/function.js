import firebase from "./firebase";

export const addInfo = (info) => {
  console.log("add info geldi");
  const blogRef = firebase.database().ref("blog");
  blogRef.push(info);
};
