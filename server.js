var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()

const {
	saveForm,
	showData
} = require('./src/pages.js')

app
.use(bodyParser.json()) // for parsing application/json
.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
.use(bodyParser.urlencoded({extended: true}))// receber os dados do req.body
.use(cors())

// Rotas da aplicação
.post("/save", saveForm)
.get("/show", showData)
.get("/", (req, res) => {
	res.send("<h1>Pagina Errada</h1>")
})

// start do servidor
.listen(process.env.PORT || 3000)
