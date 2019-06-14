import React from 'react'
import Signin from '../signIn/Signin';
import Signup from '../signup/signup';
import './index.css'
class Signinandsignupmain extends React.Component {
    render() {
        return (
            <div className="mainDiv">
                <h1 className="heading">Food App</h1>
                <span className="line"></span>
                {/* <Signin /> */}
                <Signup />
            </div>
        )
    }
}
export default Signinandsignupmain