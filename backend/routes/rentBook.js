const router = require('express').Router();
const BookRequest = require('../models/Requests');
const Book = require('../models/Book');

router.post('/send-request', async(req,res)=>{
    console.log(req.body);
    if(req.body.request==="RETURN"){
        const findBook = await BookRequest.findOne({bookId: req.body.id, email: req.body.email, request: "BOOK", status: "ACCEPT"});
        const findBook12 = await BookRequest.findOne({bookId: req.body.id, email: req.body.email, request: "RETURN", status: "DECLINE"});
        const findBook123 = await BookRequest.find({bookId: req.body.id, email: req.body.email, request: "BOOK", status: "PENDING"});
        console.log(findBook);
        console.log(findBook123.length);

        if(findBook123.length!==0){
            res.json({status: "bookRequestInQueue"})
        }
        else if(findBook){
           findBook.request = "RETURN";
           findBook.status = "PENDING";
           findBook.save();
           res.json({status: "returnRequestSuccess"})
       }else  if(findBook12){
        findBook12.status = "PENDING";
        findBook12.save();
        res.json({status: "returnRequestSuccess"})
       }
        else{
            res.json({status: "returnRequestFailed"})
        }
    }else if(req.body.request==="BOOK"){
        const requestMade = await BookRequest.findOne({bookId: req.body.id, email: req.body.email, request: "RETURN", status: "PENDING" });
        const alreadyBook = await BookRequest.findOne({bookId: req.body.id, email: req.body.email, request: "BOOK"});
        if(requestMade){
            return  res.json({
                status: "returnPending",
            });
        }else if(alreadyBook){
            return res.json({
                status: "alreadyBooked"
            })
        }else{
            const bookRequest = new BookRequest({
                bookId: req.body.id,
                name: req.body.name,
                email: req.body.email,
                request: req.body.request,
                status: req.body.status,
                bookName: req.body.bookName
            });
            const savedbook = await bookRequest.save();  

            return res.json({
                status: "booked"
            })
        }
    }

    
    
          
})

router.post('/admin/requests', async(req,res)=>{
    // console.log("RQUESTPAGE");
    console.log(req.body);

    if(req.body.apiKey !== process.env.API_KEY){
        return res.json({status: "badRequest"})
    }

    // console.log(Book.find())
    const allRequest = await BookRequest.find({status: "PENDING"});
    // console.log(allRequest);
    // res.send(bookDetails)
    res.json({
        requests: allRequest
    })
})

router.post('/user/history', async(req,res)=>{
    console.log(req.body);

    const allRequest = await BookRequest.find({email: req.body.email});
    // console.log(allRequest);
    
    res.json({
        history: allRequest
    })
})

router.post('/update-status', async(req,res)=>{
    console.log(req.body);
    
    const findRequest = await BookRequest.findOne({bookId: req.body.bookId, email: req.body.email, request: req.body.request, status: "PENDING"});
    const findBook = await Book.findOne({_id: req.body.bookId });
    // console.log(findRequest);

    if(req.body.status === "ACCEPT" && req.body.request === "BOOK"){
        
        findRequest.status = "ACCEPT";
        await findRequest.save();

        findBook.quantity = findBook.quantity-1;
        await findBook.save();

        res.json({
            status: "ACCEPTED"
        })

    }else if(req.body.status === "DECLINE"){
        findRequest.status = "DECLINE";
        await findRequest.save();

        res.json({
            status: "DECLINED"
        })
        
    }else if(req.body.status === "ACCEPT" && req.body.request === "RETURN"){
        findRequest.status = 'ACCEPT';
        await findRequest.save();

        findBook.quantity = findBook.quantity+1;
        await findBook.save();

        res.json({
            status: "ACCEPTED"
        })

    }
})

module.exports = router