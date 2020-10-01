import React, {Component} from "react";
import axios from 'axios';
import HeaderComponent from "./header.component";
import './overview.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default class OverviewComponent extends Component{

    chart1 = am4core.create("chart1", am4charts.XYChart);
    chart2 = am4core.create("chart2", am4charts.XYChart);

    constructor(props) {
        super(props);
        this.state = {
            todayRevenue: 1152.23,
            todayRefunds: 125.36,
            todayCustomers: 135,
            chart1Data:[
                {
                    "month": "2018-01",
                    "new": 100000,
                    "up": 25000
                }, {
                    "month": "2018-02",
                    "new": 120000,
                    "up": 30000
                }, {
                    "month": "2018-03",
                    "new": 100000,
                    "up": 20000
                }, {
                    "month": "2018-04",
                    "new": 130000,
                    "up": 35000
                }, {
                    "month": "2018-04",
                    "new": 140000,
                    "up": 30000
                },
            ],
            chart2Data:[
                {
                    "name": "Mood by 24k",
                    "amount": 100000
                }, {
                    "name": "Wap by Cardi B",
                    "amount": 50000
                }, {
                    "name": "Lighter by Nathan",
                    "amount": 80000
                }, {
                    "name": "Fortnite",
                    "amount": 75000
                }, {
                    "name": "Minecraft",
                    "amount": 125000
                }, {
                    "name": "PubG",
                    "amount": 60000
                },
            ],
        };

    }


    loadChart1(){
        this.chart1.data = this.state.chart1Data;
        let chart = this.chart1;
        chart.dateFormatter.inputDateFormat = "yyyy-MM";
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 60;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;
        dateAxis.baseInterval = {
            timeUnit: "month",
            count: 1
        }

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "month";
        series.name = "New Customers";
        series.dataFields.valueY = "new";
        series.tooltipHTML = "{valueY.value}";
        series.tooltipText = "[#000]{valueY.value}[/]";
        series.tooltip.background.fill = am4core.color("#000");
        series.tooltip.getStrokeFromObject = true;
        series.tooltip.background.strokeWidth = 3;
        series.tooltip.getFillFromObject = false;
        series.fillOpacity = 0.6;
        series.strokeWidth = 2;
        series.stacked = true;

        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.name = "Up/Cross Selling";
        series2.dataFields.dateX = "month";
        series2.dataFields.valueY = "up";
        series.tooltipHTML = "{valueY.value}";
        series2.tooltipText = "[#000]{valueY.value}[/]";
        series2.tooltip.background.fill = am4core.color("#FFF");
        series2.tooltip.getFillFromObject = false;
        series2.tooltip.getStrokeFromObject = true;
        series2.tooltip.background.strokeWidth = 3;
        series2.sequencedInterpolation = true;
        series2.fillOpacity = 0.6;
        series2.stacked = true;
        series2.strokeWidth = 2;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.scrollbarX = new am4core.Scrollbar();

        chart.legend = new am4charts.Legend();
        chart.legend.position = "bottom";
    }

    loadChart2(){
        let chart = this.chart2;
        chart.data = this.state.chart2Data;
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.numberFormatter.numberFormat = "#";
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        let  valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.opposite = true;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = "amount";
        series.dataFields.categoryY = "name";
        series.columns.template.tooltipText = "[bold]{valueX}[/]";
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;

    }

    componentDidMount() {
        this.loadData();
        document.getElementById('overview-wrapper').style.height = (window.innerHeight - 71)+'px';
        this.loadChart1();
        this.loadChart2();
    }

    async loadData(){

    }

    render() {
        return(
            <div>
                <HeaderComponent/>
                <div id="overview-wrapper" className="container-fluid">
                    <div className="row h-100">
                        <aside className="col-2">
                            <div className="nav-item"><a className="active" href="#">Dashboard</a></div>
                            <div className="nav-item"><a href="#">Add new Item</a></div>
                            <div className="nav-item"><a href="#">Show All Customers</a></div>
                        </aside>
                        <section className="col-10 pt-3">
                            <div className="row mb-3">
                                <div className="col-4">
                                    <div className="item-box bg-primary">
                                        <div className="item-box-title">Today Revenue</div>
                                        <img className="item-box-icon" src={require('./revenue_icon.png')}/>
                                        <div className="item-box-value">${this.state.todayRevenue}</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="item-box bg-warning">
                                        <div className="item-box-title">Today Refunds</div>
                                        <img className="item-box-icon" src={require('./refund_icon.png')}/>
                                        <div className="item-box-value">${this.state.todayRefunds}</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="item-box bg-info">
                                        <div className="item-box-title">New Customers</div>
                                        <img className="item-box-icon" src={require('./customer_icon.png')}/>
                                        <div className="item-box-value">{this.state.todayCustomers}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <div id="chart1"></div>
                                </div>
                                <div className="col-5">
                                    <div id="chart2"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
