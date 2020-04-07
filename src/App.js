import React, { Component } from 'react';
import ChartArea from './components/ChartArea';
import DataArea from './components/DataArea';
import base from './base';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			weightPoints: {}
		};
		this.addDataPoint = this.addDataPoint.bind(this);
	}

	componentWillMount() {
		this.ref1 = base.syncState('dataPoints', {
			context: this,
			state: 'weightPoints'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref1);
	}

	convertToTimestamp(date) {
		// assuming the date format is dd/mm/yyyy
		let dateParts = date.split('/');
		let jsDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
		return parseInt((jsDate.getTime() / 1000).toFixed(0), 10);
	}

	addDataPoint(dataPoint) {
		let weightPoints = {...this.state.weightPoints};
		const timestamp = this.convertToTimestamp(dataPoint.date);
		if (dataPoint.weight !== null) {
			weightPoints[timestamp] = parseFloat(dataPoint.weight);
		}
		this.setState({ weightPoints: weightPoints });
	}

	render() {
		return (
			<div className="app">
				<ChartArea weightPoints={this.state.weightPoints} />
				<DataArea addDataPoint={this.addDataPoint} />
			</div>
		);
	}
}

export default App;
