import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// import { defaultConfig } from '../utils/env';

function useAxiosTest(config) {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  axios.defaults.baseURL = 'http://localhost:3001/api/v1';

  // eslint-disable-next-line no-shadow
  const fetchData = async (config) => {
    if (!config) {
      return;
    }
    if (location.pathname !== '/' || location.pathname !== '/signin') {
      if (config.method === 'GET') {
        /* eslint-disable no-param-reassign */
        config.params = {};
        config.params.userName = localStorage.getItem('userName');
        config.params.token = localStorage.getItem('token');
        /* eslint-enable no-param-reassign */
      } else {
        /* eslint-disable no-param-reassign */
        console.log(config.data);
        config.data.userName = localStorage.getItem('userName');
        config.data.token = localStorage.getItem('token');
        /* eslint-enable no-param-reassign */
      }
    }
    setIsLoading(true);
    try {
      const res = await axios({
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${config.url}`,
        params: config.params ? config.params : null,
        data: config.data ? config.data : null,
        ...config,
      });
      if (res.data.code === 400) {
        localStorage.clear();
        navigate('/');
      }
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchData(config);
  }, []);

  return [isLoading, response, error];
}

export default useAxiosTest;
