const express = require('express')
const nunjucks = require('nunjucks')
const videos = require("./data")

const server = express()

server.use(express.static('public'))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res){
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/60721955?s=460&u=04b5aff9c52deff189096ac172026cef30bfc886&v=4",
        name: "Douglas Soares",
        role: "Desenvolvedor - FullStack",
        description: "Programador Full Stack, sonha em dominar o mundo da programação, visite meu <a href='https://www.facebook.com/Shaardth' target='_blank'>perfil</a>.",
        links:[
            {name: "GitHub", url: "https://github.com/dougshaard"},
            {name: "Facebook", url: "https://www.facebook.com/Shaardth"},
            {name: "LinkedIn", url: "https://www.linkedin.com/in/dougsoares/"},
        ]
    }
    return res.render("about", {about})
})
server.get('/portfolio', function(req, res){
    return res.render("portfolio", {items: videos})
})
server.get('/video', function(req, res){
    const id = req.query.id
    const video = videos.find(function (video) {
        return video.id == id
    })

    if(!video){
        return res.send("Video não encontrado")
    }
    return res.render("video", {item:video})

})
server.listen(5003, function() {
    console.log("Servidor rodando")    
})