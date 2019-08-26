
const mongoose = require("mongoose");
require("../model/UserModel");
const Users = mongoose.model("Users");
const bcrypt = require("bcryptjs")

exports.inserir = function(user, senha, nome, sobrenome, idade, rua, numero, bairro, complemento, email, telefone, res)
{
	var novouser = new Users({	
		"user": user,
		"senha": senha,
		"nome": nome,
		sobrenome: sobrenome,
		"idade": idade,
		endereco:
		 {
			rua: rua,
			"numero": numero,
			bairro: bairro,
			"complemento": complemento,
		 },
		email: email, 
		"telefone": telefone
	})

	
	bcrypt.genSalt(10, (erro, salt)=>	
	{
		bcrypt.hash(novouser.senha, salt, (erro, hash)=>
		{
			novouser.senha = hash
			novouser.save().then(()=> 
			{
				console.log(this.login(user, senha, res))}).catch((err) => 
				{
				res.send(err.errmsg);
				})

			})
		})
	}	
exports.login = function(user, senha, res)
{
	Users.findOne({"user": user}).select('+senha').then((data) => 
	{
		if (!data) {
			console.log("Usuario não existe")
			res.send("0")
		} else {
			 bcrypt.compare(senha, data.senha, (erro, igual) => {
			 	if(igual){
			 		res.send(data._id)
			 	}
			 	else {
			 		res.send("senha incorreta")
			 	}
			 })
		}
	}).catch((err) => {
		res.send(err.errmsg)
	})

}

exports.editar = function(user, senha, nome, sobrenome, idade, rua, numero, bairro, complemento, email, telefone, res)
{
	Users.findOne({"user": user}).select('+senha').then((data) => 
	{
		if (!data) {
			console.log("Usuario não existe")
			res.send("0")
		} else {
			 bcrypt.compare(senha, data.senha, (erro, igual) => {
			 	if(igual){
			 		data.user = user,
					data.nome = nome
					data.sobrenome = sobrenome,
					data.idade = idade,
					data.endereco.rua = rua,
					data.endereco.numero = numero,
					data.endereco.bairro = bairro,
					data.endereco.complemento = complemento,
					data.email = email,
					data.email = telefone,
					data.save()
					res.send("1")
			 	}
			 	else {
			 		res.send("senha incorreta")
			 	}
			 })

		}
	}).catch((err) => {
		res.send(err.errmsg)
	})

}

exports.visualizar = function(id, res){
	Users.findOne({"_id": id}).then((data) => 
	{
		if (!data) {
			res.send("0")
		 } 
		else {
			var a = {
				"user": data.user,
				"nome": data.nome,
				sobrenome: data.sobrenome,
				"idade": data.idade,		
				endereco:
 					{
					rua: data.endereco.rua,
					"numero": data.endereco.numero,
					bairro: data.endereco.bairro,
					"complemento": data.endereco.complemento,
 					},
				email: data.email, 
				"telefone": data.telefone,
			}
			res.send(a)
		}
	}).catch((err) => {
		res.send(err.errmsg)
	})
}


exports.deletar = function(id, res){
		Users.remove({"_id": id}).then((data) => 
	{
		if (!data) {
			res.send("0")
		 } 
		else {
			res.send("1 ")
		}
	}).catch((err) => {
		res.send(err.errmsg)
	})
}

