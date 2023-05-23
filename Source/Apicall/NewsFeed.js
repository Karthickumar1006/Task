import React, {useEffect, useState} from 'react';
import InternetCheck from '../Utils/checkIfInternetIsConnected';

const NewsFeedApi = () => {
  const isInternetConnected = InternetCheck();
  const [loading, setloading] = useState(true);
  const [newData, setnewData] = useState('');
  useEffect(() => {
    const isInternet = isInternetConnected;
    if (isInternet) {
      fetch(
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=36184e4f4a4149d098bd700312f13f5b',
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          setloading(false);
          setnewData(responseJson?.articles);
        })
        .catch(error => {
          setloading(false);
          console.error(error);
        });
    } else {
      alert('Please check your internet');
    }
  }, [loading, isInternetConnected]);
  return [loading, newData];
};

export default NewsFeedApi;
