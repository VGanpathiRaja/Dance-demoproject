// var express = require('express');
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

// const app =  express();

// app.use(bodyParser.json());
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));


// mongoose.connect("mongodb://127.0.0.1:27017/Dance",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// var db =mongoose.connection;
// db.on ("error",()=>{console.log("Error in Connecting Database")});
// db.once ("open",()=>{console.log("Connected Data base succesfully")});

// app.post("/Eventinfo",(req,res)=>{
//     const FullName = req.body.fullname;
//     const Aadhaar = req.body.aadhaar;
//     const Email = req.body.email;
//     const Mobilenumber = req.body.mnumber;
//     const Address = req.body.address;
//     const City = req.body.city;
//     const State = req.body.state;
//     const Zipcode = req.body.zipcode;
//     const Recode = req.body.records;
//     const Category = req.body.catagory;
//     const Messeges = req.body.msgs;
//     var data ={
//         "Full Name"     : FullName,
//         "Aadhaar"       : Aadhaar,
//         "Email"         : Email,
//         "Mobilenumber"  : Mobilenumber,
//         "Address"       : Address,
//         "City"          : City,
//         "State"         : State,
//         "Zipcode"       : Zipcode,
//         "Recode"        : Recode,
//         "Category"      : Category,
//         "Messeges"      : Messeges
//     };
//     db.collection("Eventinfo").insertOne(data,(err, collection)=>{
//         if(err){
//             console.log("Error inserting Record",err);
//             return res.status(500).send("Error inserting time");
//         }
//         console.log("Record Inserted Succefully :",collection.insertedId);
//         return res.redirect("succesfull.html");
//     });
// });


// app.get("/",(req, res)=>{
//     res.set({"Allow-access-Allow-Origin": "*" });
//     return res.redirect("contact.html");
// });

// app.listen(8085,()=>{
//     console.log("Server Running On Port");
// });

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/Dance", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", (error) => {
    console.error("Error connecting to database:", error);
});
db.once("open", () => {
    console.log("Connected to database successfully");
});

app.post("/Eventinfo", (req, res) => {
    const { fullname, aadhaar, email, mnumber, address, city, state, zipcode, records, catagory, msgs } = req.body;
    const data = {
        FullName: fullname,
        Aadhaar: aadhaar,
        Email: email,
        Mobilenumber: mnumber,
        Address: address,
        City: city,
        State: state,
        Zipcode: zipcode,
        Recode: records,
        Category: catagory,
        Messages: msgs
    };
    db.collection("Eventinfo").insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record inserted successfully:", collection.insertedId);
        return res.redirect("successful.html");
    });
});

app.get("/", (req, res) => {
    res.set({ "Allow-access-Allow-Origin": "*" });
    return res.redirect("contact.html");
});

app.listen(8085, () => {
    console.log("Server running on port 8085");
});
