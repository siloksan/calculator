import React from "react";
import './styles/css/App.css';

const App = () => {

		return (
			<div className="main">
				<div className="container">
					<div className="display">
						<input className="display__input-data"></input>
						<div className="display__output-data"></div>
					</div>
					<div className="buttons">
						<button className="zero">0</button>
						<button className="one">1</button>
						<button className="clear">AC</button>
						<button className="divide">/</button>
						<button className="multiply">*</button>
						<button className="subtract">-</button>
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
				</div>
			</div>
	);
}

export default App