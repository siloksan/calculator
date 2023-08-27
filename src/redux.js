import {createStore} from 'redux'
import {initialState} from "./utils/const";

const DISPLAY_INPUT = 'DISPLAY_INPUT'
const OPERATION = 'OPERATION'
const CURRENT_NUMBER = 'CURRENT_NUMBER'
const PREV_OPERATOR = 'PREV_OPERATOR'
const RESET = 'RESET'
const OPPOSITE = 'OPPOSITE'

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

export const updateOperator = (symbol) => {
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

export const oppositeValue = (number) => {
	return {
		type: OPPOSITE,
		number
	}
}

const calculateReducer = (state = initialState, action) => {
	switch (action.type) {
		case DISPLAY_INPUT:
			return {
				...state,
				displayInput: action.character,
			};
		case CURRENT_NUMBER:
			return {
				...state,
				currentNumber: action.number,
				displayOutput: action.number
			};
		case OPPOSITE:
			// debugger
			return {
				...state,
				currentNumber: action.number,
				displayOutput: action.number
			}
		case OPERATION:
			return {
				...state,
				result: action.value,
				displayOutput: action.value,
				currentNumber: '0'
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