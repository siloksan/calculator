import React from 'react';
import '../styles/css/App.css';

const Buttons = ({handleClick}) => {

	return (
		<div className="buttons" onClick={handleClick}>
			<button className="zero">0</button>
			<button className="one">1</button>
			<button className="clear">AC</button>
			<button className="divide">/</button>
			<button className="multiply">*</button>
			<button className="subtract">-</button>
			<button className="negative_sign">±
				{/*<div className="negative_sign__diagonal"></div>*/}
			</button>
			<button className="add">+</button>
			<button className="decimal">.</button>
			<button className="equals">=</button>
			<button className="two">2</button>
			<button className="three">3</button>
			<button className="four">4</button>
			<button className="five">5</button>
			<button className="six">6</button>
			<button className="seven">7</button>
			<button className="eight">8</button>
			<button className="nine">9</button>
		</div>
	);
};

export default Buttons;