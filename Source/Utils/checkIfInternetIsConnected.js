import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';

const InternetCheck = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, []);
  return isConnected;
};

export default InternetCheck;
