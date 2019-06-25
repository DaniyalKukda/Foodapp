import { Avatar, Input, List, message, Spin, Tag } from 'antd';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import firebase from '../../../config/firebase';
import reqwest from 'reqwest';
import './resturantusertabview.css';
import { func } from 'prop-types';


const fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo';
const Search = Input.Search;
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Chinese', 'Fast food', ' Bar B.Q', 'Desi'];
const left = { textAlign: 'left' }
class Resturantusertabview extends Component {
    constructor() {
        super();
        this.state = {
            selectedTags: [],
            data: [],
            loading: false,
            hasMore: true,
            AllResturant: []
        };
        this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount() {
        // this.fetchData(res => {
        //     this.setState({
        //         data: res.results,
        //     });
        // });
        this.fetchData();
    }
    fetchData = function () {
        let Resturant = [];
        firebase.firestore().collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let AllUsersData = doc.data();
                if (AllUsersData.type === "Resturant") {
                    Resturant.push(AllUsersData)
                }
            });
            this.setState({
                AllResturant: Resturant
            })
        });
        // reqwest({
        //     url: fakeDataUrl,
        //     type: 'json',
        //     method: 'get',
        //     contentType: 'application/json',
        //     success: res => {
        //         callback(res);
        //     },
        // });

    };

    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 50) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }
    render() {

        console.log("check all resturant",this.state.AllResturant)
        const { selectedTags , AllResturant } = this.state;
        return (
            <div>
                <div className="searchandtagcenter">
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 1000 }}
                    />
                    <div className="tags-container">
                        <h6 style={{ marginRight: 8, display: 'inline', fontSize: '1.1em' }}>Search Main Categories:</h6>
                        {tagsFromServer.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTags.indexOf(tag) > -1}
                                onChange={checked => this.handleChange(tag, checked)}
                            >
                                {tag}
                            </CheckableTag>
                        ))}
                    </div>
                </div>
                <div style={left}>
                    <div className="demo-infinite-container">
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.loading && this.state.hasMore}
                            useWindow={false}
                        >
                            <List
                                dataSource={AllResturant}
                                renderItem={item => (
                                    <List.Item key={Math.random(50)}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar>{item.resturantName.substr(0,1)}</Avatar>
                                            }
                                            title={<a href="/home/detail-view">{item.resturantName}</a>}
                                            description={item.email}
                                        />
                                    </List.Item>
                                )}
                            >
                                {this.state.loading && this.state.hasMore && (
                                    <div className="demo-loading-container">
                                        <Spin />
                                    </div>
                                )}
                            </List>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        )
    }
}
export default Resturantusertabview