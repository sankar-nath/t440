//express
const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080

const path = require("path");

app.use(express.static(`public`))
app.use(express.json())

//express-handlebars
const exphbs = require("express-handlebars")
app.engine(`.hbs`, exphbs.engine({ extname: `.hbs` }))
//this line is new. it's from the code along document. 
app.set("views", "./views");
app.set(`view engine`, `.hbs`)

//default endpoint
app.get("/", (req, res) => {
    console.log(`here at /`)
    res.sendFile(path.join(__dirname,"./views/index.html"))
})

const onHttpStart = () => {
    console.log(`Express web server running on port: ${HTTP_PORT}`)
    console.log(`Press CTRL+C to exit`)
}
app.listen(HTTP_PORT, onHttpStart)