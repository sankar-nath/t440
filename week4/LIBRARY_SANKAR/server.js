//expres code
const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080

// configure a folder for external css stylesheets and images
app.use(express.static("."))

// import handlebars
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// receive data from a <form>
app.use(express.urlencoded({ extended: true }))

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
        return res.render("login-template", { errorMsg: "You must log-in to see this page!", layout: "main-layout" })
    }
}


// Database mongoose 
const mongoose = require("mongoose")

const CONNECTION_STRING = "mongodb+srv://zanky9:30NJIgxMpnIRnHh1@cluster0.xa0expf.mongodb.net/myDb?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to database: "));
db.once("open", () => { console.log("Mongo DB connected successfully."); });

//let's define our schema and models here. 
// schemas
const Schema = mongoose.Schema
const bookSchema = new Schema({ title: String, author: String, image: String, borrowedBy: String })
const userSchema = new Schema({ name: String, cardnumber: String, phonemumber: String, password: String })

// models
const bookModel = mongoose.model("books_collection", bookSchema)
const userModel = mongoose.model("users_collection", userSchema)

let booksCollection = [
    {
        title: "A People's History of the United States",
        author: "Howard Zinn",
        image: "book1.jpeg",
        borrowedBy: "1001001"
    },
    {
        title: "Guns, Germs, and Steel: The Fates of Human Societies",
        author: "Jared Diamond",
        image: "book2.jpeg",
        borrowedBy: ""
    },
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        image: "book3.jpeg",
        borrowedBy: "1001002"
    },
    {
        title: "The Wright Brothers",
        author: "David McCullough",
        image: "book4.jpeg",
        borrowedBy: ""
    }
];

let usersCollection = [
    {
        name: "Peter Smith",
        cardnumber: "1001001",
        phonemumber: "415-555-1234",
        password: "1234"
    },
    {
        name: "Amy Wong",
        cardnumber: "1001002",
        phonemumber: "602-888-0000",
        password: "0000"
    }
]

let userProfile = {}

app.get("/", (req, res) => {
    console.log(`Here at /`)
    res.render("home-template",
        {
            layout: "main-layout",
            books: booksCollection
        })


})

app.get("/login", (req, res) => {
    console.log(`Here at /login`)
    res.render("login-template",
        {
            layout: "main-layout",
            books: booksCollection
        })
})

//log out user and save data to db, destroy session
app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")

})

app.get("/profile", ensureLogin, (req, res) => {
    console.log(`Here at /profile`)
    const borrowedBooks = booksCollection.filter(book => book.borrowedBy === userProfile.cardnumber);
    console.log(borrowedBooks)
    res.render("profile-template",
        {
            layout: "main-layout",
            user: userProfile,
            borrowedBooks: borrowedBooks
        })
})

app.post("/login", (req, res) => {
    console.log(`here at post login`)
    const userNameFromUI = req.body.username;
    const passwordFromUI = req.body.password;
    console.log(`userNameFromUI is: ${userNameFromUI}`)
    console.log(`passwordFromUI is: ${passwordFromUI}`)

    if (userNameFromUI === undefined ||
        passwordFromUI === undefined ||
        userNameFromUI === "" ||
        passwordFromUI === "") {
        //there is some error as fields are empty
        return res.render("login-template", { errorMsg: "Please fill in all fields", layout: "main-layout" })
    }
    //let's create a for loop to iterate through the userList
    let flag = true;
    for (user of usersCollection) {

        if (userNameFromUI === user.cardnumber &&
            passwordFromUI === user.password) {
            //valid login
            console.log(`succesful login`)

            //before redirecting user, we will save our session information 
            req.session.user = {
                uname: user.cardnumber,
                name: user.name,
            }
            console.log(`setting user profile`)

            //we will use this to pass along data to the profile page
            userProfile = {
                cardnumber: user.cardnumber,
                name: user.name,
            }
            req.session.isLoggedIn = true
            console.log(`printing req.session.user`)
            console.log(req.session.user)
            flag = true;

            return res.redirect("/profile")
        }
        else {
            flag = false;

        }
    }
    if (!flag) {
        return res.render("login-template", { errorMsg: "Incorrect Credentials. Please try again", layout: "main-layout" })
    }



})

app.post("/borrow/:title", (req, res) => {
    const title = req.params.title;
    if (!req.session.isLoggedIn) {
        return res.redirect("/login");
    }

    const book = booksCollection.find(book => book.title === title);

    if (book.borrowedBy === req.session.user.uname) {
        //self
        return res.render("home-template", { errorMsg: "You have borrowed this book", layout: "main-layout", books: booksCollection });
    }

    if (book.borrowedBy !== "") {
        //other
        return res.render("home-template", { errorMsg: "This book is borrowed by another user", layout: "main-layout", books: booksCollection });
    }
    //add to user
    book.borrowedBy = req.session.user.uname;
    return res.redirect("/profile");


})

app.post("/return/:title", (req, res) => {
    const title = req.params.title;
    if (!req.session.isLoggedIn) {
        return res.redirect("/login");
    }

    const book = booksCollection.find((book) => book.title === title);

    if (!book) {
        return res.render("profile-template", {
            errorMsg: "Book not found",
            layout: "main-layout",
            user: userProfile,
            booksCollection: booksCollection,
        });
    }

    if (book.borrowedBy !== req.session.user.uname) {
        return res.render("profile-template", {
            errorMsg: "You cannot return a book you did not borrow",
            layout: "main-layout",
            user: userProfile,
            booksCollection: booksCollection,
        });
    }

    // update user's status
    book.borrowedBy = "";
    return res.redirect("/profile");
})


const onHttpStart = () => {
    console.log(`Express web server running on port: ${HTTP_PORT}`)
    console.log(`Press CTRL+C to exit`)
}
app.listen(HTTP_PORT, onHttpStart)