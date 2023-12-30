import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useFetch = (url) => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(()=>{
        let abortController = new AbortController();
        let signal = abortController.signal;

        setLoading(true)
        fetch("https://thailotto123.net/api", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization' : "Bearer " + localStorage.getItem('token')
              // Other headers if required
            }, signal
        })
        .then(res => {
            if(!res.ok){
                throw Error("Something Went Wrong!")
            }
            return res.json()
        })
        .then(data => {
            setData(data);
            setLoading(false)
        })
        .catch(e =>{
            setError(e.message)
            // navigate('/login');
        })

        //cleanup function
        return () =>{
            abortController.abort();
        }

    }, [url])

    return {data, loading, error}
}

export default useFetch