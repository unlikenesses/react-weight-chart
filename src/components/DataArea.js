import React from 'react';

class DataArea extends React.Component {

	constructor() {
		super();
		this.setCurrentDate = this.setCurrentDate.bind(this);
	}

	addDataPoint(e) {
		e.preventDefault();
		const dataPoint = {
			date: this.date.value,
			weight: this.weight.value
		};
		this.props.addDataPoint(dataPoint);
		this.dataForm.reset();		
	}

	setCurrentDate() {
		let jsDate = new Date();
		let formatted = jsDate.getDate() + '/' + (jsDate.getMonth() + 1) + '/' + jsDate.getFullYear();
		this.date.value = formatted;
	}

	render() {
		return (
			<div className="dataArea">
				<form ref={(input) => this.dataForm = input} onSubmit={(e) => this.addDataPoint(e)}>
					<input ref={(input) => this.date = input} id="dateInput" type="text" name="date" placeholder="Date (dd/mm/yyyy)" onClick={this.setCurrentDate} />
					<input ref={(input) => this.weight = input} type="text" name="weight" placeholder="Weight (kg)"/>
					<button type="submit">Enter</button>
				</form>	
			</div>
		);
	}

}

export default DataArea;