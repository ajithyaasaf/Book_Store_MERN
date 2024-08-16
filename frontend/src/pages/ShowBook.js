import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState(null); // Change to null to differentiate between no data and initial state
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log('Fetched book data:', response.data); // Log fetched data
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!book) {
    return (
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Book Not Found</h1>
        <p>No book details available for the specified ID.</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title</span>
          <span>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Author</span>
          <span>{book.author}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
          <span>{book.publishYear}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Create Time</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
