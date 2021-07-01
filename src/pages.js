const db = require('./db.js');

function saveForm(req, res) {
	const {nome, email, msg} = req.body; 

	if (
		(nome == undefined)||
		(email == undefined)||
		(msg == undefined)
	){
		return res.status(418).json({"ok":false, "error":"Falta um campo ae"})
	}

	db.saveDataOfContato({nome, email, msg})	

	return res.status(200).json({"ok": true})
}

function showData(req, res) {
	let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Amostra de dados</title>
      <style>
        table, th, td {
          border: 1px solid black;
        }
      </style>
    </head>

		<body>
      <table>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Mensagem</th>
        </tr>`

  const addRowOnTable = ({nome, email, mensagem}) => {
    html += `<tr>
        <th>${nome}</th>
        <th>${email}</th>
        <th>${mensagem}</th>
      </tr>`;
  }

  const endComposition = () => {
    html += `</table></body></html>`
    res.send(html)
  }

  db.getRowFrom('contato', (err, res) => {
    if (err) throw err;

    for (let row of res.rows) {
      addRowOnTable(row)      
    }

    endComposition()

  })

  

  
}

module.exports = {
	saveForm, showData
}