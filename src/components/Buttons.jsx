import React from 'react';
import '../styles/css/App.css';

const Buttons = ({handleClick}) => {

	return (
		<div className="buttons" onClick={handleClick}>
			<button id="zero" className="zero">0</button>
			<button id="one" className="one">1</button>
			<button id="clear" className="clear">AC</button>
			<button id="divide" className="divide">/</button>
			<button id="multiply" className="multiply">*</button>
			<button id="subtract" className="subtract">-</button>
			<button className="negative_sign">±
				{/*<div className="negative_sign__diagonal"></div>*/}
			</button>
			<button id="add" className="add">+</button>
			<button id="decimal" className="decimal">.</button>
			<button id="equals" className="equals">=</button>
			<button id="two" className="two">2</button>
			<button id="three" className="three">3</button>
			<button id="four" className="four">4</button>
			<button id="five" className="five">5</button>
			<button id="six" className="six">6</button>
			<button id="seven" className="seven">7</button>
			<button id="eight" className="eight">8</button>
			<button id="nine" className="nine">9</button>
		</div>
	);
};

export default Buttons;