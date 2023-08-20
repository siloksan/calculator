import {createStore} from 'redux'

const DISPLAY_INPUT = 'DISPLAY_INPUT'
const OPERATION = 'OPERATION'
const CURRENT_NUMBER = 'CURRENT_NUMBER'
const PREV_OPERATOR = 'PREV_OPERATOR'
const RESET = 'RESET'

const initialState = {
	displayInput: '',
	prevSymbol: '',
	displayOutput: 0,
	currentNumber: 0,
	prevOperator: '',
	result: 0,
}

export const changeInput = (character) => {
	return {
		type: DISPLAY_INPUT,
		character
	}
}

export const newNumber = (number) => {
	return {
		type: CURRENT_NUMBER,
		number
	}
}

export const calculate = (value) => {
	return {
		type: OPERATION,
		value
	}
}

export const operator = (symbol) => {
	return {
		type: PREV_OPERATOR,
		symbol
	}
}

export const reset = () => {
	return {
		type: RESET
	}
}

const calculateReducer = (state = initialState, action) => {
	switch (action.type) {
		case DISPLAY_INPUT:
			return {
				...state,
				displayInput: action.character,
				prevSymbol: action.character.slice(-1)
			};
		case CURRENT_NUMBER:
			return {
				...state,
				currentNumber: action.number,
				displayOutput: action.number
			};
		case OPERATION:
			return {
				...state,
				result: action.value,
				displayOutput: action.value,
				currentNumber: 0
			};
		case PREV_OPERATOR:
			return {
				...state,
				prevOperator: action.symbol
			};
		case RESET:
			return {
				...initialState
			};
		default:
			return state
	}
}

const store = createStore(calculateReducer)

export default store