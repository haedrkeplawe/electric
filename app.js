const express = require("express");
const app = express();
const port = 3003;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");

app.set("view engine", "ejs");
app.use(express.static("public"));

// GET
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/arabic", (req, res) => {
    User.find()
        .then((result) => {
            res.render("type/typeof", { arr: result, type: "arabic" });
        })
});
app.get("/math", (req, res) => {
    User.find()
        .then((result) => {
            res.render("type/typeof", { arr: result, type: "math" });
        })
});
app.get("/add", (req, res) => {
    res.render("user/add", { type: req.query.type });
});
app.get("/add-old/:id", (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/add-old", { obj: result, type: req.query.type });
        })
});

// POST
app.post("/add", (req, res) => {
    User.create(req.body)
        .then(() => {
            res.redirect(`/${req.body.type}`);
        })
});

// UPDATE
app.post("/add-old/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, { type, name, quest, ans1, ans2, ans3, ans4, ans5, number } = req.body, { new: true })
        .then((updatedUser) => {
            res.redirect(`/${req.body.type}`);
        })
});

// DELETE
app.post("/delete/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.redirect(`/${req.body.type}`);
        })
});

mongoose
    .connect(
        "mongodb+srv://alihassanhaedr:c4a@cluster0.ue5ezcc.mongodb.net/electrec1?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

