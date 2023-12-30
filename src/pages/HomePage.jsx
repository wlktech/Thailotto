import React, { useState } from 'react'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/config';

export default function HomePage() {
  let { data, loading, error } = useFetch(BASE_URL);
  console.log(data);

  return (
    <>
      {error && <div>{error}</div>}
      {loading && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
        <div className='container my-3'>
          <div className="row">

          </div>
        </div>
    </>
  )
}