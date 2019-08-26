//carregando modulos
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

//configurações
	//body Parser
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())
	//Mongoose
	mongoose.Promise = global.Promise;
	mongoose.connect("mongodb://localhost/plataforma", {useNewUrlParser: true}).then(() => {
		console.log("Conectado ao mongodb");
	}).catch((err) => {
		console.log("Erro ao conectar no mongodb" + err);
	});
	mongoose.set('useCreateIndex', true)

//rotas
const UserRules = require("./rotas/UserRules");
app.use("/usuario", UserRules);

//outos
const PORT = 8081;
app.listen(PORT, () => {
	console.log("Servidor ativo");
})