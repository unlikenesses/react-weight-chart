import React from 'react';
import Chart from 'chart.js';

class ChartArea extends React.Component {

	constructor() {
		super();
		this.composeData = this.composeData.bind(this);
		this.drawChart = this.drawChart.bind(this);
	}

	pad(n) {
		return n < 10 ? '0' + n : n;
	}

	convertFromTimestamp(timestamp) {
		let jsDate = new Date(timestamp * 1000);
		let formatted = this.pad(jsDate.getDate()) + '/' + this.pad((jsDate.getMonth() + 1)) + '/' + jsDate.getFullYear();
		return formatted;	
	}

	composeData(weightPoints) {
		var dateData = [];
		var weightData = [];
		Object
			.keys(weightPoints)
			.forEach(key => {
				dateData.push(parseInt(key, 10) * 1000);
				weightData.push(weightPoints[key]);
			});

		return {
			labels: dateData,
			datasets: [
				{
					label: 'Weight',
					data: weightData,
					lineTension: 0
				}
			]
		};
	}

	drawChart(weightPoints) {
		var data = this.composeData(weightPoints);
		this.chart = new Chart(this.ctx, {
		    type: 'line',
		    data: data,
		    options: {
		    	legend: {
		    		display: false
		    	},
		    	tooltips: {
		    		callbacks: {
		    			label: function(tooltipItems, data) {
		    				return tooltipItems.yLabel + ' kg';
		    			}
		    		},
		    		displayColors: false
		    	},
		    	scales: {
		    		xAxes: [{
		    			type: 'time',
		    			time: {
		    				unit: 'week',
		    				tooltipFormat: 'DD MMM YYYY'
		    			}
		    		}],
		    		yAxes: [{
		    			scaleLabel: {
		    				display: true,
		    				labelString: 'Weight'
		    			}
		    		}]
		    	}
		    }
		});
	}

	componentDidMount() {
		this.ctx = document.getElementById('chartCanvas');
		this.drawChart(this.props.weightPoints);
	}

	componentWillReceiveProps(props) {
		this.drawChart(props.weightPoints);
	}

	render() {
		return (
			<div className="chartArea">
				<canvas id="chartCanvas"></canvas>
			</div>
		);
	}

}

export default ChartArea;