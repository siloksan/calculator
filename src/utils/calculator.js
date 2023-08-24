export const mathematicalOperators = {
	accuracy: 100000,
	mathRound: function (num) {
		return Math.round(this.accuracy * num) / this.accuracy;
	},
	'+': function (a, b) {
		return this.mathRound(a + b);
	},
	'-': function (a, b) {
		return this.mathRound(a - b);
	},
	'*': function (a, b) {
		return this.mathRound(a * b);
	},
	'/': function (a, b) {
		return this.mathRound(a / b);
	},
	'±': function (a) {
		return -1 * a;
	},
}