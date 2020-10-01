import React, {Component} from "react";
import axios from 'axios';

export default class UserFormComponent extends Component{

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          username: '',
          password: '',
          role: '',
        };
    }

    onChangeUsername(e){
        this.setState({
           username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
           password: e.target.value
        });
    }

    onChangeRole(e){
        this.setState({
           role: e.target.value
        });
    }

    async onSubmit(e){
        e.preventDefault();
        await axios.post('http://localhost:3000/users',this.state);
        this.setState({
            username: '',
            password: '',
            role: '',
        });
    }

    render() {
        return(
            <div className="container">
                <h1>User Form</h1>
                <form onSubmit={this.onSubmit} className="form-horizontal">
                    <div className="form-group">
                        <label className="font-weight-bold">Username</label>
                        <div>
                            <input
                                value={this.state.username}
                                type="text"
                                className="form-control"
                                onChange={this.onChangeUsername}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Password</label>
                        <div>
                            <input
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Role</label>
                        &#x00A0;&#x00A0;&#x00A0;&#x00A0;&#x00A0;&#x00A0;
                        <label>
                            <input
                                onChange={this.onChangeRole}
                                checked={this.state.role==='Administrator'}
                                value="Administrator"
                                type="radio"
                                name="role"
                            />
                            Administrator
                        </label>
                        &#x00A0;&#x00A0;&#x00A0;
                        <label>
                            <input
                                onChange={this.onChangeRole}
                                checked={this.state.role==='Customer'}
                                value="Customer"
                                type="radio"
                                name="role"
                            />
                            Customer
                        </label>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}
