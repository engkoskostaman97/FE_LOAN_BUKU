// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import api from '../../services/api'


const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await api.get('/books');
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Daftar Buku</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.title} - {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
