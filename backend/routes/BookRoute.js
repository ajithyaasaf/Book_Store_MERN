const express = require("express");
const router = express.Router();
const Book = require('../models/bookModels')



// Read books form database 
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}); // Add await to resolve the promise
        return res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching books");
    }
});


// Read book with unique ID form database
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const books = await Book.findById(id); // Add await to resolve the promise
        return res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching books");
    }
});

// Route for save a new book
router.post('/', async (req,res)=>{
    try{
   if(
       !req.body.title||
       !req.body.author||
       !req.body.publishYear
   ){
          res.status(400).send("Please enter all the fields")
   }

   const books = {
       title:req.body.title,
       author:req.body.author,
       publishYear:req.body.publishYear
   }

   const book = await Book.create(books)
   return res.status(201).send(book)
}
catch(err){
   console.error(err)

}
})



// Update a Book in the database
router.put('/:id', async (req, res) => {
    try {
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
               res.status(400).json({message: 
                "should enter all the fields"
               })
        }

        const {id} = req.params
        const results = await Book.findByIdAndUpdate(id,req.body); // send id to find specific book to update and body to update the content
        if(!results){
            res.json({message:"Book not Found"})
        }
        return res.status(200).json({message:"Book updated succesfully"});
       
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while updating books");
    }
});


// Delete Book form database
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
         await Book.findByIdAndDelete(id); // Add await to resolve the promise
        return res.status(200).json({Message:"Book deleted Succesfully"});
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while deleting books");
    }
});




module.exports = router