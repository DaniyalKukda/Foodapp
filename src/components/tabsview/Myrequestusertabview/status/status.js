import React, { Component } from 'react'
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

class 
RestaurantViewShowRequest extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.filter((e) => {
                        if (this.props.type === 'all') return true
                        else {
                            return e.status === this.props.type
                        }
                    }).map((e, i) => {
                        return (
                            <div style={{ float: "left" }}>
                                <Card
                                    key={i}
                                    style={{ width: 300, margin: '10px 10px' }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={e.picture}
                                            height="250px"
                                            width="300px"
                                        />
                                    }
                                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                                >
                                    <Meta
                                        avatar={<Avatar>{e.customerName.substr(0,1)}</Avatar>}
                                        title={e.ItemName}
                                    />
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RestaurantViewShowRequest;
