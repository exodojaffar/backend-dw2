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
	return new Promise((resolve, reject) => {
	    setTimeout(() => {
	        client.query(`INSERT INTO contato VALUES('${nome}', '${email}', '${msg}');`, (err, res) => {
	            if (err) {
	                reject(err)
	            } else {
	                resolve(true)
	            }
	        })
	    }, 0)
	})
}

// client.query('SELECT * FROM contato;', (err, res) => {
// 	if (err) throw err;

// 	for (let row of res.rows) {
// 	 console.log(JSON.stringify(row));
// 	}

// 	client.end();
// });

module.exports = {saveDataOfContato};
