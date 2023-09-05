const router = require('express').Router();

const Book = require('../models/Book.model.js');

router.get('/books/create', (req,res) => res.render('book-create.hbs'));

router.post('/books/create', (req, res, next) => { 
    // console.log(req.body)
    const {title, author, description, rating } = req.body;

    Book.create({ title, author, description, rating})
    //.then(bookFromDb => console.log(`New book created: ${bookFromDb.title}.`))
    .then(() => res.direct('/books'))
    .catch(error => next(error));
});

router.get('/books/:bookId/edit', (req, res, next) => {
    const { bookId } = req.params;   
    Book.findById(bookId)
      .then(bookToEdit => {
       // console.log(bookToEdit);
       res.render('books-edit.hbs',{book: bookToEdit});
      })
      .catch(error => next(error));
  });

router.post('/books/:bookId/edit', (req, res, next) => {
    const { bookId } = req.params;
    const { title, description, author, rating } = req.body;
   
    Book.findByIdAndUpdate(bookId, { title, description, author, rating }, { new: true })
      .then(updatedBook => res.redirect(`/books/${updatedBook.id}`))
      .catch(error => next(error));
  });

router.post('/books/:bookId/delete', (req, res, next) => {
    const { bookId } = req.params;

    Book.findByIdAndDelete(bookId)
    .then(() => res.redirect('/books'))
    .catch(error => next(error));
})

router.get('/books', (req,res,next) => {
    Book.find()
    .then(allTheBooksfromDB => {
        console.log('Retrieved books:', allTheBooksfromDB);
        res.render('books-list.hbs', {books : allTheBooksfromDB});
    })
    .catch(error => {
        console.log('Error getting the books from the DB,', error);
        next(error);
    });
});

router.get('/books/:bookId', (req, res, next) => {
    const { bookId } = req.params;
    console.log(bookId)

    Book.findById(bookId)
    .then(theBook => res.render('book-details.hbs', { book: theBook}))
    .catch(error => {
        console.log('Error retrieving book details: ', error);
        next(error);
    })
})

module.exports = router;
