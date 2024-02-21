// Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Dashboard.css'; // Import the CSS file
import AddBookForm from './AddBookForm'; // Import the AddBookForm component

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Current page starts from 0

  const booksPerPage = 5; // Adjust the number of books per page as needed

  const pageCount = Math.ceil(books.length / booksPerPage);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setErrorMessage('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastBook = (currentPage + 1) * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      if (response.status === 200) {
        // Book deleted successfully, refresh the list of books
        window.location.reload();
      } else {
        setErrorMessage('Failed to delete the book');
      }
    } catch (error) {
      console.error('Error deleting the book:', error);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={() => setShowAddForm(true)}>Add New Book</button>
      {showAddForm && <AddBookForm className="show-form" />}
      <div className="books-list">
        <h3>Books List</h3>
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Published Year</th>
              <th>Quantity Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.published_year}</td>
                <td>{book.quantity_available}</td>
                <td>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Component */}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Dashboard;
