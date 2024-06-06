
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(response => {
      setBooks(response.data.books);
    })
    .catch(err => {
      if (err.response && err.response.status === 404) {
        setError("The requested resource was not found.");
      } else {
        setError("An error occurred while fetching data.");
      }
      console.error(err);
    });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {books.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="book-list">
          {books.map(book => (
            <li className="book-item" key={book.id}>
              <img src={book.imageLinks.thumbnail} alt={book.title} />
              <div className="book-info">
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <p className="authors">Authors: {book.authors.join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;