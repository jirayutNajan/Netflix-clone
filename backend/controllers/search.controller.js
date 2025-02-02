import User from "../model/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;

  try {
    // https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if(response.results.length === 0) {
      return res.status(401).send(null);
    }

    // req.user มาจาก protect route
    if(req.user.searchHistory[req.user.searchHistory.length-1].id !== response.results[0].id){
      await User.findByIdAndUpdate(req.user._id, {
        $push: { // เนื่องจาก seachHistory เป็น array เลย push ได้และ ไม่ได้กำหนด type ข้างในเลยเป็นอะไรก็ได้
          searchHistory: { // results[0] คือเอาแค่คนแรก คนที่เกี่ยวข้องที่สุด
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.results[0].name,
            searchType: "person",
            createdAt: new Date()
          }
        }
      });
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchPerson controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false &language=en-US&page=1`
    );

    if(response.results.length === 0) {
      return res.status(404).send(null);
    }

    if(req.user.searchHistory[req.user.searchHistory.length-1].id !== response.results[0].id) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].title,
            searchType: "Movie",
            createdAt: new Date()
          }
        }
      })
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchMovie controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if(response.results.length === 0) {
      return res.status(404).send(null);
    }

    if(req.user.searchHistory[req.user.searchHistory.length-1].id !== response.results[0].id){
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].name,
            searchType: "tv",
            createdAt: new Date()
          }
        }
      })
    }

    res.status(200).json({ success: true, content: response.results });

  } catch (error) {
    console.log("Error in searchTv controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in getSeachHistory controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const removeItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params; // is a string

    id = parseInt(id); // because id of history in database is int not string 

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {id: id}
      }
    })// will pull only the first that appear

    res.status(200).json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log("Error in removeItemFromSearchHistory controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" }); 
  }
}