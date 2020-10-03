const router = require('express').Router();
const Book = require('../models/Book');

router.post('/addBook', async(req,res)=>{
    console.log(req.body);
    const bookExist = await Book.findOne({title: req.body.title});
    if(bookExist){
        return  res.json({
            status: "bookExist",
        });
    } 
    const book = new Book({
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        publishedDate: req.body.publishedDate,
        thumbnailURl: req.body.thumbnailUrl,
        shortDescription: req.body.shortDesc,
        longDescription: req.body.longDesc,
        status: req.body.status,
        authors: req.body.authors,
        categories: req.body.categories,
        price: req.body.price,
        quantity: req.body.quantity
    });
    const savedbook = await book.save();
    res.json({status: "success"})
})

router.post('/bookData',async(req,res)=>{
    console.log(req.body);

    if(req.body.apiKey !== process.env.API_KEY){
        return res.json({status: "badRequest"})
    }

    // console.log(Book.find())
    const bookDetails = await Book.find();
    // console.log(bookDetails);
    // res.send(bookDetails)
    res.json({
        bookDetails: bookDetails
    })
})

router.post('/bookDetail', async(req,res)=>{
    console.log(req.body);

    const bookDetail = await Book.findOne({_id: req.body.id});
    // console.log(bookDetail);
    res.json({
        bookDetail: bookDetail
    })
})

module.exports = router