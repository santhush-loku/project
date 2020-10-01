import React, {Component} from "react";
import axios from 'axios';
import HeaderComponent from "./header.component";
import ItemBoxComponent from "./item-box.component";
import './item-view.css';

export default class ItemViewComponent extends Component{

    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onPageChange = this.onPageChange.bind(this);

        this.state = {
            data:[],
            category:'',
            name:'',
            page:1,
            totalPageCount:0,
            isFirst: true,
            isLast: true,
        };
    }

    async onChangeCategory(e){
        await this.setState({
            category: e.target.value
        });
        this.loadData();
    }

    async onChangeName(e){
        await this.setState({
            name: e.target.value
        });
        this.loadData();
    }

    async onPageChange(e){
        await this.setState({
            page: Number(e.target.value)
        });

        this.loadData();
    }

    componentDidMount() {
        this.loadData().then(()=>{
            console.log(this.state.isLast);
        });
        document.getElementById('item-view-wrapper').style.height = (window.innerHeight - 71)+'px';
    }

    async loadData(){
        axios.get(`http://localhost:3000/items?page=${this.state.page}&name=${this.state.name}&category=${this.state.category}`)
        .then(res =>{
            this.setState({
                data: res.data.data,
                page: res.data.page,
                totalPageCount:res.data.totalPageCount,
                isFirst: res.data.isFirst,
                isLast: res.data.isLast,
            });
        });
    }


    itemDataBoxes(){
        return this.state.data.map((object) => {
            return (
              <ItemBoxComponent item={object}/>
            );
        });
    }


    pageButtons(){

        const pages = [];

        for(let i=0; i<this.state.totalPageCount; i++){
            pages.push(i+1);
        }

        return pages.map((page) => {

            console.log(this.state.page);
            console.log(page);

            if(this.state.page==page){
                return (
                    <li className="page-item active"><button onClick={this.onPageChange} value={page} className="page-link">{page}</button></li>
                );
            }else{
                return (
                    <li className="page-item"><button onClick={this.onPageChange} value={page} className="page-link">{page}</button></li>
                );
            }

        });
    }

    render() {
        return(
            <div>
                <HeaderComponent/>
                <div id="item-view-wrapper" className="container-fluid pt-3">
                    <div className="row">
                        <div className="col-6">
                            <label>
                                <input
                                    onChange={this.onChangeCategory}
                                    checked={this.state.category===''}
                                    value=""
                                    type="radio"
                                    name="category"
                                />&#x00A0;
                                All
                            </label>
                            &#x00A0;&#x00A0;&#x00A0;&#x00A0;&#x00A0;&#x00A0;
                            <label>
                                <input
                                    onChange={this.onChangeCategory}
                                    checked={this.state.category==='Music'}
                                    value="Music"
                                    type="radio"
                                    name="category"
                                />&#x00A0;
                                Music
                            </label>
                            &#x00A0;&#x00A0;&#x00A0;&#x00A0;&#x00A0;&#x00A0;
                            <label>
                                <input
                                    onChange={this.onChangeCategory}
                                    checked={this.state.category==='Game'}
                                    value="Game"
                                    type="radio"
                                    name="category"
                                />&#x00A0;
                                Game
                            </label>
                        </div>
                        <div className="col-6 text-right">
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                placeholder="Search Apps"
                            />
                        </div>
                    </div>
                    <div>
                        {this.itemDataBoxes()}
                    </div>
                    <div>
                        <ul className="pagination float-right">
                            {this.pageButtons()}
                        </ul>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        );
    }
}
