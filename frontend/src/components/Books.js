

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Books.css'; 

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    quantityAvailable: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const booksPerPage = 5;
  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
        setFilteredBooks(response.data);
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

  const handleFilterChange = (event, columnName) => {
    const { value } = event.target;
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [columnName]: value,
    }));
  };

  const applyFilters = () => {
    const filteredData = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(filterCriteria.title.toLowerCase()) &&
        book.author.toLowerCase().includes(filterCriteria.author.toLowerCase()) &&
        book.genre.toLowerCase().includes(filterCriteria.genre.toLowerCase()) &&
        book.published_year.toString().includes(filterCriteria.publishedYear) &&
        book.quantity_available.toString().includes(filterCriteria.quantityAvailable)
      );
    });
    setFilteredBooks(filteredData);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setFilterCriteria({
      title: '',
      author: '',
      genre: '',
      publishedYear: '',
      quantityAvailable: '',
    });
    setFilteredBooks(books);
    setCurrentPage(0);
  };

  const offset = currentPage * booksPerPage;
  const currentBooks = filteredBooks.slice(offset, offset + booksPerPage);

  return (
    <div className="books-container">
      <h2>Books</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Title"
          value={filterCriteria.title}
          onChange={(e) => handleFilterChange(e, 'title')}
        />
        <input
          type="text"
          placeholder="Filter by Author"
          value={filterCriteria.author}
          onChange={(e) => handleFilterChange(e, 'author')}
        />
        <input
          type="text"
          placeholder="Filter by Genre"
          value={filterCriteria.genre}
          onChange={(e) => handleFilterChange(e, 'genre')}
        />
        <input
          type="text"
          placeholder="Filter by Published Year"
          value={filterCriteria.publishedYear}
          onChange={(e) => handleFilterChange(e, 'publishedYear')}
        />
        <input
          type="text"
          placeholder="Filter by Quantity Available"
          value={filterCriteria.quantityAvailable}
          onChange={(e) => handleFilterChange(e, 'quantityAvailable')}
        />
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Published Year</th>
            <th>Quantity Available</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Books;
