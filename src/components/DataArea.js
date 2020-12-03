import React, { useState } from 'react';

const DataArea = (props) => {
	let jsDate = new Date();
    let formatted = jsDate.getDate() + '/' + (jsDate.getMonth() + 1) + '/' + jsDate.getFullYear();
	const [date, setDate] = useState(formatted);
	const [weight, setWeight] = useState('');

	const addDataPoint = (e) => {
		e.preventDefault();
		const dataPoint = {
			date: date,
			weight: weight
		};
		props.addDataPoint(dataPoint);
	}

	return (
		<div className="dataArea">
			<form onSubmit={addDataPoint}>
				<input 
					type="text" 
					name="date" 
					placeholder="Date (dd/mm/yyyy)" 
					onChange={e => setDate(e.target.value)}
					value={date} 
				/>
				<input 
					type="text"
					name="weight"
					placeholder="Weight (kg)"
					onChange={e => setWeight(e.target.value)}
				/>
				<button type="submit">Enter</button>
			</form>	
		</div>
	);
}

export default DataArea;