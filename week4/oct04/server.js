//express
const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080

const path = require("path");

//express-handlebars
const exphbs = require("express-handlebars")
app.engine(`.hbs`, exphbs.engine({ extname: `.hbs` }))
//this line is new. it's from the code along document. 
app.set("views", "./views");
app.set(`view engine`, `.hbs`)

//session code
const session = require(`express-session`)

//configure the express session
app.use(session({
    secret: 'fat cat', // any random string can be used
    resave: false,
    saveUninitialized: true,
    //cookie needs to be set to false since we need to use HTTP instead of HTTPS
    cookie: { secure: false }
}))

// receive data from a <form>
app.use(express.urlencoded({ extended: true }))


// Setup a route on the 'root' of the url to redirect to /login
app.get("/", (req, res) => {
    res.redirect("/login");
});


// Display the login html page
app.get("/login", function (req, res) {
    res.render("login", { layout: false });
});

//lets define some hardcoded values. use values from db irl
// const user = {
//     username: "sankar1",
//     password: "password",
//     email: "sankar@sankar.com",
//     role: "Passenger"
// }

const userList = [
    {
        username: "passenger",
        password: "password",
        email: "sankar@sankar.com",
        role: "Passenger"
    },
    {
        username: "driver",
        password: "password",
        email: "sankar2@sankar.com",
        role: "Driver"
    }
]

app.post("/login", (req, res) => {
    const userNameFromUI = req.body.username;
    const passwordFromUI = req.body.password;
    const usertypeFromUI = req.body.usertype;
    console.log(`userNameFromUI is: ${userNameFromUI}`)
    console.log(`passwordFromUI is: ${passwordFromUI}`)
    console.log(`usertypeFromUI is: ${usertypeFromUI}`)

    if (userNameFromUI === undefined || 
        passwordFromUI === undefined || 
        usertypeFromUI === undefined ||
        userNameFromUI === "" || 
        passwordFromUI === "" ||
        usertypeFromUI === "")
        {
        //there is some error as fields are empty
        return res.render("login", { errorMsg: "Please fill in all fields", layout: false })
    }
    //if the inputs are valid, we will compare entered credentials with our data
    //let's create a for loop to iterate through the userList
    let flag = true;
    for(user of userList)
    {

    if (userNameFromUI === user.username && 
        passwordFromUI === user.password &&
        usertypeFromUI === user.role) {
        //valid login
        console.log(`succesful login`)

        //before redirecting user, we will save our session information 
        req.session.user = {
            uname: user.username,
            email: user.email,
            role: user.role
        }
        req.session.isLoggedIn = true
        console.log(`printing req.session.user`)
        console.log(req.session.user)
        //below is another value to set username. we can directly alter the property instead of creating a new object
        //req.session.username = user.username
        flag=true;

        return res.redirect("/dashboard")
    }
    else {
        flag = false;
        
    }
}
    if(!flag)
    {
        return res.render("login", { errorMsg: "Incorrect Credentials. Please try again", layout: false })
    }
})

//lets create a new middleware that ensures that user is logged in before they can access dashboard or other page

const ensureLogin = (req, res, next) => {
    if (req.session.isLoggedIn !== undefined &&
        req.session.isLoggedIn &&
        req.session.user !== undefined) {
        //user has logged in and we will allow them to go the next endpoint
        next()
    }
    else {
        //else, we will ask them to login again
        return res.render("login", { errorMsg: "You must log in to see the dashboard", layout: false })
    }
}
//we will add ensureLogin to the dashboard route declaration
app.get("/dashboard", ensureLogin, (req, res) => {
    console.log(`printing req.session.user from dashboard`)
    console.log(req.session.user)
    res.render("dashboard",
        {
            layout: false,
            user: req.session.user
        })
})
//log out user and save data to db, destroy session
app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login")

})

app.get("/profile", ensureLogin, (req,res) => {
    res.send(`Profile page`)
})

app.get("/view-jobs", ensureLogin, (req,res) => {
    //we will only show jobs if logged in user has a role Driver
    if(req.session.user.role === "Driver"){
        res.send(`Jobs page`)
    }
    else
    {
        res.send(`Page is only for drivers`)
    }
   
})

app.get("/view-rides", ensureLogin, (req,res) => {
    //we will only show rides if logged in user has a role Passenger
    if(req.session.user.role === "Passenger"){
        res.send(`Rides page!`)
    }
    else
    {
        res.send(`Rides page is only for passengers`)
    }
   
})

const onHttpStart = () => {
    console.log(`Express web server running on port: ${HTTP_PORT}`)
    console.log(`Press CTRL+C to exit`)
}
app.listen(HTTP_PORT, onHttpStart)

/* 1. create a view rides endpoint which is only visible to passengers only if they are logged in
2. create an array userList with multiple user objects with different roles
3. modify the login route to interate through the list to check for login

4. 

integrate the database

create user account entity in database
update the /login connect with database and check if credentials are correct


*/