require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./db'); 

app.use(express.json());

//get request to search for books
app.get("/Search", async (req, res) => {

  try {
   console.log("entered")
    const {bookName} = req.query;
 
    //checks if book name is undefined
      if (!bookName){
        return res.status(401).json({message:'Please be sure to input a book name before you submit the form.'})
      }

      //searches db for provided book name
      const searchBooks =  await pool.query(
        'SELECT * FROM books WHERE title ILIKE $1',[`%${bookName}%`]
      );

      //checks if book exists in db
      if(searchBooks.rowCount === 0){
        return res.status(404).json("Book not found");
      }
      //resond with all relevant books
      res.status(200).json(searchBooks.rows);
    

  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'})
  }
});

//Post request to create book in db
app.post("/Create", async (req,res) =>{
  try {
   
    const {bookTitle} = req.body;

    //checks if book name is undefined
      if (!bookTitle){
        return res.status(401).json({message:'Please be sure to input a book name before you submit the form.'})
      }

      //checks if book exists in db
      const bookSearch = await pool.query(
        'SELECT * FROM books WHERE title LIKE $1',[`%${bookTitle}%`]
      );

      //replies to user with 401 in case the book alreasy exists
      if(bookSearch.rowCount > 0){
        return res.status(401).json('book already exists in db');
      }

      await pool.query(
        'INSERT INTO books (title) VALUES ($1)',
        [bookTitle]
      );

      res.status(200).json({message:'Book created successfully.'})


  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Internal Server Error'})
  }
});

//delete request to remove book from db
app.delete("/Remove", async (req,res) => {
  try {
  
    const{bookTitle} = req.query

    //checks if book title is undefined
      if (!bookTitle){
        return res.status(404).json({message:'Book not found.'})
      }

      //checks if book exists in db
      const bookSearch = await pool.query(
        'SELECT * FROM books WHERE title LIKE $1',[`%${bookTitle}%`] 
      );

      //deletes book from db
      await pool.query(
        'DELETE FROM books WHERE title ILIKE $1',
        [bookTitle]
      )
          

      res.status(200).json({message: 'Book deleted successfully.'});


  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Internal Server Error'})
  }

});

app.put("/update")


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});