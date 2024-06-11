import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AnimeDetail() {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get(`/api/anime/${id}`);
                setAnime(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAnime();
    }, [id]);

    return (
        <div>
            {anime ? (
                <div>
                    <h1>{anime.title}</h1>
                    <img src={anime.image} alt={anime.title} />
                    <p>{anime.description}</p>
                    <h2>Episodes</h2>
                    <ul>
                        {anime.episodes.map(episode => (
                            <li key={episode.id}>
                                <h3>{episode.title}</h3>
                                {episode.subtitles && episode.subtitles.length > 0 ? (
                                    <div>
                                        <h4>Subtitles</h4>
                                        <ul>
                                            {episode.subtitles.map((subtitle, index) => (
                                                <li key={index}>
                                                    <a href={subtitle.url} target="_blank" rel="noopener noreferrer">
                                                        {subtitle.language}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p>No subtitles available</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default AnimeDetail;
