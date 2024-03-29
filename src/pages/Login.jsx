import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import useLogin from '../hooks/useLogin';
import BASE_URL from '../hooks/config';

const Login = () => {
    // let { data: code } = useLogin(BASE_URL+'/login');
    const [countryCode, setCountryCode] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/');
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        const loginData = {
            country_code: countryCode,
            phone: phone,
            password: password
        };
        
        fetch(BASE_URL + '/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        })
          .then(async response => {
            if (!response.ok) {
              let errorData;
              try {
                errorData = await response.json();
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
        
              if (response.status === 422) {
                setError(errorData.errors);
                console.error(`Login failed with status ${response.status}:`, errorData);
              }else if (response.status === 401) {
                setError(errorData.message);
                console.error(`Login failed with status ${response.status}:`, errorData);
              }else{
                console.error(`Unexpected error with status ${response.status}`);
              }
        
              throw new Error('Login Failed');
            }
        
            return response.json();
          })
          .then(data => {
            setData(data);
            console.log(data);
            if (data.data.token) {
              localStorage.setItem('token', data.data.token);
              navigate('/profile');
            } else {
              throw new Error('Token not found in response');
            }
          })
          .catch(error => {
            console.error('Login error:', error);
          });
        
        
    }

  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="card p-3 shadow mt-5">
                  <p>{error && error.country_code}</p>
                  <p>{error && error.phone}</p>
                  <p>{error && error.password}</p>
                  <p>{error && error}</p>
                  
                    <h4 className='text-center mb-5'>LOGIN</h4>
                    {/* <p>{ countryCode + phone }</p> */}
                    {/* <p>{ password }</p> */}
                    {/* <p>{ data.token }</p> */}
                    <form onSubmit={handleLogin}>
                      <div className="d-flex">
                        <div className="mb-3 w-25">
                        <select className='form-control form-select' name="countryCode" id="" onChange={(e)=>setCountryCode(e.target.value)}>
                          <option value="">Choose</option>
                          <option  value="+95">MM(+95)</option>
                          <option  value="+66">THA(+66)</option>
                        </select>
                        </div>

                        <div className="mb-3 w-75">
                            {/* <label htmlFor="phone" className="form-label">Phone</label> */}
                            <input type="number" name='phone' onChange={(e)=>setPhone(e.target.value)} placeholder='Enter Phone' className="form-control" />
                        </div>
                      </div>

                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Password</label>
                            <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className="form-control" />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-dark" type='reset'>RESET</button>
                            <button className="btn btn-dark ms-3" type='submit'>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login