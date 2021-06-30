require('dotenv').config()
const { Client } = require('pg');

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
	 rejectUnauthorized: false
	}
});

client.connect();

function saveDataOfContato({nome, email, msg}) {
	// client.connect();

	client.query(`INSERT INTO contato VALUES('${nome}', '${email}', '${msg}');`)

	// client.end();
}

// client.query('SELECT * FROM contato;', (err, res) => {
// 	if (err) throw err;

// 	for (let row of res.rows) {
// 	 console.log(JSON.stringify(row));
// 	}

// 	client.end();
// });

module.exports = {saveDataOfContato};
