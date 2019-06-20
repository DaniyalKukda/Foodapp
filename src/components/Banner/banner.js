import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import Image1 from '../../images/bannerimg1.jpg';
import Image2 from '../../images/bannerimg2.jpg';
import 'rc-banner-anim/assets/index.css';
import './banner.css';
const BgElement = Element.BgElement;
class Banner extends React.Component {
    render() {
        return (
            <BannerAnim prefixCls="banner-user" autoPlay>
                <Element
                    prefixCls="banner-user-elem"
                    key="0"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            background: `url(${Image1}) no-repeat center center`, backgroundSize: 'cover'
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        Hotel name yha ayega
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                        animation={{ y: 30, opacity: 0, type: 'from', delay: 50 }}
                    >
                        Description yha ayegi
                    </TweenOne>
                </Element>
                <Element
                    prefixCls="banner-user-elem"
                    key="1"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            background: `url(${Image2})`
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        Hotel ka name yha ayega
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                        animation={{ y: 30, opacity: 0, type: 'from', delay: 50 }}
                    >
                        Hotel ki description yha ayegi
                    </TweenOne>
                </Element>
            </BannerAnim>
        );
    }
}
export default Banner