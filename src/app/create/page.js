'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TripsService } from "@/services/tripsService";
import { useAuthContext } from '@/context/authContext';

export default function CreateTripPage() {
  const { isAuthenticated } = useAuthContext();
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
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

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
      await api.createTrip(formData);
      router.push('/auth');
    } catch (err) {
      console.error('Error creating trip:', err);
      setError('Failed to create the trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main" style={{ padding: 'var(--padd-forms)', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--green-color)', fontWeight: 'var(--font-bold)', marginBottom: '1.5rem' }}>Create New Trip</h1>

      {error && (
        <div className="card" style={{ backgroundColor: 'rgba(255 0 0 / 0.1)', borderColor: 'rgba(221, 55, 120, 0.5)', color: 'var(--red-color)', marginBottom: '1rem', padding: '1rem', borderRadius: '8px' }}>
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
          />
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
            rows={4}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="card"
            style={{
              backgroundColor: 'var(--green-color)',
              color: 'white',
              fontWeight: 'var(--font-bold)',
              padding: '0.7rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '1rem'
            }}
          >
            {loading ? 'Creating...' : 'Create Trip'}
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
          font-family: "Barlow", sans-serif;
          font-weight: var(--font-bold);
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
