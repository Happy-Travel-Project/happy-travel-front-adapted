'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TripsService } from "@/services/tripsService";
import { useAuthContext } from '@/context/authContext';
import Image from "next/image";

export default function DeleteTripPage({ params }) {
  const { isAuthenticated, username } = useAuthContext();
  const { id } = params;
  const router = useRouter();
  const api = TripsService();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  useEffect(() => {
    if (!id) return;

    const loadTrip = async () => {
      try {
        const res = await api.getTripById(id);
        const tripData = res.data;

        if (tripData.user.username !== username) {
          setError('You do not have permission to delete this trip');
          return;
        }

        setTrip(tripData);
      } catch (err) {
        console.error('Error loading trip:', err);
        if (err.response?.status === 404) {
          setError('Trip not found');
        } else {
          setError('Error loading the trip');
        }
      } finally {
        setLoadingTrip(false);
      }
    };

    loadTrip();
  }, [id, username]);

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      await api.deleteTrip(id);
      router.push('/auth');
    } catch (err) {
      console.error('Error deleting trip:', err);
      if (err.response?.status === 403) {
        setError('You do not have permission to delete this trip');
      } else if (err.response?.status === 404) {
        setError('Trip not found');
      } else {
        setError('Failed to delete the trip. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingTrip) {
    return (
      <div style={{ padding: 'var(--padd-forms)', textAlign: 'center', color: 'var(--green-color)' }}>
        Loading trip...
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div style={{ padding: 'var(--padd-forms)', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--red-color)', marginBottom: '1rem' }}>{error || 'Trip not found'}</h2>
        <button
          onClick={() => router.back()}
          className="card"
          style={{
            backgroundColor: 'var(--green-color)',
            color: 'white',
            fontWeight: 'var(--font-bold)',
            padding: '0.7rem 1.5rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="main" style={{ padding: 'var(--padd-forms)', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--green-color)', fontWeight: 'var(--font-bold)', marginBottom: '1.5rem' }}>
        Delete Trip
      </h1>

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{trip.title}</h2>
        <p><strong>Location:</strong> {trip.city}, {trip.country}</p>

        {trip.image && (
          <div style={{ margin: '10px 0' }}>
            <Image
              src={trip.image}
              alt={trip.title}
              width={300}
              height={200}
              style={{ objectFit: 'cover', borderRadius: '4px', width: '100%', height: 'auto' }}
            />
          </div>
        )}

        <p><strong>Description:</strong> {trip.description}</p>
        <p><strong>Created by:</strong> {trip.user.username}</p>
      </div>

      <div
        style={{
          backgroundColor: 'rgba(246, 192, 22, 0.1)', // var(--blue-color) with opacity for warning
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(246, 192, 22, 0.5)', // matching border with opacity
          borderRadius: '6px',
          color: 'var(--blue-color)',
          fontWeight: 'var(--font-bold)'
        }}
      >
        <p><strong>⚠️ Are you sure you want to delete this trip?</strong></p>
        <p>This action cannot be undone.</p>
      </div>

      {error && (
        <div className="card" style={{ backgroundColor: 'rgba(221, 55, 120, 0.1)', borderColor: 'rgba(221, 55, 120, 0.5)', color: 'var(--red-color)', marginBottom: '1rem', padding: '1rem', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      <div>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="card"
          style={{
            backgroundColor: loading ? 'rgba(221, 55, 120, 0.5)' : 'var(--red-color)',
            color: 'white',
            fontWeight: 'var(--font-bold)',
            padding: '0.7rem 1.5rem',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '1rem'
          }}
        >
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </button>

        <button
          onClick={() => router.back()}
          disabled={loading}
          className="card"
          style={{
            backgroundColor: 'var(--green-color)',
            color: 'white',
            fontWeight: 'var(--font-bold)',
            padding: '0.7rem 1.5rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>

      <style jsx>{`
        .card {
          background: rgba(var(--card-rgb, 255 255 255), 0);
          border: 1px solid rgba(var(--card-border-rgb, 0 0 0), 0.1);
          border-radius: var(--border-radius, 8px);
          transition: background 200ms, border 200ms;
        }
        .card:hover {
          background: rgba(var(--card-rgb, 255 255 255), 0.05);
          border-color: rgba(var(--card-border-rgb, 0 0 0), 0.15);
        }
        @media (hover: hover) and (pointer: fine) {
          .card:hover {
            background: rgba(var(--card-rgb, 255 255 255), 0.1);
            border-color: rgba(var(--card-border-rgb, 0 0 0), 0.2);
          }
        }
      `}</style>
    </main>
  );
}
