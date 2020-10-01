import React, {Component} from "react";
import axios from 'axios';

export default class ItemFormComponent extends Component{

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          name: '',
          photo: null,
          price: '',
          category: '',
          rate: 1,
        };
    }

    onChangeName(e){
        this.setState({
           name: e.target.value
        });
    }

    onChangeCategory(e){
        this.setState({
            category: e.target.value
        });
    }

    onChangeRate(e){
        this.setState({
            rate: e.target.value
        });
    }

    onChangePhoto(e){
        if(e.target.files.length!==1){
            this.setState({photo: null});
        }else{
            const file = e.target.files[0];
            var reader = new FileReader();
            const cmp = this;

            reader.onload = function () {
                cmp.setState({
                    photo: reader.result.split('base64,')[1]
                });
            }
            reader.readAsDataURL(file);
        }
    }

    onChangePrice(e){
        this.setState({
           price: e.target.value
        });
    }

    async onSubmit(e){
        e.preventDefault();
        await axios.post('http://localhost:3000/items',this.state);
        window.location.reload();
    }

    render() {
        return(
            <div className="container">
                <h1>Item Form</h1>
                <form onSubmit={this.onSubmit} className="form-horizontal">
                    <div className="form-group">
                        <label className="font-weight-bold">Name</label>
                        <div>
                            <input
                                value={this.state.name}
                                type="text"
                                className="form-control"
                                onChange={this.onChangeName}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Photo</label>
                        <div>
                            <input

                                type="file"
                                className="form-control"
                                onChange={this.onChangePhoto}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Price</label>
                        <div>
                            <input
                                value={this.state.price}
                                type="text"
                                className="form-control"
                                onChange={this.onChangePrice}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Category</label>
                        &#x00A0;&#x00A0;&#x00A0;&#x00A0;&#x00A0;&#x00A0;
                        <label>
                            <input
                                onChange={this.onChangeCategory}
                                checked={this.state.category==='Music'}
                                value="Music"
                                type="radio"
                                name="role"
                            />
                            Music
                        </label>
                        &#x00A0;&#x00A0;&#x00A0;
                        <label>
                            <input
                                onChange={this.onChangeCategory}
                                checked={this.state.category==='Game'}
                                value="Game"
                                type="radio"
                                name="role"
                            />
                            Game
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Rate</label>
                        <div>
                            <input
                                value={this.state.rate}
                                type="number"
                                className="form-control"
                                onChange={this.onChangeRate}
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}
