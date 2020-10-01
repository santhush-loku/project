const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_KEY = '1234';

const DB_CONFIGS = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "project"
};


app.use(express.json({limit: '50mb', extended: true}));
app.use(cors());

app.post('/login', function(req, res){
    let data = req.body;

    if(!data.username || !data.password){
        res.status(401).send('Please enter valid credentials');
        return;
    }

    const con = mysql.createConnection(DB_CONFIGS);
    con.connect(function (err) {
        if(err) throw err;
        let sql = `select id, password, role from user where username='${data.username}'`;
        con.query(sql, function (err, result) {
            if (err) throw err;

            if(result.length === 0){
                res.status(401).send('Please enter valid credentials');
                return;
            }

            const matched = bcrypt.compareSync(data.password, result[0].password);
            if(!matched){
                res.status(401).send('Please enter valid credentials');
                return;
            }

            const token = jwt.sign({ id: result[0].id }, JWT_KEY);

            res.send({
                token: token,
                user: {
                    id: result[0].id,
                    role: result[0].role,
                    username: data.username
                }
            });
            con.end();
        })
    });

});

app.post('/users', function(req, res){
    bcrypt.hash(req.body.password, 10, (err, hash) => {

        const con = mysql.createConnection(DB_CONFIGS);

        con.connect(function (err) {
            if(err) throw err;
            let sql = `INSERT INTO user VALUES (null, '${req.body.username}', '${hash}', '${req.body.role}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                res.send();
            })
        });
    });
});

app.post('/items', function(req, res){

    let photo = req.body.photo===null ? null: Buffer.from(req.body.photo, 'base64');

    const con = mysql.createConnection(DB_CONFIGS);

    con.connect(function (err) {
        if(err) throw err;
        let sql = 'INSERT INTO item SET ?';
        let values = {
            id:null,
            name: req.body.name,
            photo: photo,
            price: req.body.price,
            category: req.body.category,
            rate: req.body.rate,
        }
        con.query(sql, values, function (err, result) {
            if (err) throw err;
            res.send();
        })
    });
});

app.get('/items', function(req, res){

    const page = req.query.page ? req.query.page : 1;
    const pageSize = 10;
    const category = req.query.category ? req.query.category : '';
    const name = req.query.name ? req.query.name : '';

    let start = (page - 1) * pageSize;

    const con = mysql.createConnection(DB_CONFIGS);

    con.connect(function (err) {
        if(err) throw err;
        let sql = `select * from item where name like '%${name}%' and category like '%${category}%' limit ${start},${pageSize}`;
        let sqlCount = `select count(*) as c from item where name like '%${name}%' and category like '%${category}%'`;
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;

            result = result.map((object)=>{
                if(object.photo){
                    object.photo = new Buffer(object.photo).toString('base64');
                }
                return object;
            })

            con.query(sqlCount, function (err, countResult) {
                if (err) throw err;
                res.send({
                    data: result,
                    totalCount: countResult[0].c,
                    page: page,
                    pageSize: pageSize,
                    totalPageCount: Math.ceil(countResult[0].c/pageSize),
                    isFirst: page === 1,
                    isLast: page === Math.ceil(countResult[0].c/pageSize),
                });
                con.end();
            })
        })
    });
});

app.listen(3000);
