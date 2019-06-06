exports.lorem =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis nisi dolor. Pellentesque metus mauris, sagittis quis iaculis id, pellentesque id turpis. ";

exports.intRandom = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const number = Math.floor(Math.random() * (max - min)) + min;
	return number;
};

exports.decRandom = (min, max) => {
	let precision = 100; // 2 decimals
	let randomnum = Math.floor(Math.random() * (max - min) + min) / precision;

	return randomnum;
};

exports.strRandom = () => {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < this.intRandom(1, 16); i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};
