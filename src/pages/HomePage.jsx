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
        <marquee className='text-center'>
          {data?.banners?.map((banner, index) => (
            <img className='m-3 rounded shadow' src={banner.img_url} alt={`Banner ${index}`} width={300} key={index} />
          ))}
        </marquee>
      </div>

      <div className="container text-center">
        {data?.game_links?.map((link,index)=>(
            <div key={index} className='d-inline-flex'>
              <a href={link.link} target="_blank" rel="noreferrer" className='text-decoration-none m-3'>
                <img className='rounded' src={link.img_url} width={200} alt="" />  
                <p className='mt-3'>{link.name}</p>
              </a>
            </div>
        ))}
      </div>
    </>
  );
}
