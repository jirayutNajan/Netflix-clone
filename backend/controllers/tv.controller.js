import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1");
    const randomTv = data.results[Math.floor(Math.random() * data.results?.length)]; // random Tvs

    res.status(200).json({ success: true, content: randomTv });
  } catch (error) {
    console.log("Error in getTrendingTv controller: ", error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export const getTvTrailers = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

    res.status(200).json({ success: true, trailers: data.results });

  } catch (error) {
    if(error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export const getTvDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if(error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export const getSimilarTvs = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getTvsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}