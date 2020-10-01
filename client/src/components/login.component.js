import React, {Component} from "react";
import validator from 'validator';
import './login.css';
import axios from "axios";

export default class LoginComponent extends Component{
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            usernameError:'',
            password: '',
            passwordError: '',
            responseError:''
        }
    }

    validateUsername() {
        if (validator.isEmpty(this.state.username)) {
            this.setState({
                usernameError: 'Username is required'
            });
            return false;
        }

        this.setState({
            usernameError: ''
        });
        return true;
    }

    validatePassword() {
        if (validator.isEmpty(this.state.password)) {
            this.setState({
                passwordError: 'Password is required'
            });
            return false;
        }

        this.setState({
            passwordError: ''
        });
        return true;
    }

    async onChangeUsername(e){
        await this.setState({
            username: e.target.value
        });
        this.validateUsername();
    }

    async onChangePassword(e){
        await this.setState({
            password: e.target.value
        });
        this.validatePassword();
    }

    async onSubmit(e){
        e.preventDefault();

        const crit1 = this.validateUsername();
        const crit2 = this.validatePassword();

        if(crit1 && crit2){
            axios.post('http://localhost:3000/login',{
                username: this.state.username,
                password: this.state.password,
            }).then((response)=>{
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('user_id',Number(response.data.user.id).toString());
                localStorage.setItem('user_name',response.data.user.username);
                localStorage.setItem('user_role',response.data.user.role);
                this.setState({
                    responseError : ''
                });
                if(response.data.user.role==='Administrator'){
                    window.location.href= window.location.origin+'/overview';
                }else{
                    window.location.href= window.location.origin+'/items';
                }

            }).catch((err)=>{
                if(err.response.status===401){
                    this.setState({
                        responseError : err.response.data
                    });
                }else{
                    this.setState({
                        responseError : 'Something is wrong'
                    });
                }
            });
        }
    }

    render() {
        return(
            <div id="login-component" className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <img src={require('./logo.png')}/>
                        <div className="text-danger">{this.state.responseError}</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    value={this.state.username}
                                    className={"form-control form-control-lg "+(this.state.usernameError==='' ? "":"is-invalid")}
                                    type="text" placeholder="Username"
                                    onChange={this.onChangeUsername}
                                />
                                <div className="invalid-feedback">{this.state.usernameError}</div>
                            </div>
                            <div className="form-group">
                                <input
                                    value={this.state.password}
                                    className={"form-control form-control-lg "+(this.state.passwordError==='' ? "":"is-invalid")}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.onChangePassword}
                                />
                                <div className="invalid-feedback">{this.state.passwordError}</div>
                            </div>
                            <div>
                                <button className="btn btn-primary btn-lg btn-block">Sign In</button>
                            </div>
                        </form>
                        <a href="#">Click here to registration</a>
                    </div>
                </div>
            </div>
        );
    }
}
