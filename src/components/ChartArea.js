import React, { useEffect } from 'react';
import Chart from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

const ChartArea = (props) => {
	useEffect(() => {
        let data = composeData(props.weightPoints);
		const threshold = 80;
		let ctx = document.getElementById('chartCanvas');
		new Chart(ctx, {
		    type: 'line',
		    data: data,
		    options: {
		    	legend: {
		    		display: false
				},
				annotation: {
					annotations: [{
						type: 'line',
						mode: 'horizontal',
						scaleID: 'y-axis-0',
						value: threshold,
						borderColor: 'rgb(255, 95, 95)',
						borderWidth: 1,
					}]
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
						ticks: {
							min: 76
						},
		    			scaleLabel: {
		    				display: true,
		    				labelString: 'Weight'
		    			}
		    		}]
		    	}
		    }
		});
    }, [props.weightPoints]);

	const composeData = (weightPoints) => {
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

	return (
		<div className="chartArea">
			<canvas id="chartCanvas"></canvas>
			<div className="dateRange">
				
			</div>
		</div>
	);
}

export default ChartArea;