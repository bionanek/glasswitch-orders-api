module.exports = products => {
	const imgSource = `http://localhost:3001/${products[0].imageUrl}`
	return `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<style>
				.wrapper {
					display: grid;
					grid-template-columns: 40%60%;
				}

				.wrapper > div {
					background: #eee;
					padding: 1em;
				}

				.wrapper > div:nth-child(odd) {
					background: #ddd;
				}

				.image {
					width: 300px;
					height: 300px;
				}
			</style>
		</head>

		<body>
			<div class="wrapper">
				<div>
					<img class="image" src="${imgSource}" />
				</div>

				<div>
					<h2>${products[0].name}. ${products[0].code}</h2>

					<p>${products[0].description}.</p>

					<h2>
						${products[0].price.pln} PLN - ${products[0].price.eur} EUR -
						${products[0].price.usd} USD
					</h2>
				</div>
			</div>
		</body>
	</html>
	`
}
