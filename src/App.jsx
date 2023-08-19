import React from "react";
import './styles/css/App.css';
import {connect, Provider} from "react-redux";
import store, { calculate, changeInput, newNumber } from "./redux";
import Buttons from "./components/Buttons";

const mathematicalOperators = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'*': (a, b) => a * b,
	'/': (a, b) => a / b,
}

const App = ({
	             displayInput,
	             displayOutput,
	             currentNumber,
	             result,
	             updateCurrentNumber,
	             calculateTheValue,
	             renderNewCharacterIntoInput
             }) => {

	console.log(' currentNumber: ' + currentNumber + '(type: ' + typeof currentNumber + ')');
	console.log(' result: ' + result + '(type: ' + typeof result + ')');

	const handleClick = (ev) => {
		const value = ev.target.innerHTML
		renderNewCharacterIntoInput(value)
		if (value.match(/\d/)) {
			updateCurrentNumber(Number(currentNumber + value))
		} else if (value.match(/\+/)) {
			const sum = result + currentNumber
			calculateTheValue(sum)
		} else if (value.match(/-/)) {
			const sum = result - currentNumber
			calculateTheValue(sum)
		} else if (value.match(/\*/)) {
			const sum = result * currentNumber
			calculateTheValue(sum)
		} else if (value.match(/\//)) {
			const sum = result / currentNumber
			calculateTheValue(sum)
		}
	}

	return (
		<div className="main">
			<div className="container">
				<div className="display">
					<input className="display__input-data" value={displayInput} readOnly/>
					<div className="display__output-data">{displayOutput}</div>
				</div>
				<Buttons handleClick={handleClick}/>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		displayInput: state.displayInput,
		displayOutput: state.displayOutput,
		currentNumber: state.currentNumber,
		result: state.result
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		renderNewCharacterIntoInput: (character) => {
			dispatch(changeInput(character))
		},
		updateCurrentNumber: (number) => {
			dispatch(newNumber(number))
		},
		calculateTheValue: (value) => {
			dispatch(calculate(value))
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App)

const AppWrapper = () => {
	return (
		<Provider store={store}>
			<Container/>
		</Provider>
	)
}

export default AppWrapper