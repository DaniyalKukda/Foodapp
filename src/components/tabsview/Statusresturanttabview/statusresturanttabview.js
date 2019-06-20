import React, { Component } from 'react'
import { List, Avatar } from 'antd';
import './statusresturanttabview.css'

const center = {
    display:"flex",
    justifyContent:"center"
}

class Statusresturanttabview extends Component {
    render() {
        var filt = this.props.data.filter((e) => {
            return e.status === this.props.type
        })
        return (
            <div style={center}>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={filt}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />,
                </div>

            </div>
        )
    }
}

export default Statusresturanttabview;
