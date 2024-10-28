// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import api from '../../services/api'

const Loans = () => {
    const [books, setBooks] = useState([]); // Storing the list of books
    const [borrowedBooks, setBorrowedBooks] = useState([]); // Storing the borrowed books
    const [errorMessage, setErrorMessage] = useState('');

    // Function to fetch list of books
    const fetchBooks = async () => {
        try {
            const response = await api.get('/books');
            setBooks(response.data); // Assuming response.data contains the list of books
        } catch (error) {
            setErrorMessage('Gagal mengambil daftar buku.');
        }
    };

    // Function to borrow a book
    const borrowBook = async (bookId) => {
        try {
            const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
            if (!userId) {
                setErrorMessage('User ID tidak ditemukan, pastikan sudah login.');
                return;
            }

            // Send API request to borrow a book
            // eslint-disable-next-line no-unused-vars
            const response = await api.post('/loans', {
                user: { id: userId },
                book: { id: bookId },
            });

            // If the borrowing was successful, update borrowedBooks state
            setBorrowedBooks((prevBorrowedBooks) => [...prevBorrowedBooks, bookId]);
        } catch (error) {
            // Improved error handling for better debugging
            console.error("Error borrowing book:", error.response ? error.response.data : error.message);
            setErrorMessage('Gagal meminjam buku. Silakan coba lagi.');
        }
    };

    // Fetch the books when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Daftar Buku</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="book-cards">
                {books.map((book) => (
                    <div className="card" key={book.id} style={{ margin: '10px', padding: '20px', border: '1px solid #ddd' }}>
                        <h3>{book.title}</h3>
                        <p>Penulis: {book.author}</p>
                        <p>{borrowedBooks.includes(book.id) ? 'Sedang dipinjam' : 'Tersedia'}</p>
                        <button
                            onClick={() => borrowBook(book.id)}
                            disabled={borrowedBooks.includes(book.id)}
                            className="btn btn-primary"
                        >
                            {borrowedBooks.includes(book.id) ? 'Sedang Dipinjam' : 'Pinjam Buku'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loans;
