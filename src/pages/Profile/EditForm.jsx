import React, { useState, useEffect } from 'react';
import BASE_URL from '../../hooks/config';
import { useNavigate } from 'react-router-dom';

const EditForm = () => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleImage = (e) => {
    e.preventDefault();
    setProfile(e.target.files[0]);
  }

  const handleEdit = (e) => {
    e.preventDefault();

    const editProfile = new FormData();
    editProfile.append('profile', profile);
    editProfile.append('name', name);
    editProfile.append('phone', phone);

    fetch(BASE_URL + '/profile', {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('token')
      },
      body: editProfile
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Profile update failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Profile update successful:', data);
        navigate('/profile');
        // Update your state or perform actions as needed with the response data
        // setData(data);
      })
      .catch(error => {
        console.error('Profile update error:', error);
      });
  }

  useEffect(() => {
    // You can make the API call here when profile, name, or phone change
    // handleEdit();
  }, [profile, name, phone]);

  return (
    <div className='container mt-3'>
      <div className="card p-3 shadow border border-0">
        <img src={profile} width={50} className='rounded-circle' alt="" />
        <h4 className='mb-4'>Edit Profile</h4>
        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <input type="file" onChange={handleImage} className="form-control" />
          </div>
          <div className="mb-3">
            <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Name" />
          </div>
          <div className="mb-3">
            <input type="number" onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter Phone" />
          </div>
          <div className="m-auto">
            <button className="btn btn-primary" type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
