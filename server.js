const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.json());
var cors = require('cors');
app.use(cors());  //npm install cors도 해야함

const MongoClient = require('mongodb').MongoClient;

app.use(express.static(path.join(__dirname, 'react-project/build')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

// mongo db 연결
var db;
var url = process.env.REACT_APP_URL;


MongoClient.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    //dababase 접속이 완료 되면, 8080에 nodejs 서버를 띄워라    
    function(에러,client){
        if(에러) return console.log(에러);

        db= client.db('todoapp');

        app.listen(8080, function(){  
            console.log("listening on 8080")
        })

        //예 db에 있던 상품명을 보여주려면?

    }
)

//     app.listen(8080, function(){  
//         console.log("listening on 8080")
//     }
//     )

app.get('/', function(요청,응답){
    응답.sendFile(path.join(__dirname, 'react-project/build/index.html'));
})

app.get('/test',(요청, 응답) => {

    db.collection('post').find({}).toArray(function(에러,result){
        console.log('데이터 가져오기 성공');
        응답.json(result)
    });
    // res.json({posts:data});
    //res.send(data); 
    // res.sendFile(path.join(__dirname, 'react-project/build/index.html'));


})

    //리액트 라우터 쓰는 경우, 아래 코드를 최하단에 추가해놓는게 좋음
    app.get('*', function(요청,응답){
        응답.sendFile(path.join(__dirname, 'react-project/build/index.html'));
    })