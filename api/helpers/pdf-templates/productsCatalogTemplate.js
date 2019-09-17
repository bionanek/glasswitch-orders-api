module.exports = products => {
	return `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<title>Glass Witch - Products Catalog</title>
			<style>
				.catalog-box {
					max-width: 800px;
					margin: auto;
					padding: 30px;
					border: 1px solid #eee;
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
					font-size: 16px;
					line-height: 24px;
					font-family: "Helvetica Neue", "Helvetica";
					color: #000000;
				}
	
				.catalog-box table {
					width: 100%;
					line-height: inherit;
					text-align: left;
				}
	
				.catalog-box table td {
					padding: 5px;
					vertical-align: top;
				}
			</style>
		</head>
	
		<body>
			<div class="catalog-box">
				<table cellpadding="5" cellspacing="5">
					<tr>
						<td>
							<img
								src="http://localhost:3001/${products[0].imageUrl}"
								style="width:300px;height:300px;"
							/>
						</td>
	
						<td>
							<h1>${products[0].name}</h1>
							<h2>${products[0].code}</h2>
							<h4>${products[0].description}</h4>
							<h3>${products[0].price.pln}</h3>
							<h3>${products[0].price.eur}</h3>
							<h3>${products[0].price.usd}</h3>
						</td>

						<!-- <script>
							var tableData = '';
							var productsList = ${products};
	
							for (var i = 0; i < productsList.length; i++) {
								var product = productsList[i];
	
								tableData += '<td>';
								tableData += '<img src="http://localhost:3001/product.imageUrl}" style="width:300px;height:300px;" />';
								tableData += '</td>';
	
								tableData += '<td>';
								tableData += '<h2> product.name </h2>'
								tableData += '<h2> product.code </h2>'
								tableData += '<h2> product.description </h2>'
								tableData += '<h2> product.price.pln </h2>'
								tableData += '<h2> product.price.eur </h2>'
								tableData += '<h2> product.price.usd </h2>'
								tableData += '</td>';
							}
							document.writeln(tableData);
						</script> -->
					</tr>
				</table>
			</div>
		</body>
	</html>
	
	`
}
