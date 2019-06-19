import React from 'react';
import { message } from 'antd';
import firebase from '../config/firebase';

const Login = (data) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then((success) => {
      let uid = success.user.uid;
      var docRef = firebase.firestore().collection("users").doc(uid);

      docRef.get().then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).then((res) => {
        resolve(res)
      })
        .catch((error) => {
          reject(error)
        });

    }).catch((err) => {
      message.error(err.message)
      console.log(err.message)
    })
  })

}

export default Login