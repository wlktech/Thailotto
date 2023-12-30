import React from 'react'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/config';

export default function Profile() {
  let { data, loading, error } = useFetch(BASE_URL + "/profile");
//   console.log(data);

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
            <div className="col-md-6 offset-md-3">
              <h1 className='text-center mb-3'>PROFILE</h1>
              <div className="text-center">
              <img src={data.user.img_url} width={150} alt="" />
              <p className="mt-5">Name: <span className="fw-bold">{data.user.name}</span></p>
              <p className="">Phone: <span className="fw-bold">{data.user.phone}</span></p>
              <p className="">Balance (MMK): <span className="fw-bold">{data.user.balance} MMK</span></p>
              <p className="">Balance (BAHT): <span className="fw-bold">{data.user.balance/data.currency_rate} BHT</span></p>
              </div>
             
            </div>
          </div>
        </div>
    </>
  )
}