import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import BASE_URL from '../hooks/config';

const Register = () => {
    let { data: code } = useLogin(BASE_URL+'/login');
    // console.log(code.country_codes);
    const [name, setName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/');
    }

    const handleRegister = (e) =>{
        e.preventDefault();
        const registerData = {
            name : name,
            country_code: countryCode,
            phone: phone,
            password: password
        };
        
        fetch(BASE_URL + '/register', {
            method: 'POST',
            headers: {
              'Accept' : "application/json",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        }).then(response => {
            if (!response.ok) {
              throw new Error('Register failed');
            }
            return response.json();
          })
          .then(data => {
            console.log('Register successful:', data);
            setData(data);
            if (data.data.token) {
              localStorage.setItem('token', data.data.token); // Save token to localStorage
              alert("Registered Successfully.");
              navigate('/profile');
            } else {
              throw new Error('Token not found in response');
            }
          })
          .catch(error => {
            console.error('Register error:', error);
          });
    }

  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="card p-3 shadow mt-5">
                    <h4 className='text-center'>Register</h4>
                    {/* <p>{ name }</p> */}
                    {/* <p>{ countryCode + phone }</p> */}
                    {/* <p>{ password }</p> */}
                    {/* <p>{ data.token }</p> */}
                    <form onSubmit={handleRegister}>
                      <div className="mb-3">
                            <label htmlFor="" className="form-label">Name</label>
                            <input type="text" name='name' onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">Phone</label>
                        <div className="d-flex">
                          <div className="mb-3 w-25">
                          <select className='form-control form-select' name="countryCode" id="" onChange={(e)=>setCountryCode(e.target.value)}>
                            <option value="">Choose</option>
                            {code.country_codes && code.country_codes.map((code, index)=>(
                              <option key={index} value={code.code}>{code.name}</option>
                            ))}
                          </select>
                          </div>
                          <div className="mb-3 w-75">
                              {/* <label htmlFor="phone" className="form-label">Phone</label> */}
                              <input type="number" name='phone' onChange={(e)=>setPhone(e.target.value)} placeholder='Enter Phone' className="form-control" />
                          </div>
                        </div>
                      </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Password</label>
                            <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className="form-control" />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-dark" type='reset'>RESET</button>
                            <button className="btn btn-dark ms-3" type='submit'>REGISTER</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register