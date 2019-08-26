//Requisitar module express para a var express
var express = require("express");
//requisitar fuction express para var app
app = express();
//requisitar module de outro arquivo js
var mat = require("./teste.js");

console.log(mat.soma(1,2));

app.get("/cadastro", function(req, res){
	res.send("<strong>white")
})

app.get("/cadastro/:nome/:idade", function(req, res){
	res.send(req.params.nome);
})

app.listen(8081, function(){
	console.log("servidor rodando");
})