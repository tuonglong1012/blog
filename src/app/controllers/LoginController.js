const Login = require('../models/Login');
const bcrypt = require('bcrypt');

class LoginController {
    // [GET] /
    login(req, res, next) {
        res.render('register/login', {layout: false})
    };
    // [GET] /signup
    signup(req, res, next) {
        res.render('register/signup', {layout: false})
    };

    // [POST] /signup
    async register(req, res, next) {
        const data = {
            name: req.body.username,
            password: req.body.password
        };
        const existingUser = await Login.findOne({name: data.name}); 
        if (existingUser) { 
            res.send('User already exists. Please choose a different username')       
        } else{
            //hash password using bcrypt 
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword; // Replace hash password with original password
            
            const newUser = await Login.insertMany(data);
            res.redirect('/');
        }
    } 
           
    async signin(req, res, next) { 

        const checkUser = await Login.findOne({name: req.body.username});
        console.log(checkUser)
        if(!checkUser) {
            res.send('User not found')
        }

        const matchPass = await bcrypt.compare(req.body.password, checkUser.password);
        if(matchPass) {
            res.redirect('/home');
        }else{
            res.send('wrong password!!')
        }
        
        // let userQuery = Login.findOne({name: req.body.username});

        // Promise.all([userQuery, bcrypt.compare(req.body.password, newUser)])
        // .then(([userName, userPass]) => {
        //     if(!userName) {
        //         res.send('User not found');
        //     }
        //     if(userPass) {
        //         res.render('home')
        //     }
        // })
        
        // .catch(next)      
        
    }
};

module.exports = new LoginController();