import React, { Component } from 'react';
import { Tag } from 'antd';
import './detailview.css'
import Navbar from '../navbar/navbar';
import Banner from '../Banner/banner';
import Card from "../detailviewcard/detailviewcard";
import firebase from "../../config/firebase";
import { connect } from "react-redux";

const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['All', 'Fastfood', 'veg', 'salad'];

class Detailview extends Component {
    state = {
        selectedTags: "All",
        FoodItem: [],
        resturantData:[],
        id: this.props.match.params.id
    };
    componentDidMount() {
        this.fetchFoodItemsForResturant()
        this.fetchReasturantData()
    }

    fetchFoodItemsForResturant() {

        firebase.firestore().collection('fooditems').doc(this.state.id).collection("AllItems").onSnapshot((success) => {
            // console.log(success.data())
            let arr = []
            success.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                arr.push(doc.data())
                //    console.log(data[0])
                this.setState({ FoodItem: arr })
            })

        })


    }
    fetchReasturantData(){
        var docRef = firebase.firestore().collection("users").doc(this.state.id);
        docRef.get().then((doc) => {
          let data = doc.data();
            if (data.type === "Resturant") {
               this.setState({
                   resturantData:data
               })
               console.log(data)
            }
             
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        console.log("tags>", tag)
        console.log("checked>", checked)
        console.log("selected>", selectedTags)
        this.setState({ selectedTags: tag })
        // const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        // console.log('You are interested in: ', nextSelectedTags);
        // this.setState({ selectedTags: nextSelectedTags });
    }
    render() {
        const { selectedTags, FoodItem ,resturantData} = this.state;
        console.log(resturantData)
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Banner user={resturantData} />
                </div>
                <div>
                    <h1 className="our-menu-heading">Our Menu</h1>
                </div>
                <div>
                    <div className="tag-con">

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
                <div className="All-food-items">
                    {
                        selectedTags === "All" ?
                            FoodItem.length && FoodItem.map((e, i) => {
                                console.log("eeeeee", e.category)
                                return <div className="card-container"><Card name={e.fooditem} type={this.props.user.type} description={e.description} picture={e.path} /></div>
                            }) : FoodItem.filter((s) => {
                                return s.category === selectedTags
                            }).map((e) => {
                                return <div className="card-container"><Card name={e.fooditem} type={this.props.user.type} description={e.description} picture={e.path} /></div>
                            })
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        user: state.authReducers.user
    })
}
export default connect(mapStateToProps, null)(Detailview)
