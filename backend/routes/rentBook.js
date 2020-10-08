const router = require('express').Router();
const BookRequest = require('../models/Requests');
const Book = require('../models/Book');
var nodemailer = require('nodemailer');

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

           const email = req.body.email;
           const name = req.body.name;
           const bookName = req.body.bookName;
           const request = req.body.request;
           sendRequest(email,name,bookName,request);

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
        const alreadyBook = await BookRequest.findOne({bookId: req.body.id, email: req.body.email, request: "BOOK", status:"ACCEPT"});
        const alreadyBookDeclined = await BookRequest.findOne({bookId: req.body.id, email: req.body.email, request: "BOOK", status:"DECLINE"});
        const pendingRequest = await BookRequest.findOne({bookId: req.body.id, email: req.body.email, request: "BOOK", status:"PENDING"});


        if(requestMade){
            return  res.json({
                status: "returnPending",
            });
        }else if(alreadyBook || pendingRequest){
            return res.json({
                status: "alreadyBooked"
            })
        }else if(alreadyBookDeclined){
            alreadyBookDeclined.status = "PENDING";
            alreadyBookDeclined.save();
            res.json({status: "booked"})
        }
        else{
            const bookRequest = new BookRequest({
                bookId: req.body.id,
                name: req.body.name,
                email: req.body.email,
                request: req.body.request,
                status: req.body.status,
                bookName: req.body.bookName
            });
            const savedbook = await bookRequest.save();  
            res.json({
                status: "booked"
            })

            const email = req.body.email;
            const name = req.body.name;
            const bookName = req.body.bookName;
            const request = req.body.request;
            sendRequest(email,name,bookName,request);

            
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

    const adminId = req.body.adminId;
    const bookName = req.body.bookName;
    const status = req.body.status;
    const request = req.body.request;
    const name = req.body.name;
    const email = req.body.email;
    const adminName = req.body.adminName;
    sendMAILtoLibrarian(adminId,bookName,status,request,name,email, adminName)
    sendMAILtoUser( bookName, status, request, email, name, adminName)

})

function sendMAILtoUser( bookName, status, request, email, name, adminName) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '1t2a3n4v5i@gmail.com',
        pass: 'tanvi74@#',
      },
    });
  
    var mailOptions = {
      from: '1t2a3n4v5i@gmail.com',
      to: email,
      subject: 'Response to Requests',
      html:
       `<div>Hi ${name}</div><div>You ${request} request has been ${status}ED for the book ${bookName} by the ADMIN ${adminName}.</div>`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

function sendMAILtoLibrarian(adminId,bookName,status,request,name,email,adminName) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '1t2a3n4v5i@gmail.com',
        pass: 'tanvi74@#',
      },
    });
  
    var mailOptions = {
      from: '1t2a3n4v5i@gmail.com',
      to: adminId,
      subject: 'Reaction To Request',
      html:
        `<div>Hi ${adminName}, </div> <div>You had ${status}ED the ${request} request for the book ${bookName} reuested by ${name}. Email-Id: ${email} </div>`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}


function sendRequest(email,name,bookName,request) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '1t2a3n4v5i@gmail.com',
        pass: 'tanvi74@#',
      },
    });
  
    var mailOptions = {
      from: '1t2a3n4v5i@gmail.com',
      to: email,
      subject: `${request} Request`,
      html:
        `<div>Hi ${name}, </div> <div>Your ${request} request for the book ${bookName} is received. Will notify you the update on your request</div>`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}


module.exports = router