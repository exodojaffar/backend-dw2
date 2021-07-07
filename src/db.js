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

function getRowFrom(table, callback) {
	client.query(`SELECT * FROM ${table};`, callback);
}



module.exports = {saveDataOfContato, getRowFrom};
