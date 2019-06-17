import firebase from '../config/firebase'

export const signupAuth = (data) => {
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
            firebase.firestore().collection('users').doc(res.user.uid)
                .set(data).then((suceess) => {
                    firebase.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        alert("user has been created sucessfully please verify the email first")
                    }).catch((err) => {
                        console.log(err)
                    }) 
                }).catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}