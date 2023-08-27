import React from "react";
import {connect, Provider} from "react-redux";
import store, {calculate, changeInput, newNumber, updateOperator, reset, oppositeValue} from "./redux";
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
                 changeCurrentNumToOpposite,
                 calculateTheValue,
                 renderNewCharacterIntoInput,
                 writeDownTheOperator,
                 resetState
             }) => {

    const handleClick = (ev) => {
        const value = ev.target.innerHTML
        switch (value) {
            case 'AC':
                resetState()
                break;
            case /\d/.test(value) && value:
                currentNumber === '0' ?
                    updateCurrentNumber(value) :
                    updateCurrentNumber(currentNumber + value)
                break
            case '.':
                if (!/\./.test(currentNumber)) {
                    currentNumber === '-' ?
                        updateCurrentNumber('-0' + value) :
                        updateCurrentNumber(currentNumber + value)
                }
                break
            case '-':
                if ((currentNumber === '' || currentNumber === '0' || currentNumber === '-')) {
                    if (displayInput === '') {
                        updateCurrentNumber(value)
                    }
                    else if (/[+/*-]/.test(displayInput.slice(-1))) {
                        updateCurrentNumber(value)
                    }
                } else if ((/[+/*-]/.test(displayInput.slice(-1) || displayInput.slice(-1) === '') && currentNumber !== '')) {
                    if (/[+/*-]/.test(prevOperator)) {
                        renderNewCharacterIntoInput(displayInput + currentNumber)
                        const newResult = mathematicalOperators[prevOperator](result, Number(currentNumber));
                        calculateTheValue(newResult)
                        writeDownTheOperator(value)
                    }
                } else {
                    renderNewCharacterIntoInput(displayInput + Number(currentNumber) + value)
                    calculateTheValue(Number(currentNumber))
                    writeDownTheOperator(value)
                }
                break
            case /[+/*=]/.test(value) && value:
                const currentNumberConvertToNum = Number(currentNumber)
                const displayOutputToNum = Number(displayOutput)
                // If the previous operator was '=', append the result and the new operator to the display input
                if (prevOperator === '=') {
                    renderNewCharacterIntoInput(result + value)
                }
                    // If the previous operator was a mathematical operator
                    // and the current number and display output are equal,
                // perform the calculation and update the display input and output
                else if (/[+/*-]/.test(prevOperator) && currentNumberConvertToNum === displayOutputToNum) {
                    const newResult = mathematicalOperators[prevOperator](result, currentNumberConvertToNum);
                    calculateTheValue(newResult)
                    renderNewCharacterIntoInput(displayInput + currentNumberConvertToNum + value)
                }
                    // If the last character in the display input is a mathematical operator,
                // update it with the new operator
                else if (/[+/*-]/.test(displayInput.slice(-1))) {
                    const newDisplayInput = displayInput.slice(0, -1) + value
                    renderNewCharacterIntoInput(newDisplayInput)
                    if (currentNumber === '-') updateCurrentNumber('')

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
        changeCurrentNumToOpposite: (number) => {
            dispatch(oppositeValue(number))
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