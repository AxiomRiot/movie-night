import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { handleGetMovie } from '../../services/movieService';

export default function MoviePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetMovie();
        setData(response);
      }
      catch (err) {
        setError(err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data.backdrops.map((element, index) => (
        <img
          key={index}
          src={`https://image.tmdb.org/t/p/w780${element.file_path}`}
          alt={element.file_path}
        />
      ))}
    </div>
  );
}
