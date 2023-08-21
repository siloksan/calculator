import React from "react";
import './styles/css/App.css';
import {connect, Provider} from "react-redux";
import store, {calculate, changeInput, newNumber, updateOperator, reset} from "./redux";
import Buttons from "./components/Buttons";

const mathematicalOperators = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'*': (a, b) => a * b,
	'/': (a, b) => a / b,
	'±': (a) => -1 * a,
	// '': (a) => a
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
		let newCurrentNumber;
		if (value.match(/±/)) {
			// debugger
			newCurrentNumber = mathematicalOperators[value](currentNumber)
			updateCurrentNumber(newCurrentNumber)
		} else if (value.match(/\d/)) {
			updateCurrentNumber(Number(currentNumber + value))
		}
		//обрабатываем нажатие на кнопку математического оператора
		else if (value.match(/[+/*-]/)) {
			//должно идти в начале, если предыдущий символ тоже мат. оператор удаляем его и заменяем на вновь введённый
			if (displayInput.slice(-1).match(/[+/*-]/)) {
				// debugger
				const newDisplayInput = displayInput.slice(0, -1) + value
				renderNewCharacterIntoInput(newDisplayInput)
				writeDownTheOperator(value)
				//производим расчёт
			} else if (prevOperator !== '') {
				const newResult = mathematicalOperators[prevOperator](result, currentNumber)
				calculateTheValue(newResult)
				writeDownTheOperator(value)
				renderNewCharacterIntoInput(displayInput + currentNumber + value)
			}
			else {
					writeDownTheOperator(value)
				renderNewCharacterIntoInput(displayInput + currentNumber + value)
			}
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