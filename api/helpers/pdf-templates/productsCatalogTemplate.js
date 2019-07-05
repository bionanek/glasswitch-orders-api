module.exports = products => {
	const imgSource = `http://localhost:3001/${products[0].imageUrl}`
	return `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<style>
				.products-catalog-page {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				}

				.image-size {
					float: left;
					width: 250px;
					height: 250px;
				}

				.products-data {
					float: right;
				}
			</style>
		</head>
		<body>
			<div class="products-catalog-page">
			
				<div class="products-row">
					<img class="image-size" src=${imgSource} />
					
					<div class="products-data">
						<h2>${products[0].name}. ${products[0].code}</h2>

						<h3>${products[0].description}.</h2>

						<h3>${products[0].price.pln}. ${products[0].price.eur}. ${
		products[0].price.usd
	}</h3>
					</div>
				</div>
			
			</div>
		</body>
	</html>
	`
}
