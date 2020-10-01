import React, {Component} from "react";
import icons from 'glyphicons'

export default class ItemBoxComponent extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="box">
                <img className="box-image" src={this.props.item.photo ? "data:image/png;base64,"+this.props.item.photo : require('./placeholder.jpg')}/>
                <div className="box-name">{this.props.item.name}</div>
                <div className="box-price">${this.props.item.price}</div>
                <div className="box-rates">
                    <span className={this.props.item.rate>=1 ? "text-warning": ""}>{this.props.item.rate>=1 ? icons.star : icons.starOpen}</span>
                    <span className={this.props.item.rate>=2 ? "text-warning": ""}>{this.props.item.rate>=2 ? icons.star : icons.starOpen}</span>
                    <span className={this.props.item.rate>=3 ? "text-warning": ""}>{this.props.item.rate>=3 ? icons.star : icons.starOpen}</span>
                    <span className={this.props.item.rate>=4 ? "text-warning": ""}>{this.props.item.rate>=4 ? icons.star : icons.starOpen}</span>
                    <span className={this.props.item.rate>=5 ? "text-warning": ""}>{this.props.item.rate>=5 ? icons.star : icons.starOpen}</span>
                </div>
                <button className="btn btn-primary btn-block">{icons.shoppingTrolley} Add To Cart</button>
            </div>
        );
    }
}
