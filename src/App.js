import React, { Component } from 'react';
import ChartArea from './components/ChartArea';
import DataArea from './components/DataArea';
import base from './base';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			weightPoints: {},
			bmiPoints: {}
		};
		this.addDataPoint = this.addDataPoint.bind(this);
	}

	componentWillMount() {
		this.ref1 = base.syncState('weightPoints', {
			context: this,
			state: 'weightPoints'
		});
		this.ref2 = base.syncState('bmiPoints', {
			context: this,
			state: 'bmiPoints'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref1);
		base.removeBinding(this.ref2);
	}

	convertToTimestamp(date) {
		// assuming the date format is dd/mm/yyyy
		let dateParts = date.split('/');
		let jsDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
		return parseInt((jsDate.getTime() / 1000).toFixed(0), 10);
	}

	addDataPoint(dataPoint) {
		let weightPoints = {...this.state.weightPoints};
		let bmiPoints = {...this.state.bmiPoints};
		const timestamp = this.convertToTimestamp(dataPoint.date);
		if (dataPoint.weight !== null) {
			weightPoints[timestamp] = parseFloat(dataPoint.weight);
		}
		if (dataPoint.bmi !== null) {
			bmiPoints[timestamp] = parseFloat(dataPoint.bmi);
		}
		this.setState({ weightPoints: weightPoints, bmiPoints: bmiPoints });
	}

	render() {
		return (
			<div className="app">
				<ChartArea weightPoints={this.state.weightPoints} bmiPoints={this.state.bmiPoints} />
				<DataArea addDataPoint={this.addDataPoint} />
			</div>
		);
	}
}

export default App;
