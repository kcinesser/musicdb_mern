import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format, isSameMonth, isSameWeek, startOfWeek, endOfWeek, eachDayOfInterval, eachWeekOfInterval, isSameDay, startOfMonth, endOfMonth, startOfYear, addMonths} from 'date-fns';

export default class Chart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeChart: 0
    }
  }

  buildWeekData = () => {
    let weekData = [];
    let records = this.props.records;

    let weekDays = eachDayOfInterval({ start: startOfWeek(Date.now()), end: endOfWeek(Date.now()) });

    weekDays.map(day => {
      let dayTotal = 0;
      records.map(record => {
        let recordObject = JSON.parse(record);
        if (isSameDay(day, recordObject.date)) {
          dayTotal += recordObject.duration;
        }
      });

      let dayNumerical = (dayTotal / 3600000).toFixed(2);

      weekData.push({
        name: format(day, 'EEE'),
        Hours: dayNumerical
      })
    });

    return weekData;
  }

  buildMonthData = () => {
    let monthData = [];
    let records = this.props.records;

    let monthWeeks = eachWeekOfInterval({ start: startOfMonth(Date.now()), end: endOfMonth(Date.now()) });

    monthWeeks.map(day => {
      let weekTotal = 0;
      records.map(record => {
        let recordObject = JSON.parse(record);
        if (isSameWeek(day, recordObject.date)) {
          weekTotal += recordObject.duration;
        }
      });

      let weekNumerical = (weekTotal / 3600000).toFixed(2);

      monthData.push({
        name: `${format(startOfWeek(day), 'M/d')} - ${format(endOfWeek(day), 'M/d')}`,
        Hours: weekNumerical
      })
    });

    return monthData;
  }

  buildYearData = () => {
    let yearData = [];
    let records = this.props.records;

    let startOfCurrentYear = startOfYear(Date.now());

    for(let i = 0; i < 12; i++) {
      let monthTotal = 0;
      records.map(record => {
        let recordObject = JSON.parse(record);
        if (isSameMonth(addMonths(startOfCurrentYear, i), recordObject.date)) {
          monthTotal += recordObject.duration;
        }
      });

      let monthNumerical = (monthTotal / 3600000).toFixed(2);

      yearData.push({
        name: format(addMonths(startOfCurrentYear, i), 'MMM'),
        Hours: monthNumerical
      })
    }

    return yearData;
  }

  handleSelectedChart = (id) => {
    this.setState({
      activeChart: id
    })
  }

  render() {
    let data = [];
    let dataWeek = this.buildWeekData();
    let dataMonth = this.buildMonthData();
    let dataYear = this.buildYearData();

    let activeChart = this.state.activeChart;

    if (activeChart === 0) {
      data = dataWeek;
    } else if (activeChart === 1) {
      data = dataMonth;
    } else if (activeChart === 2) {
      data = dataYear;
    }

    return (
      <div className="chart-container">
        <div className="controls controls--chart">
        <button className={"button button--control" + (activeChart === 0 ? ' active' : '')} onClick={() => this.handleSelectedChart(0)}>This Week</button>
          <button className={"button button--control" + (activeChart === 1 ? ' active' : '')} onClick={() => this.handleSelectedChart(1)}>This Month</button>
          <button className={"button button--control" + (activeChart === 2 ? ' active' : '')} onClick={() => this.handleSelectedChart(2)}>This Year</button>
        </div>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Hours" fill="#1EEAA9" />
        </BarChart>
      </div>
    )
  }
}