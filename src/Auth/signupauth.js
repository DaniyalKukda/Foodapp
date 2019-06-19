import React from 'react'
import firebase from '../config/firebase'
import { message } from 'antd'
export const signupAuth = (data) => {
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
            firebase.firestore().collection('users').doc(res.user.uid)
                .set(data).then((suceess) => {
                    firebase.auth().currentUser.sendEmailVerification()
                        .then(() => {
                            message.success("user has been created sucessfully please verify the email first");
                        }).catch((err) => {
                            console.log(err);
                            message.error(err.message);
                        })
                }).catch((err) => {
                    console.log(err);
                    message.error(err.message);
                })
        })
        .catch((err) => {
            console.log(err);
            message.error(err.message);
        })
}
export const ResturantRegistration = (data) => {
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((success) => {
            let storageRef = firebase.storage().ref().child(`certificate/${data.file.name}`)
            storageRef.put(data.file).then((url) => {
                url.ref.getDownloadURL().then((urlref) => {
                    data.file = urlref;
                    let userId = firebase.auth().currentUser.uid;
                    firebase.firestore().collection('users').doc(userId)
                        .set(data).then((suceess) => {
                            firebase.auth().currentUser.sendEmailVerification()
                                .then(() => {
                                    message.success("user has been created sucessfully please verify the email first");
                                    // alert("user has been created sucessfully please verify the email first")
                                }).catch((err) => {
                                    console.log(err);
                                    message.error(err.message);
                                })
                        }).catch((err) => {
                            console.log(err);
                            message.error(err.message);
                        })

                }).catch((err) => {
                    console.error(err.message);
                    console.log(err);
                    message.error(err.message);
                })

            }).catch((err) => {
                console.error(err.message);
                console.log(err);
                message.error(err.message);
            })
        }).catch((err) => {
            console.error(err.message);
            console.log(err);
            message.error(err.message);
        })
}