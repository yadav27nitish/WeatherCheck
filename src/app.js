const express = require('express');
const { appendFile } = require('fs');
const path = require('path');
const hbs = require('hbs');


const PORT = process.env.PORT || 8001;

const app = express();
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));


app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/weather',(req,res)=>{
    res.render('weather');
});

app.get('*',(req,res)=>{
    res.render('404error',{
        errorMsg : 'Opps! page Not Found'
    });
});


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    console.log('running...');
})