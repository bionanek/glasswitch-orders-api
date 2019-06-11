exports.lorem =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis nisi dolor. Pellentesque metus mauris, sagittis quis iaculis id, pellentesque id turpis. ";

exports.intRandom = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const number = Math.floor(Math.random() * (max - min)) + min;
	return number;
};

exports.decRandom = (min, max) => {
	let randomnum = Math.floor(Math.random() * (max - min) + min);

	return randomnum;
};

exports.strRandom = () => {
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < this.intRandom(1, 16); i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};

exports.dateRandom = () => {
	let date = `2019-${this.intRandom(1, 12)}-${this.intRandom(1, 31)}`;

	return date;
};
