const db = require('./db.js');

function saveForm(req, res) {
	const {nome, email, msg} = req.body; 

	if (
		(nome == undefined)||
		(email == undefined)||
		(msg == undefined)
	){
		return res.status(418).json(JSON.stringify({"error":"Falta um campo ae"}))
	}

	db.saveDataOfContato({nome, email, msg})	

	return res.status(200)
}

module.exports = {
	saveForm
}