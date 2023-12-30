import React from 'react';
import BASE_URL from '../hooks/config';
import useFetch from '../hooks/useFetch';

export default function HomePage() {

  const url = `${BASE_URL}/home`;
  let { data, loading, error } = useFetch(url);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='container my-3'>
        <marquee behavior="" direction="" className='py-4 bg-secondary text-light rounded-2'>
          {data?.banner_text?.text}
        </marquee>
      </div>
      <div className='text-center'>
        {data?.banners?.map((banner, index) => (
          <img className='m-3 rounded shadow' src={banner.img_url} alt={`Banner ${index}`} width={300} key={index} />
        ))}
      </div>
    </>
  );
}
