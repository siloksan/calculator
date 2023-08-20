import React from "react";
import './styles/css/App.css';
import {connect, Provider} from "react-redux";
import store, {calculate, changeInput, newNumber, operator, reset} from "./redux";
import Buttons from "./components/Buttons";

const mathematicalOperators = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'*': (a, b) => a * b,
	'/': (a, b) => a / b,
}

const App = ({
	             displayInput,
	             prevSymbol,
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

	console.log(' currentNumber: ' + currentNumber + '(type: ' + typeof currentNumber + ')');
	console.log(' result: ' + result + '(type: ' + typeof result + ')');

	const handleClick = (ev) => {
		const value = ev.target.innerHTML
		if (value.match(/\d/)) {
			renderNewCharacterIntoInput(displayInput + value)
			updateCurrentNumber(Number(currentNumber + value))
		}
		//обрабатываем нажатие на кнопку математического оператора
		else if (value.match(/[+/\-*]/)) {
			// debugger
			//если предыдущий символ тоже мат. опер. (кроме "-"), удаляем его и заменяем на вновь введённый
			if (prevSymbol.match(/[+/*-]/)) {
				debugger
				const newDisplayInput = displayInput.slice(0, -1) + value
				renderNewCharacterIntoInput(newDisplayInput)
				return
			}
			if (prevOperator !== '') {
				const newResult = mathematicalOperators[prevOperator](result, currentNumber)
				calculateTheValue(newResult)
			} else {
				calculateTheValue(currentNumber)
			}
			renderNewCharacterIntoInput(displayInput + value)
			writeDownTheOperator(value)
		} else if (value === 'AC') {
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
			dispatch(operator(symbol))
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