'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TripsService } from "@/services/tripsService";
import { useAuthContext } from '@/context/authContext';

export default function UpdateTripPage({ params }) {
  const { isAuthenticated, username } = useAuthContext();
  const { id } = params;
  const router = useRouter();
  const api = TripsService();

  const [formData, setFormData] = useState({
    title: '',
    country: '',
    city: '',
    description: '',
    image: ''
  });
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
        const trip = res.data;

        if (trip.user.username !== username) {
          setError('You do not have permission to edit this trip');
          return;
        }

        setFormData({
          title: trip.title || '',
          country: trip.country || '',
          city: trip.city || '',
          description: trip.description || '',
          image: trip.image || ''
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.updateTrip(id, formData);
      router.push(`/destinations/${id}`);
    } catch (err) {
      console.error('Error updating trip:', err);
      if (err.response?.status === 403) {
        setError('You do not have permission to edit this trip');
      } else if (err.response?.status === 404) {
        setError('Trip not found');
      } else {
        setError('Failed to update the trip. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingTrip) {
    return <div style={{ padding: 'var(--padd-forms)', textAlign: 'center', color: 'var(--green-color)' }}>Loading trip...</div>;
  }

  if (error && !formData.title) {
    return (
      <div style={{ padding: 'var(--padd-forms)', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--red-color)', marginBottom: '1rem' }}>{error}</h2>
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
      <h1 style={{ color: 'var(--green-color)', fontWeight: 'var(--font-bold)', marginBottom: '1.5rem' }}>Edit Trip</h1>

      {error && (
        <div className="card" style={{ backgroundColor: 'rgba(221, 55, 120, 0.1)', borderColor: 'rgba(221, 55, 120, 0.5)', color: 'var(--red-color)', marginBottom: '1rem', padding: '1rem', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '1.2rem', padding: '1rem' }}>
          <label htmlFor="title" style={{ fontWeight: 'var(--font-bold)', color: 'var(--green-color)' }}>Title:</label>
          <input
            id="title"
            className="card-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={100}
          />
        </div>

        <div className="card" style={{ marginBottom: '1.2rem', padding: '1rem' }}>
          <label htmlFor="country" style={{ fontWeight: 'var(--font-bold)', color: 'var(--green-color)' }}>Country:</label>
          <input
            id="country"
            className="card-input"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
          />
        </div>

        <div className="card" style={{ marginBottom: '1.2rem', padding: '1rem' }}>
          <label htmlFor="city" style={{ fontWeight: 'var(--font-bold)', color: 'var(--green-color)' }}>City:</label>
          <input
            id="city"
            className="card-input"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
          />
        </div>

        <div className="card" style={{ marginBottom: '1.2rem', padding: '1rem' }}>
          <label htmlFor="image" style={{ fontWeight: 'var(--font-bold)', color: 'var(--green-color)' }}>Image URL:</label>
          <input
            id="image"
            className="card-input"
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            pattern="^(https?://.*\.(png|jpg|jpeg|gif|svg))$"
          />
          <small style={{ color: '#666' }}>
            Must be a valid URL ending in .png, .jpg, .jpeg, .gif, or .svg
          </small>
        </div>

        <div className="card" style={{ marginBottom: '1.2rem', padding: '1rem' }}>
          <label htmlFor="description" style={{ fontWeight: 'var(--font-bold)', color: 'var(--green-color)' }}>Description:</label>
          <textarea
            id="description"
            className="card-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength={5}
            rows={4}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="card"
            style={{
              backgroundColor: loading ? 'rgba(0,123,255,0.5)' : 'var(--green-color)',
              color: 'white',
              fontWeight: 'var(--font-bold)',
              padding: '0.7rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '1rem'
            }}
          >
            {loading ? 'Updating...' : 'Update Trip'}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="card"
            style={{
              backgroundColor: 'var(--red-color)',
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
      </form>

      <style jsx>{`
        .card-input {
          width: 100%;
          padding: 10px;
          margin-top: 8px;
          border-radius: 6px;
          border: 1px solid rgba(2, 48, 84, 0.3);
          font-family: "Jaldi", sans-serif;
          font-weight: var(--font-light);
          font-size: var(--font-size-xs);
          transition: border-color 0.3s;
        }
        .card-input:focus {
          outline: none;
          border-color: var(--red-color);
          box-shadow: 0 0 5px var(--red-color);
        }
      `}</style>
    </main>
  );
}
