import React, { Component } from 'react'
import { Carousel, Tag, Card } from 'antd';

const { Meta } = Card;
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Veg', 'Non Veg', 'Salad', 'Fast Food'];

class RestaurantViewDetailedScreen extends Component {

    state = {
        selectedTag: 'All',
        allFoodItem: [
            {
                name: 'DOUBLE-DOUBLE',
                type: 'Fast Food'
            },
            {
                name: 'WAFFLE FRIES',
                type: 'Fast Food'
            },
            {
                name: 'FRIES',
                type: 'Fast Food'
            },
            {
                name: 'CHICKEN POPEYES',
                type: 'Fast Food'
            },
            {
                name: 'CHICKEN SANDWICH ',
                type: 'Fast Food'
            },
            {
                name: 'CURLY FRIES',
                type: 'Fast Food'
            },
            {
                name: 'BLIZZARD',
                type: 'Fast Food'
            },
            {
                name: 'FROSTY',
                type: 'Fast Food'
            },
            {
                name: 'MCFLURRY',
                type: 'Fast Food'
            },
            {
                name: 'CHEESEBURGER',
                type: 'Fast Food'
            },
            {
                name: '',
                type: 'Fast Food'
            },
            {
                name: 'CHICKEN SANDWICH ',
                type: 'Fast Food'
            },
            {
                name: 'Fruit Salad',
                type: 'Salad'
            },
            {
                name: 'Pasta Salad',
                type: 'Salad'
            },
            {
                name: 'Ceaser Salad',
                type: 'Salad'
            },
            {
                name: 'Waldrof Salad',
                type: 'Salad'
            },
            {
                name: 'Cobb Salad',
                type: 'Salad'
            },
            {
                name: 'Taco Salad',
                type: 'Salad'
            },
            {
                name: 'Malai kofta',
                type: 'Veg'
            },
            {
                name: 'Aloo paratha',
                type: 'Veg'
            },
            {
                name: 'Palak',
                type: 'Veg'
            },
            {
                name: 'Chole',
                type: 'Veg'
            },
            {
                name: 'Palak Paneer',
                type: 'Veg'
            },
            {
                name: 'Palak Paneer',
                type: 'Non Veg'
            },
            {
                name: 'Palak Paneer',
                type: 'Non Veg'
            },
            {
                name: 'Palak Paneer',
                type: 'Non Veg'
            },
            {
                name: 'Palak Paneer',
                type: 'Non Veg'
            },

        ],
    };

    handleChange(tag, checked) {
        const nextSelectedTag = tag;
        this.setState({ selectedTag: nextSelectedTag });
    }

    render() {
        const { selectedTag } = this.state;

        return (
            <div className="restaurant-view-detail-screen-wrapper">
                <div>
                    <Carousel autoplay>
                        <div className="carousel-item">
                            <div style={{ background: `url(https://picsum.photos/1000/500?random=1) no-repeat center center`, backgroundSize: 'cover', height: '50vh' }}></div>
                        </div>

                        <div className="carousel-item">
                            <div style={{ background: `url(https://picsum.photos/1000/500?random=2) no-repeat center center`, backgroundSize: 'cover', height: '50vh' }}></div>
                        </div>

                        <div className="carousel-item">
                            <div style={{ background: `url(https://picsum.photos/1000/500?random=3) no-repeat center center`, backgroundSize: 'cover', height: '50vh' }}></div>
                        </div>

                        <div className="carousel-item">
                            <div style={{ background: `url(https://picsum.photos/1000/500?random=4) no-repeat center center`, backgroundSize: 'cover', height: '50vh' }}></div>
                        </div>
                    </Carousel>
                </div>

                <div className="short-info-wrapper">
                    <div className="short-info">
                        <div className="short-info-image" style={{ background: `url(https://picsum.photos/500/300?random) no-repeat center center`, backgroundSize: 'cover' }} ></div>
                        <div className="short-info-text">
                            <h1>Our Story</h1>
                            <p>Why painful the sixteen how minuter looking nor. Subject but why ten earnest husband imagine sixteen brandon. Are unpleasing occasional celebrated motionless unaffected conviction out. Evil make to no five they. Stuff at avoid of sense small fully it whose an. Ten scarcely distance moreover handsome age although. As when have find fine or said no mile. He in dispatched in imprudence dissimilar be possession unreserved insensible. She evil face fine calm have now. Separate screened he outweigh of distance landlord. </p>
                        </div>
                    </div>
                </div>

                <div className="food-items-wrapper">
                    <div className="food-items">
                        <div className="food-tags">
                            <h1>Today's Special</h1>
                            <div>
                                <CheckableTag
                                    key='All'
                                    checked={selectedTag === "All"}
                                    onChange={checked => this.handleChange('All', checked)}
                                >
                                    All
                                </CheckableTag>
                                {tagsFromServer.map(tag => (
                                    <CheckableTag
                                        key={tag}
                                        checked={selectedTag === tag}
                                        onChange={checked => this.handleChange(tag, checked)}
                                    >
                                        {tag}
                                    </CheckableTag>
                                ))}
                            </div>
                        </div>
                        <div className="items">
                            {
                                this.state.allFoodItem.filter((e) => {
                                    if (this.state.selectedTag === 'All') {
                                        return true
                                    }
                                    else {
                                        return this.state.selectedTag === e.type
                                    }
                                }).map((e, i) => {
                                    return (
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={`https://picsum.photos/500/300?random=${i}`} />}
                                        >
                                            <Meta title={e.name} description={e.type} />
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export { RestaurantViewDetailedScreen }
