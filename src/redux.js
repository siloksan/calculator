import {createStore} from 'redux'

const DISPLAY_INPUT = 'DISPLAY_INPUT'
const OPERATION = 'OPERATION'
const CURRENT_NUMBER = 'CURRENT_NUMBER'

const initialState = {
	displayInput: '',
	displayOutput: 0,
	currentNumber: 0,
	// numberTwo: '',
	// prevAction: '',
	result: 0,
	// lastResult: ''
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


const calculateReducer = (state = initialState, action) => {
	switch (action.type) {
		case DISPLAY_INPUT:
			return {
				...state,
				displayInput: state.displayInput + action.character,
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
		default:
			return state
	}
}

const store = createStore(calculateReducer)

export default store