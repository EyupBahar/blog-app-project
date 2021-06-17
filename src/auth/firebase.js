import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCLgD5Rb4gMPZ4iXBFpTdGlvb-tBKpum68",
  authDomain: "blog-app-milestone.firebaseapp.com",
  projectId: "blog-app-milestone",
  databaseURL: "https://blog-app-milestone-default-rtdb.firebaseio.com",
  storageBucket: "blog-app-milestone.appspot.com",
  messagingSenderId: "577408861375",
  appId: "1:577408861375:web:c165ec047139f47620720a",
});
export const createUser = async (
  email,
  password,
  displayName,
  photo,
  history
) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("🚀 REGISTER USER", user);
        history.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    const currentUser = firebase.auth().currentUser;
    currentUser.updateProfile({ displayName: displayName, photoURL: photo });
  } catch (error) {
    alert("The email address is already in use by another account!");
  }
};
export const SignIn = async (email, password, history) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("🚀 LOGIN USER", user);
      history.push("/");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
};
export const userObserver = async (setCurrentUser) => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      // User is signed out
      setCurrentUser(null);
    }
  });
};

export const SignUpProvider = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    promt: "select_account",
  });
  firebase.auth().signInWithPopup(provider);
};
export const SignOut = (history) => {
  firebase.auth().signOut();
  history.push("/login");
};
export const addInfo = (info) => {
  const blogRef = firebase.database().ref("blog");
  blogRef.push(info);
};

export const useFetch = () => {
  const [blogList, setBlogList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const blogRef = firebase.database().ref("blog");
    blogRef.on("value", (snapshot) => {
      const blogs = snapshot.val();
      const blogArray = [];
      for (let id in blogs) {
        blogArray.push({ id, ...blogs[id] });
      }
      setBlogList(blogArray);
      setIsLoading(false);
    });
  }, []);
  return { blogList, isLoading };
  console.log("useFetch", blogList);
};
export default firebaseApp;
