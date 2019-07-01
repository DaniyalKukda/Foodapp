import React from 'react';
import { Card, Button, Avatar } from 'antd';
import firebase from "../../config/firebase";
import {message} from "antd"
const { Meta } = Card;

export default function detailviewcard(props) {
    const orderNow = () => {
        let userid = props.userData.uid;
        let order ={
            ResturantID : props.resturantID,
            itemId : props.docid,
            ItemName : props.name,
            customerName: props.userData.fullName,
            status:"pending",
            picture:props.picture
        }
        console.log(order,userid)
        firebase.firestore().collection("Order").doc(userid).collection("All Orders").doc().set(order).then((res) => {
            message.success("Order Request Has Been Send Successfully")
        }).catch((err)=>{
            message.error(err.message)
            console.log(err.messsage)
        })
    }
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src={props.picture}
                    className="card-img"
                />
            }
            actions={[props.userData.type === "Resturant" ? <Button size={"medium"}>
                Edit Item
        </Button> : <Button size={"medium"} onClick={() => orderNow()}>
                Order Now!
        </Button> ]}
        >
            <Meta
                avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{props.name.substr(0,1)}</Avatar>}
                title={props.name}
                description={props.description}
            />
        </Card>
    );
}