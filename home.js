import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchAnime = async () => {
        try {
            const response = await axios.get(`/api/search/${query}`);
            setResults(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for an anime..."
            />
            <button onClick={searchAnime}>Search</button>
            <div>
                {results.map(anime => (
                    <div key={anime.id}>
                        <Link to={`/anime/${anime.id}`}>
                            <h3>{anime.title}</h3>
                            <img src={anime.image} alt={anime.title} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
