import React, { useState, useEffect } from 'react';
import ChartArea from './components/ChartArea';
import DataArea from './components/DataArea';
import firebase from './firebase';
import './App.css';

const App = () => {
	const [weightPoints, setWeightPoints] = useState([]);

	useEffect(() => {
		firebase.database().ref().child('dataPoints').on('value', snapshot => {
            if (snapshot.val() != null) {
                setWeightPoints({
                    ...snapshot.val()
                });
            }
        });
	}, []);

	const convertToTimestamp = (date) => {
		// assuming the date format is dd/mm/yyyy
		let dateParts = date.split('/');
		let jsDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
		return parseInt((jsDate.getTime() / 1000).toFixed(0), 10);
	}

	const addDataPoint = (dataPoint) => {
		const timestamp = convertToTimestamp(dataPoint.date);
		if (dataPoint.weight !== null) {
			firebase.database().ref().child('dataPoints/' + timestamp).set(parseFloat(dataPoint.weight));
		}
	}

	return (
		<div className="app">
			<ChartArea weightPoints={weightPoints} />
			<DataArea addDataPoint={addDataPoint} />
		</div>
	);
}

export default App;
