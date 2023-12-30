import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useProfile = (url) => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setData(data.data);
          })
          .catch((error) => {
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }, [url]);

    return { data, loading, error };
}

export default useProfile;
