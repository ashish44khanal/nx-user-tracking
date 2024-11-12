// frontend/hooks/useUserTracking.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUserTracking = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/check-user', { withCredentials: true });
        setConsentGiven(response.data.consentGiven);
        setIsNewUser(response.data.isNewUser);
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };
    checkUserStatus();
  }, []);

  const giveConsent = async () => {
    try {
      await axios.post('http://localhost:3333/api/set-consent', {}, { withCredentials: true });
      setConsentGiven(true);
    } catch (error) {
      console.error('Error setting consent:', error);
    }
  };


  return { isNewUser, consentGiven, giveConsent };
};

