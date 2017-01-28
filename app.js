var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// static page, path to our index.html
app.use(express.static(__dirname+'/client'));

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

// -------------------connect to mongoDB

mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

// hadle http get request
app.get('/', function(req, res){
    res.send('Please use `/api/books` or `/api/genres`');
});

// -------------------Genres

// api/genres

app.get('/api/genres', function(req, res){
    // Genre model function
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

// same url but diff http method (post)

app.post('/api/genres', function(req, res){
    // body-parser in action
    var genre = req.body;
    // Genre model function
    Genre.addGenre(genre, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

// put

app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    // body-parser in action
    var genre = req.body;
    // Genre model function
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

// delete genre

app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    // Genre model function
    Genre.removeGenre(id, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

// -------------------Books

// show books
// api/books

app.get('/api/books', function(req, res){
    // Book model function
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

// show book
// api/books/:id

app.get('/api/books/:_id', function(req, res){
    // Book model function
    Book.getBookById(req.params._id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

// add book

app.post('/api/books', function(req, res){
    // body-parser in action
    var book = req.body;
    // Book model function
    Book.addBook(book, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

// update book

app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;
    // body-parser in action
    var book = req.body;
    // Genre model function
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

// delete book

app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;
    // Book model function
    Book.removeBook(id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

// ------------------Server

app.listen(5000);
console.log('Running on port 5000...');