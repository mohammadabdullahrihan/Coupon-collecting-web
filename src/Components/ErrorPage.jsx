import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page ml-[370px]">
      <img src='https://imgs.search.brave.com/R6-fVTr26B8e0jklNNRl5bYMBSypNrqmHixe-yY2YKA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTcx/MzAyMjA2L3Bob3Rv/L2Vycm9yLTQwNC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/d0xhS09adlNlOHFy/TUdpeHRQRldoNGpU/YTh2b0RGRlFUOHE3/SkpqaDBBQT0' alt="" />
      
     <Link to={'/'}>
     <button className='bg-black text-white px-5 py-5 rounded-3xl text-xl font-semibold ml-[250px]'>Go Back</button>
     </Link>
    </div>
  );
};

export default ErrorPage;
