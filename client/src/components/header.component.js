import React, {Component} from "react";
import axios from 'axios';
import './header.css';

export default class HeaderComponent extends Component{

    constructor(props) {
        super(props);
        this.onLoggedOut = this.onLoggedOut.bind(this);
        this.state = {
            itemCount: localStorage.getItem('item_count')
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData(){

    }

    onLoggedOut(){
        localStorage.clear();
        window.location.href = window.location.origin+'/login';
    }

    render() {
        return(
            <div id="header" className="container-fluid">
                <nav className="row text-white">
                    <div className="col-1">
                        <img className="id" src={require('./logo.png')}/>
                    </div>
                    <div className="col-4">
                        <span className="tagline">Online Shopping. Simple.</span>
                    </div>
                    <div className="col-5 text-right">
                        <div>
                            <img className="user-image" src={require('./user.png')}/>
                            <span className="font-weight-bold d-inline-block mr-5">{localStorage.getItem('user_name')}</span>
                            <div className="d-inline-block position-relative cart">
                                <img className="user-image" src={require('./cart.png')}/>
                                <span className="position-absolute">{this.state.itemCount===null ? 0 : this.state.itemCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 text-right">
                        <button onClick={this.onLoggedOut} className="btn btn-primary d-inline-block ml-2 mt-3">Sign Out</button>
                    </div>
                </nav>
            </div>
        );
    }
}
