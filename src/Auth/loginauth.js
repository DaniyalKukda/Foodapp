const Login = (data) => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then((success)=>{
        let uid = success.user.uid;
       firebase.database().ref("user/"+uid).on("value", (value) =>{
         let data = value.val();
         localStorage.setItem("user",JSON.stringify(data))
         if(data.accountType === "admin"){
          swal(data.name , "Successfully Login...!" , "success");
          this.props.history.push("/admin")
         }else if(data.accountType === "company"){
          swal(data.name, "Successfully Login...!" , "success");
          this.props.history.push("/company")
         }if(data.accountType === "student"){
          swal(data.name, "Successfully Login...!" , "success");
          this.props.history.push("/student")
         }
       })  
     }).catch((err)=>{
      swal("Error", err.message , "error");
    })}

export default Login