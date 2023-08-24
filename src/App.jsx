import React from "react";
import './styles/css/App.css';
import {connect, Provider} from "react-redux";
import store, {calculate, changeInput, newNumber, updateOperator, reset} from "./redux";
import Buttons from "./components/Buttons";

const accuracy = 100000

const mathematicalOperators = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'*': (a, b) => a * b,
	'/': (a, b) => a / b,
	'±': (a) => -1 * a,
}

const App = ({
	             displayInput,
	             prevSymbol,
	             displayOutput,
	             currentNumber,
	             operator,
	             // negativeSign,
	             result,
	             prevOperator,
	             updateCurrentNumber,
	             // updateSignOfNumber,
	             calculateTheValue,
	             renderNewCharacterIntoInput,
	             writeDownTheOperator,
	             resetState
             }) => {

	console.log(' currentNumber: ' + currentNumber + '(type: ' + typeof currentNumber + ')');
	console.log(' result: ' + result + '(type: ' + typeof result + ')');

	const handleClick = (ev) => {
		const value = ev.target.innerHTML
		if (prevOperator === '=') {
			resetState()
		}
		if (value === '=' && prevOperator !== '') {
			const currentNumberConvertToNum = Number(currentNumber)
			const newResult = Math.round(accuracy * mathematicalOperators[prevOperator](result, currentNumberConvertToNum)) / accuracy;
			writeDownTheOperator(value)
			calculateTheValue(newResult)
			renderNewCharacterIntoInput('')
		}
		let newCurrentNumber;
		if (value === '±' && currentNumber !== 0) {
			newCurrentNumber = mathematicalOperators[value](currentNumber)
			updateCurrentNumber(newCurrentNumber)
		} else if (value === '.' && currentNumber.toString().indexOf('.') < 0) {
			updateCurrentNumber(currentNumber + value)
		} else if (value.match(/\d/)) {
			updateCurrentNumber(Number(currentNumber + value))
		}
		//обрабатываем нажатие на кнопку математического оператора
		else if (value.match(/[+/*-]/)) {
			const currentNumberConvertToNum = Number(currentNumber)
			const displayOutputToString = Number(displayOutput)
			//должно идти в начале, если предыдущий символ тоже мат. оператор удаляем его и заменяем на вновь введённый
		 if (prevOperator !== '' && currentNumberConvertToNum === displayOutputToString ) {
				const newResult = Math.round(accuracy * mathematicalOperators[prevOperator](result, currentNumberConvertToNum)) / accuracy;
				calculateTheValue(newResult)
				writeDownTheOperator(value)
				renderNewCharacterIntoInput(displayInput + currentNumberConvertToNum + value)
			 return;
			}
			if (displayInput.slice(-1).match(/[+/*-]/)) {
				const newDisplayInput = displayInput.slice(0, -1) + value
				renderNewCharacterIntoInput(newDisplayInput)
				writeDownTheOperator(value)
				return
			}
				writeDownTheOperator(value)
				renderNewCharacterIntoInput(displayInput + currentNumberConvertToNum + value)
				calculateTheValue(currentNumberConvertToNum)

		}
			else if (value === 'AC') {
			resetState()
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