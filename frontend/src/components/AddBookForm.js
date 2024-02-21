// AddBookForm.js

import React, { useState } from 'react';
import axios from 'axios';
import "./AddBookForm.css";

const AddBookForm = ({ onClose }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    quantityAvailable: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event, field) => {
    setNewBook((prevBook) => ({
      ...prevBook,
      [field]: event.target.value,
    }));
  };

  const handleAddBook = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBook);
      if (response.status === 201) {
        // Book added successfully, reload the page
        window.location.reload();
      } else {
        setErrorMessage('Failed to add a new book');
      }
    } catch (error) {
      console.error('Error adding a new book:', error);
    //   setErrorMessage('Network error. Please try again later.');
    }
  };
  

  return (
    <div className="add-book-form">
      <h3>Add New Book</h3>
      <div className="input-group">
        <label>Title:</label>
        <input type="text" value={newBook.title} onChange={(e) => handleInputChange(e, 'title')} />
      </div>
      <div className="input-group">
        <label>Author:</label>
        <input type="text" value={newBook.author} onChange={(e) => handleInputChange(e, 'author')} />
      </div>
      <div className="input-group">
        <label>Genre:</label>
        <input type="text" value={newBook.genre} onChange={(e) => handleInputChange(e, 'genre')} />
      </div>
      <div className="input-group">
        <label>Published Year:</label>
        <input
          type="text"
          value={newBook.publishedYear}
          onChange={(e) => handleInputChange(e, 'publishedYear')}
        />
      </div>
      <div className="input-group">
        <label>Quantity Available:</label>
        <input
          type="text"
          value={newBook.quantityAvailable}
          onChange={(e) => handleInputChange(e, 'quantityAvailable')}
        />
      </div>
      <button onClick={handleAddBook}>Add Book</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddBookForm;
