const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://itsabhijit664:85ZWQw0upb6geRt5@cluster0.ixihn.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

// app.use((req,res,next) => {
//     console.log('First middleware');
//     next();
// });

app.post("/api/post",(req,res,next) => {
    // before creating a Post model using mongoose
    // const post = req.body;

    // after creating a Post model using mongoose
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    console.log('at the line 25, the post is',post);
    res.status(201).json({
        message: 'Post added successfully!'
    });
});
// 85ZWQw0upb6geRt5
app.get('/api/posts', (req,res,next) => {
    // res.send('Hello from express!');

    // before creating a Post model using mongoose
    // const posts = [
    //     {
    //         id: 'fadf12421l',
    //         title: 'First server-side post',
    //         content: 'The first post is coming from the server!'
    //     },
    //     {
    //         id: 'ksajflaj132',
    //         title: 'Second server-side post',
    //         content: 'The second post is coming from the server!'
    //     }
    // ];

    // after creating a Post model using mongoose
    Post.find().then(documents => {
        // console.log('documents are',documents);
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: documents
        });
    });
});

app.delete("/api/post/:id", (req,res,next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log('the result is',result);
        res.status(200).json({
            message: 'Post deleted!'
        });
    });
});

module.exports = app;