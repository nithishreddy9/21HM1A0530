import React, { useState } from 'react';

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAverageData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:9876/numbers/${numberId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResponseData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setNumberId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAverageData();
  };

  return (
    <div>
      <h2>Calculate Average</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number ID:
          <input type="text" value={numberId} onChange={handleChange} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {responseData && (
        <div>
          <h3>Previous Window State:</h3>
          <ul>
            {responseData.windowPrevState.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
          <h3>Current Window State:</h3>
          <ul>
            {responseData.windowCurrState.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
          <p>Numbers received: {JSON.stringify(responseData.numbers)}</p>
          <p>Average: {responseData.avg}</p>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;