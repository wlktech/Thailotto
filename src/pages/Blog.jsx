import React, { useState } from 'react'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/config';

export default function Blog() {
  let [url, setUrl] = useState("");
  setUrl = BASE_URL;
  let { data, loading, error } = useFetch(url);
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
          {/* {data && data.map(banner => (
            <div className="col-md-4 mb-3" key={banner.id}>
              <div className="card border border-0 shadow">
                    <img src={banner.img_url} alt="" className="card-img-top" />
              </div>
            </div>
          ))} */}
          </div>
        </div>
    </>
  )
}