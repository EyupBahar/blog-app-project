import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBR0JwJUM21hHdUnQztLk6M3_dmMrm7QAg",
  authDomain: "blog-app-test-ae4ce.firebaseapp.com",
  projectId: "blog-app-test-ae4ce",
  storageBucket: "blog-app-test-ae4ce.appspot.com",
  messagingSenderId: "115566828331",
  appId: "1:115566828331:web:31793ddf32555b78b2836e",
  measurementId: "G-J5FNNDWENR",
  databaseURL: "https://blog-app-test-ae4ce-default-rtdb.firebaseio.com"
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
