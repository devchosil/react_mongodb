const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require('express-session');
const { isAuthenticated } = require('passport');

//body-parser 사용하기 위해 아래 코드 추가
//body-parser라이브러리는 input에 넣은 내용을 해석할 수 있게?
//이부분 안넣어줬더니 bcrypt부분 undefined로 나옴 꼭 추가해줄것!!!!
app.use(express.urlencoded({extended: true})) 
require('dotenv').config();
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const MongoClient = require('mongodb').MongoClient;

app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use(express.json());   


const LocalStrategy = require('passport-local').Strategy;
app.use(session({
    secret: '비밀코드',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

//passport 라이브러리 설치 사용
app.use(passport.initialize());
app.use(passport.session()); 

// mongo db 연결
var db;
var url = process.env.REACT_APP_URL;

// 암호화 기능
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

MongoClient.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    //dababase 접속이 완료 되면, 8080에 nodejs 서버를 띄워라    
    function(에러,client){
        if(에러) return console.log(에러);

        db= client.db('skdshare');

        app.listen(8080, function(){  
            console.log("listening on 8080")
        })
    }
)

// 아이디, 비번을 인증해주는 코드. 복붙하고 수정해서 쓰기
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
}, function (enteredId, enteredPassword, done) {

    db.collection('user').findOne({ id: enteredId }, function (에러, 결과) {
    if (에러) return done(에러)
    if (!결과) {
        return done(null, false, { message: '존재하지않는 아이디요' })
    } else {
        const passwordCheck = bcrypt.compareSync(enteredPassword, 결과.password);
        if(passwordCheck) {
            return done(null, 결과)
        }  else {
            return done(null, false, { message: '비번틀렸어요' })
        }
        
    }
    })
}));

passport.serializeUser(function (user, done) {
done(null, user.id)
});

//deserializeUser는 로그인한 유저의 세션아이디를 바탕으로 개인정보를 db에서 찾는 역할
passport.deserializeUser(function (아이디, done) {
    db.collection('user').findOne({id: 아이디}, function(에러, 결과) {
        done(null, 결과)
    })
});

// 로그인 여부 체크
function isLogin(req, res,next) {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.send('로그인 하세요')
        // res.write("<script>alert('success')</script>");
        // window.location.href= '/login';
        // res.status(401).send('<script>window.location.href = "/login";</script>');
        // res.send('<script type="text/javascript">alert("오류발생");</script>');
        // res.redirect('/login');
    }
}

app.get('/', function(요청,응답){
    응답.sendFile(path.join(__dirname, 'react-project/build/index.html'));
})


// 내가한거
// app.post('/login', passport.authenticate('local', { 
//     failureRedirect : '/fail'
// }),function(req,res){
//     // 이거 여기서 안돼서 일단 client side에서 해결함 (navigate로)
//     res.redirect('/test');
// })

// 1번째 챗지피티 해결책
// app.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         console.log(info);
//         console.log(user);
//         if (err) {
//             console.error(err);
//             return res.redirect('/login');
//         }
//         if (!user) {
//             return res.redirect('/login');
//         }
//         req.login(user, (err) => {
//             if (err) {
//                 console.error(err);
//                 return res.redirect('/login');
//             }
//             return res.redirect('/');
//         });
//     })(req, res, next);
// });

// 2번째 챗지피티 해결책
// app.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             console.error(err);
//             // Handle the error appropriately (e.g., return an error JSON response).
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         if (!user) {
//             // Redirect to the login page in case of a failed login.
//             return res.redirect('/login');
//         }
//         req.login(user, (err) => {
//             if (err) {
//                 console.error(err);
//                 // Handle the error appropriately (e.g., return an error JSON response).
//                 return res.status(500).json({ error: 'Internal server error' });
//             }
//             // Send a JSON response indicating a successful login.
//             res.status(200).json({ message: 'Login successful' });
//         });
//     })(req, res, next);
// });

//3번쨰..
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            // Handle the error appropriately (e.g., return an error JSON response).
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            // Redirect to the login page in case of a failed login.
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                // Handle the error appropriately (e.g., return an error JSON response).
                return res.status(500).json({ error: 'Internal server error' });
            }
            // console.log(user);
            // Send a JSON response indicating a successful login.
            res.status(200).json(user);
        });
    })(req, res, next);
});


app.get('/logout', (req, res) => {
    req.logout((err) => { // Passport's logout function clears the session
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

app.get('/test', isLogin ,function(요청, 응답) {
    
    // 응답.render('Test.js',{ user: 요청.user});
    응답.json(요청.user);
    // db.collection('user').find({}).toArray(function(에러,result){
    //     // console.log('reslut');
    //     console.log(요청.user)
    //     응답.json({ user: 요청.user });
    //     // 응답.json(result);
    // });
})

app.post('/signup', function(req, res) {
    db.collection('user').findOne({ id: req.body.id }, function(에러, 결과){
        // const password = 요청.body.signUpPw;
        if(!결과) {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if (err) throw err;
                // Store 'hash' in the database
                db.collection('user').insertOne({ id: req.body.id, password: hash, nickname: req.body.nickname}, 
                    function(에러, 결과) {
                    res.redirect('/');
                })
            });
        } else {
            res.send('중복된 아이디')
        }
    })
})

//리액트 라우터 쓰는 경우, 아래 코드를 최하단에 추가해놓는게 좋음
app.get('*', function(요청,응답){
    응답.sendFile(path.join(__dirname, 'react-project/build/index.html'));
})