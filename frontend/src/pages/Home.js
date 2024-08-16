import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable'; // Ensure these components exist
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        // Since the API is directly returning an array, set that directly to books
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error('Unexpected API response:', response.data);
          setBooks([]); // Fallback to empty array if data is not as expected
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
        setBooks([]); // Fallback in case of error
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className={`${
            showType === 'table' ? 'bg-sky-600' : 'bg-sky-300'
          } hover:bg-sky-600 px-4 py-1 rounded-lg`}
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className={`${
            showType === 'card' ? 'bg-sky-600' : 'bg-sky-300'
          } hover:bg-sky-600 px-4 py-1 rounded-lg`}
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : books.length > 0 ? ( // Safeguard against empty books array
        showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default Home;
