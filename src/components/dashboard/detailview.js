import React, { Component } from 'react';
import { Tag } from 'antd';
import './detailview.css'
import Navbar from '../navbar/navbar';
import Banner from '../Banner/banner';

const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['All','Fast Food', 'BarbQ', 'Karahi', 'Chinees'];

class Detailview extends Component {
    state = {
        selectedTags: [],
    };

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }
    render() {
        const { selectedTags } = this.state;
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Banner />
                </div>
                <div>
                    <h1 className="our-menu-heading">Our Menu</h1>
                </div>
                <div>
                    <div>
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
            </div>
        )
    }
}
export default Detailview
