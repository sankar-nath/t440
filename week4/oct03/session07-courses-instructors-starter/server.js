const express = require("express")
const app = express()
const HTTP_PORT = process.env.PORT || 8080


// configure a folder for external css stylesheets and images
app.use(express.static("assets"))

// import handlebars
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// receive data from a <form>
app.use(express.urlencoded({ extended: true }))





/// --------------
// DATABASE : Connecting to database and setting up your schemas/models (tables)
/// --------------

// TODO: Replace this connection string with yours
const mongoose = require("mongoose")

const CONNECTION_STRING = "mongodb+srv://zanky9:30NJIgxMpnIRnHh1@cluster0.xa0expf.mongodb.net/myDb?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to database: "));
db.once("open", () => { console.log("Mongo DB connected successfully."); });


//let's define our schema and models here. 
// schemas
const Schema = mongoose.Schema
const CourseSchema = new Schema({ title: String, code: String, taughtBy: String })
const InstructorSchema = new Schema({ firstName: String, lastName: String, email: String, username: String })

// models
const Course = mongoose.model("course_collection", CourseSchema)
const Instructor = mongoose.model("instructor_collection", InstructorSchema)

// ----------------
// endpoints
// ----------------
app.get("/", (req, res) => {
    res.render("index", { layout: false })
})

app.get("/catalogue", async (req, res) => {
    try {
        // display a list of courses

        //gets all course documents
        const results = await Course.find().lean().exec()
        if (results.length === 0) {
            return res.send("Sorry, there are no matching results");
        } else {
            console.log(results)
            // return res.send(results);

            //the second property of res.render will be an object.
            return res.render("catalog-page",
                {
                    layout: false,
                    results: results
                })
        }
    } catch (err) {
        console.log(err)
    }



})



app.post("/lookup", async (req, res) => {

    // get name from form
    const nameFromUI = req.body.instructorName
    console.log(`DEBUG: Searching for ${nameFromUI}`)

    try {
        // search for instructor
        const instructorList = await Instructor.find({ firstName: nameFromUI }).lean().exec()
        //return res.send("TODO: Searching for an instructor.")
        console.log(`printing instructorList`)
        console.log(instructorList)

        if (instructorList.length === 0) {
            return res.send("Sorry, there are no matching results");
        } else {

            let data = [];
            for (instructor of instructorList) {
                const userid = instructor.username
                const courses = await Course.find({ taughtBy: userid }).lean().exec()
                console.log(`printing courses`)
                console.log(courses)
                // data.push(instructor)
                // console.log(`printing data`)
                //console.log(data)

                const objectToAdd = {
                    name: `${instructor.firstName} ${instructor.lastName}`,
                    email: instructor.email,
                    coursesTaught: courses
                }

                data.push(objectToAdd)
                console.log(`printing data`)
                console.log(data)
                return res.render("instructor-page", {
                    layout: false,  
                    instructorList: data
                })

            }
        }

    } catch (error) {
        console.log(error)
    }


})

app.post("/enroll", async (req, res) => {

    // get values from form
    console.log(`DEBUG: Form data`)
    console.log(req.body)
    const courseCodeFromUI = req.body.courseCode
    const useridFromUI = req.body.instructorName

    try {
        //1. find the course
        //find - finds all and returns as array
        //findOne() - finds the first document that matches and returns just single object
        const courseFromdb = await Course.findOne({ code: courseCodeFromUI })
        console.log(`printing courseFromdb`)
        console.log(courseFromdb)
        if (courseFromdb === null) {
            res.send("Could not find course")
        }

        //2. check if course has intructor or not
        if (courseFromdb.taughtBy !== "") {
            res.send(`Course already has an instructor : ${courseFromdb.taughtBy} `)
        }
        //res.send("Course found and has no instructor")

        //3. check if instructor has <3 courses

        const instructorFromdb = await Instructor.findOne({ username: useridFromUI }).lean().exec();
        if (instructorFromdb === null) {
            res.send("Could not find instructor")
        }
        //res.send("Course found and has no instructor")
        console.log(`printing instructorFromdb:`)
        console.log(instructorFromdb)

        // 4. check if instructor has >3 courses
        const coursesTaught = await Course.find({ taughtBy: instructorFromdb.username }).lean().exec()
        if (coursesTaught.length === 3) {
            return res.send("ERROR: This instructor is already at the max number of courses")
        }

        // 5. If you reach this point, the instructor can be assigned
        const updatedValues = {
            taughtBy: instructorFromdb.username
        }

        // 3. after updating, save changes
        const finalResult = await courseFromdb.updateOne(updatedValues)
        return res.send("DONE!!!!!")


        // associate a instructor with a course
        // find the instructor
        // check if they meet the criteria
        // add them to course
        //return res.send("TODO: Assign course to instructor")
    } catch (error) {
        console.error(error)
    }
})



// ----------------
const onHttpStart = () => {
    console.log(`Express web server running on port: ${HTTP_PORT}`)
    console.log(`Press CTRL+C to exit`)
}
app.listen(HTTP_PORT, onHttpStart)
