'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Trips from '../components/trips/trips';
import styles from '../page.module.css';
import { TripsService } from '@/services/tripsService';
import { useAuthContext } from '@/context/authContext';

export default function AuthPage() {
  const { isAuthenticated } = useAuthContext();
  const [tripsAuth, setTripsAuth] = useState(undefined);
  const [error, setError] = useState('');
  const router = useRouter();
  const api = TripsService();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    api.getTripsOrderByAuthUser()
      .then(res => {
        console.log('Data received from backend:', res.data);
        setTripsAuth(Array.isArray(res.data) ? res.data : []);
      })
      .catch(error => {
        console.error('Error loading user destinations:', error);
        setError('Failed to load your destinations');
        setTripsAuth([]);
      });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className={styles.main}>
      {error && (
        <div style={{ color: 'red', padding: '10px', marginBottom: '20px' }}>
          {error}
        </div>
      )}
      
      <Trips trips={tripsAuth} />
      
      {tripsAuth && tripsAuth.length === 0 && !error && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>You haven't created any destinations yet.</p>
          <button 
            onClick={() => router.push('/create')}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none',
              marginTop: '10px',
              cursor: 'pointer'
            }}
          >
            Create my first destination
          </button>
        </div>
      )}
    </div>
  );
}
