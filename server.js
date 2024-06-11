const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/api/search/:query', async (req, res) => {
    const query = req.params.query;
    const page = req.query.page || 1;
    try {
        const response = await axios.get(`https://api.consumet.org/anime/9anime/${query}`, { params: { page } });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/anime/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`https://api.consumet.org/anime/9anime/info/${id}`);
        const anime = response.data;

        // Fetch subtitles for each episode
        const episodesWithSubtitles = await Promise.all(anime.episodes.map(async (episode) => {
            const subtitleResponse = await axios.get(`https://api.consumet.org/anime/9anime/subtitles/${episode.id}`);
            episode.subtitles = subtitleResponse.data;
            return episode;
        }));

        anime.episodes = episodesWithSubtitles;
        res.json(anime);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
