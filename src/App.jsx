import React from "react";
import {connect, Provider} from "react-redux";
import store, {calculate, changeInput, newNumber, updateOperator, reset} from "./redux";
import Buttons from "./components/Buttons";
import {mathematicalOperators} from "./utils/calculator";
import './styles/css/App.css';

const App = ({
	             displayInput,
	             displayOutput,
	             currentNumber,
	             result,
	             prevOperator,
	             updateCurrentNumber,
	             calculateTheValue,
	             renderNewCharacterIntoInput,
	             writeDownTheOperator,
	             resetState
             }) => {

	const handleClick = (ev) => {
		const value = ev.target.innerHTML
		switch (value) {
			//If the clicked is 'AC', reset the state
			case 'AC':
				resetState()
				break;
			//If the clicked is '±' and the current number is not 0,
			// update current number to its opposite value
			case '±':
				currentNumber !== 0 && updateCurrentNumber(currentNumber * -1)
				break
			//If the clicked is '.', check the current number already contains a decimal point
			//and update the current number accordingly
			case '.':
				currentNumber.toString().match(/\./) && updateCurrentNumber(Number(currentNumber + value))
				break
			//If the clicked is a digit? update the current number by appending the digit to it
			case /\d/.test(value) && value:
				updateCurrentNumber(Number(currentNumber + value))
				break
			// If the clicked value is an unary operator or '=', perform the necessary calculations
			// and update the display input and output accordingly
			case /[+/*=-]/.test(value) && value:
				const currentNumberConvertToNum = Number(currentNumber)
				const displayOutputToString = Number(displayOutput)
				// If the previous operator was '=', append the result and the new operator to the display input
				if (prevOperator === '=') {
					renderNewCharacterIntoInput(result + value)
				}
				// If the previous operator was a mathematical operator
				// and the current number and display output are equal,
				// perform the calculation and update the display input and output
				else if (prevOperator.match(/[+/*-]/) && currentNumberConvertToNum === displayOutputToString) {
					const newResult = mathematicalOperators[prevOperator](result, currentNumberConvertToNum);
					calculateTheValue(newResult)
					renderNewCharacterIntoInput(displayInput + currentNumberConvertToNum + value)
				}
				// If the last character in the display input is a mathematical operator,
				// update it with the new operator
				else if (displayInput.slice(-1).match(/[+/*-]/)) {
					const newDisplayInput = displayInput.slice(0, -1) + value
					renderNewCharacterIntoInput(newDisplayInput)
				}
				// Otherwise, append the current number
				// and operator to the display input and perform the calculation
				else {
					renderNewCharacterIntoInput(displayInput + currentNumberConvertToNum + value)
					calculateTheValue(currentNumberConvertToNum)
				}
				writeDownTheOperator(value)
				break
			default:
				alert('Что-то пошло не так, сообщите разработчику!')
		}
	}

	return (
		<div className="main">
			<div className="container">
				<div className="display">
					<input className="display__input-data" value={displayInput} readOnly/>
					<div id="display" className="display__output-data">{displayOutput}</div>
				</div>
				<Buttons handleClick={handleClick}/>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		displayInput: state.displayInput,
		prevSymbol: state.prevSymbol,
		displayOutput: state.displayOutput,
		currentNumber: state.currentNumber,
		operator: state.operator,
		result: state.result,
		prevOperator: state.prevOperator
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
		},
		writeDownTheOperator: (symbol) => {
			dispatch(updateOperator(symbol))
		},
		resetState: () => {
			dispatch(reset())
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