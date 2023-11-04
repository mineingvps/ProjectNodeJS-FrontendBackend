const express = require('express');
const axios = require('axios');
const app = express();
var bodyOarser = require('body-parser');
const path = require('path');
const bodyParser = require('body-parser');

// Base URL for the API
// const base_url = "https://api.example.com";
const base_url = "http://localhost:3000";

// Set the template engine
app.set('view engine' , 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Server static files
app.use(express.static(__dirname+'/public'));


app.get("/",async (req,res) => {
    try{
        res.render("index");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/school",async (req,res) => {
    try{
        const response = await axios.get(base_url + '/school');
        res.render("school/books",{books:response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/province",async (req,res) => {
    try{
        const response = await axios.get(base_url + '/province');
        res.render("province/books",{books:response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});




app.get("/school/:id", async(req,res) => {
    try{
        const response = await axios.get(base_url + '/school/' + req.params.id);
        
        res.render("school/book",{book:response.data});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/schooll/create", (req, res) => {
    res.render("school/create");
});

app.post("/school/create",async (req,res) =>{
    try{
        const data = {name: req.body.name, number: req.body.number};
        await axios.post(base_url + '/school',data);
        res.redirect("/school");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/school/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url + '/school/' + req.params.id);
        res.render("school/update", {book: response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post ("/school/update/:id" , async (req,res) => {
    try {
        const data = { name: req.body.name, number: req.body.number };
        await axios.put(base_url + '/school/' + req.params.id, data);
        res.redirect("/school/");
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/school/delete/:id" , async (req,res) => {
    try {
        await axios.delete(base_url + '/school/' + req.params.id);
            res.redirect("/school/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});






app.get("/province/:id", async(req,res) => {
    try{
        const response = await axios.get(base_url + '/province/' + req.params.id);
        
        res.render("province/book",{book:response.data});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

 app.get("/provincee/create", (req, res) => {
    res.render("province/create"); });

app.post("/province/create",async (req,res) =>{
    try{
        const data = {province_name: req.body.province_name};
        await axios.post(base_url + '/province',data);
        res.redirect("/province/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/province/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url + '/province/' + req.params.id);
        res.render("province/update", {book: response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post ("/province/update/:id" , async (req,res) => {
    try {
        const data = { province_name: req.body.province_name};
        await axios.put(base_url + '/province/' + req.params.id, data);
        res.redirect("/province");
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/province/delete/:id" , async (req,res) => {
    try {
        await axios.delete(base_url + '/province/' + req.params.id);
            res.redirect("/province/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});






app.get("/school_province",async (req,res) => {
    try{
        const response = await axios.get(base_url + '/school_province');
        const response2 = await axios.get(base_url + '/school');
        const response3 = await axios.get(base_url + '/province');
        res.render("school_province/books",{books1:response.data ,books2:response2.data , books3:response3.data  });
        //dsdsd

    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/school_province/:id", async(req,res) => {
    try{
        const response = await axios.get(base_url + '/school_province/' + req.params.id);
        const response2 = await axios.get(base_url + '/school');
        const response3 = await axios.get(base_url + '/province');
        res.render("school_province/book",{book:response.data  ,book2:response2.data , book3:response3.data});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/school_provincee/create", (req, res) => {
    res.render("school_province/create"); });
    
app.post("/school_province/create",async (req,res) =>{
    try{
        const data = {school_id: req.body.school_id, province_id: req.body.province_id};
        
        await axios.post(base_url + '/school_province',data);
        res.redirect("/school_province/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/school_province/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url + '/school_province/' + req.params.id);
        const response2 = await axios.get(base_url + '/school/');
        const response3 = await axios.get(base_url + '/province/');
        res.render("school_province/update", {book: response.data , alldata_school : response2.data , alldata_province : response3.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post ("/school_province/update/:id" , async (req,res) => {
    try {
        const data = { school_id: req.body.school_id, province_id: req.body.province_id};

        console.log( req.body.province_id)
        await axios.put(base_url + '/school_province/' + req.params.id, data);
        res.redirect("/school_province");
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/school_province/delete/:id" , async (req,res) => {
    try {
        await axios.delete(base_url + '/school_province/' + req.params.id);
            res.redirect("/school_province/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
app.listen(5500, ()=> {
    console.log('Server started on port 5500');
});
