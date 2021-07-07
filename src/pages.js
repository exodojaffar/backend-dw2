const db = require('./db.js');
const email_sender_node = require('nodemailer');
const transporter = email_sender_node.createTransport({
  service:"Gmail",
  host:"smtp",
  auth:{
    user:"desenvolvimentow2angdav@gmail.com",
    pass:"yxWKnpmW3mi3RbE"
  }
})

function saveForm(req, res) {
	const {nome, email, msg} = req.body;

	if (
		(nome == undefined)||
		(email == undefined)||
		(msg == undefined)
	){
		return res.status(418).json({"ok":false, "error":"Falta um campo ae"})
	}
  let emailToSend = {
    from:"desenvolvimentow2angdav@gmail.com/",
    to:email,
    subject:`${name}, olá e bem-vindo! Hello there and `,
    text:`${nome},\n\nPt-BR: Nós do projeto só podemos agradecer, seu interesse demonstra que estamos indo pelo caminho certo e isso nos deixa muito agradecido, obrigado!\n\n En-USA: we from the project are very thankful, you're interested show to us that we are going to the correct way, thank you! \n\nASS: João Lucas & Êxodo Jaffar.`
  }
  email_sender(emailToSend, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("sent");
    }
  });

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