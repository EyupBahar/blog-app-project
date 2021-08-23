import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD1QzuRVroNS_VnNKqWkVPa58cns6rVFMA",
  authDomain: "fir-blog-app-ea4a7.firebaseapp.com",
  databaseURL: "https://fir-blog-app-ea4a7-default-rtdb.firebaseio.com",
  projectId: "fir-blog-app-ea4a7",
  storageBucket: "fir-blog-app-ea4a7.appspot.com",
  messagingSenderId: "19278408890",
  appId: "1:19278408890:web:ca57b4178c0ec138e46683"
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
        // console.log("🚀 REGISTER USER", user);
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
      var user = userCredential.user;
      console.log("🚀 LOGIN USER", user);
      history.push("/");
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

export const updateHandler = (info) => {
  console.log(info);
  const updateBlogRef = firebase.database().ref("blog").child(info.id);
  updateBlogRef.update(info);
};

export const getSingle = async (id, setPost) => {
  const singleBlog = await firebase.database().ref("blog/" + id);
  singleBlog.on("value", (snapshot) => {
    const data = snapshot.val();
    setPost(data);
  });
};

export const useFetch = () => {
  const [blogList, setBlogList] = useState([{ author: null }]);
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
};
export default firebaseApp;
