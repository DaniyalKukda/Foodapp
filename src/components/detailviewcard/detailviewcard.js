import React from 'react';
import { Card, Button, Avatar } from 'antd';

const { Meta } = Card;

export default function detailviewcard(props) {
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
            actions={[props.type === "Resturant" ? <Button size={"medium"}>
                Edit Item
        </Button> : <Button size={"medium"}>
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