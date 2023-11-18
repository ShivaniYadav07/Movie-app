// Explore.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './Explore.scss';
import { CiSearch } from "react-icons/ci";
const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);

  const handleSearch = async () => {
    try {
      const apiKey = '8008e45d3e228930755799d0f0c32cf7';

      if (searchQuery.trim() === '') {
        // If the search query is empty, reset the search results
        setSearchResults([]);
        setNoDataFound(false);
        return;
      }

      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );

      const results = response.data.results;

      setSearchResults(results);
      setNoDataFound(results.length === 0);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className='main'>
      <div className="explore">
        <div className="explore-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim() === '') {
                  setSearchResults([]);
                  setNoDataFound(false);
                }
              }}
              
            />
            <button  onClick={handleSearch}> 
              Search <CiSearch />
            </button>
          </div>

          {noDataFound ? (
            <p>No data found.</p>
          ) : searchResults.length > 0 && (
            <div className="search-results-grid">
              {searchResults.map((movie) => (
                <div key={movie.id} className="movie-card">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BNzQxNzQxNjk5NV5BMl5BanBnXkFtZTgwNTI4MTU0MzE@._V1_UY1200_CR109,0,630,1200_AL_.jpg"  // Provide the path to your default image
                      alt={movie.title}
                      className="default-image"
                    />
                  )}
                  <h3>{movie.title}</h3>
                  <p>{movie.overview || 'Default overview text here.'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
