const { name } = require('ejs');
const express = require('express');
const path = require('path');

const db =require('./config/mongoose');
const contact = require('./models/contact');
const Contact = require('./models/contact');

const port = 8000;
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//app.use(function(req,res,next)
// {
//     req.body.name='jaiho';
//      console.log( req.body);
//      next();
// });

// var contacts = [
//     {
//         name:"Siddharth",
//         phone:"7357757995"
//     },
//     {
//         name:"Snehlata",
//         phone:"8000058771"
//     },
//     {
//         name:"Ramkaran Charan",
//         phone:"9001615467"
//     }
// ]

    app.get('/',function(req, res)
    {
        //res.send('<h1>Ye rishta Khatm kyon nhi ho jata h?</h1>');
        
        Contact.find({}, function(err,contacts)
        {
            if(err) {
                console.log("Error in fecthing contacts in db");return;
            }
            return res.render('home', {title: "Contact-List",contact_list: contacts});
        });

    });
     
    app.get('/practice',function(req,res)
    {
          return res.render('practice',{title: "oppppp"});
    }
    );
    app.post('/create-contact',function(req,res)
    {
       // console.log(req.body.phone);
            Contact.create({
                name: req.body.name,
                phone: req.body.phone
            },
            function(err, newContact)
            {
                if(err) {console.log('error in creating ac contact');return;}
                console.log(newContact);
               
            }
            );
            Contact.find().sort({"KEY":1});
            return res.redirect('/');

    });

    app.get('/delete/:id',function(req,res)
    {
        console.log(req.params);
        let id = req.params.id;
       Contact.findByIdAndDelete(id, function(err){
           if(err)
           {
               console.log('error in delleting from database');
               return;
           }
       }
       );
        return res.redirect('back');
    });





app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log("Server is up and running on port:", port);
});