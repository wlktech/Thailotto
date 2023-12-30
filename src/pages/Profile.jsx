import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/config';

export default function Profile() {
  const url = `${BASE_URL}/profile`;

  let { data, loading, error } = useFetch(url);

  const formatBalance = (balance) => {
    return Number(balance).toLocaleString('en-US', {
      minimumIntegerDigits: 3,
      useGrouping: true,
    });
  };

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
    {data && data.user && data.currency_rate && (
      <div className='container my-3'>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className='text-center mb-3'>PROFILE</h1>
            <div className="text-center">
              {data.user.img_url && (
                <img src={data.user.img_url} width={150} alt="" />
              )}
              {!data.user.img_url && (
                <i className="fas fa-circle-user fa-2x text-dark"></i>
              )}
              
              <p className="mt-5">Name: <span className="fw-bold">{data.user.name}</span></p>
              <p className="">Phone: <span className="fw-bold">{data.user.phone}</span></p>
              <p className="">Balance (MMK): <span className="fw-bold">{formatBalance(data.user.balance)} MMK</span></p>
              <p className="">Balance (BAHT): <span className="fw-bold">{formatBalance(data.user.balance/data.currency_rate)} BHT</span></p>
            </div>
          </div>
        </div>
      </div> 
    )}
    </>
  )
}