const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;


// ---- CONNECT YOUR DATABASE -------


// 1. MongoAtlas connection string
const mongoose = require("mongoose");
// TODO: Replace this with your mongodb connection string
// The mongodb connection string is in the MongoAtlas web interface


const CONNECTION_STRING =
    "mongodb+srv://zanky9:30NJIgxMpnIRnHh1@cluster0.xa0expf.mongodb.net/myDb?retryWrites=true&w=majority";

//gotta add myDb in the string name

mongoose.connect(CONNECTION_STRING);
// check if connection was successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to database: "));
db.once("open", () => {
    console.log("Mongo DB connected successfully.");
});


//after connection and before endpoint
//mongoose scheme
const Schema = mongoose.Schema
//mongoose model
const studentSchema = new Schema({ name: String, username: String, tuitionPaid: Boolean, gpa: Number })

//mongoose takes what is there and turns it into plural.
const Student = mongoose.model("student", studentSchema);

//default endpoint
//added async in the function declaration
app.get("/", async (req, res) => {
    try {
        // query the database
        const results = await Student.find().lean().exec();
        // results = an array of matching documents
        if (results.length === 0) {
            return res.send("Sorry, there are no matching results");
        } else {
            return res.send(results);
        }
    } catch (err) {
        console.log(err);
        return res.send(err)
    }
});

//whenever you see await, there needs to be an async
app.get("/insert", async (req, res) => {
    const studentToInsert = new Student({ name: "Superman", "username": "sups007", gpa: 3.1, tuitionPaid: true })
    try {
        //save will try to save to db

        await studentToInsert.save()
        return res.send("entered")
    }
    catch (err) {
        console.log("catch block")
        return res.send(err)
    }

})

app.get("/delete", async (req, res) => {
    try {
    // get the document by id
    const userToDelete = await Student.findOne({_id:"651b49d6bbdce8e38b272cd8"})
    
    
    if (userToDelete === null) {
    return res.send("Cannot find student with the specified id")
    }
    // after retrieving the document, delete it
    const result = await userToDelete.deleteOne()
    
    
    return res.send(`Deleted item is: ${result}`)
    } catch (err) {
    // display error message in browser & console
    console.log(err)
    return res.send(err)
    }
    })

    app.get("/deleteid/:id", async (req, res) => {
        console.log(req.params);
        try {
        // get the document by id
        const userToDelete = await Student.findOne({_id:req.params.id})
        
        
        if (userToDelete === null) {
        return res.send("Cannot find student with the specified id")
        }
        // after retrieving the document, delete it
        const result = await userToDelete.deleteOne()
        
        
        return res.send(`Deleted item is: ${result}`)
        } catch (err) {
        // display error message in browser & console
        console.log(err)
        return res.send(err)
        }
        })
    

const onHTTPStart = () => {
    console.log("Server is ready")
}

app.listen(HTTP_PORT, onHTTPStart)