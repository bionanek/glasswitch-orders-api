module.exports = products => {
	return `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<title>Products Catalog</title>
			<style>
				.invoice-box {
					max-width: 800px;
					margin: auto;
					padding: 30px;
					border: 1px solid #eee;
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
					font-size: 16px;
					line-height: 24px;
					font-family: "Helvetica Neue", "Helvetica";
					color: #555;
				}

				.margin-top {
					margin-top: 50px;
				}

				.justify-center {
					text-align: center;
				}

				.invoice-box table {
					width: 100%;
					line-height: inherit;
					text-align: left;
				}

				.invoice-box table td {
					padding: 5px;
					vertical-align: top;
				}
			</style>
		</head>

		<body>
			<div class="invoice-box">
				<table id="myTable" cellpadding="0" cellspacing="0">
					<tr class="item">
						<td>
							<img
								class="image"
								src="http://localhost:3001/${products[0].imageUrl}"
								style="width:300px;height:300px;"
							/>
						</td>
						<td>
							<h2>${products[0].name}</h2>
							<h2>${products[0].code}</h2>
							<h4>${products[0].description}</h4>
							<h3>${products[0].price.pln}PLN</h3>
							<h3>${products[0].price.eur}EUR</h3>
							<h3>${products[0].price.usd}USD</h3>
						</td>
					</tr>
				</table>
			</div>

			<script>
					var tableData = "";
					for (var i = 0; i < ${products.length}; i++) {
						tableData += "<tr>";
						tableData += "<td>" + "<h2>DUPA</h2>" + "</td>";
						tableData += "</tr>";
					}
					document.getElementById("myTable").innerHTML += tableData;
				</script>
		</body>
	</html>
	`
}
