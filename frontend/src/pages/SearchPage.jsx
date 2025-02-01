import { act, useEffect, useRef, useState } from "react"
import { userContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { ORIGINAL_IMAGE_BASE_URL, SMALL_IMAGE_BASE_URL } from "../utils/constants";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const {setContentType} = userContentStore();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tabSearch = searchParams.get("tab");
    const searchQuery = searchParams.get("search");

    if(searchQuery && tabSearch) {
      setSearchTerm(searchQuery);
      handleSearch({searchQuery , tab: tabSearch});

      if(tabSearch === "movie" || tabSearch === "tv"){
        setContentType(tabSearch);
        setActiveTab(tabSearch);
      }
    }
  }, [searchParams]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movies" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  }

  const handleSearch = async ({e, searchQuery, tab}) => {
    if(e){
      e.preventDefault();
    } 
    const toSearch = searchQuery || searchTerm;
    const category = tab || activeTab;

    setSearchParams({ search: toSearch, tab: category });

    try {
      const res = await axios.get(`/api/v1/search/${category}/${toSearch}`);
      setResults(res.data.content);

      // error is from response , axios throw error when response is not 200-299
    } catch (error) {
      if(error.response.status === 404) {
        console.log(error);
        toast.error("Nothing found, make sure you are searching under the right category");
      }
      else {
        toast.error("An error occrued, please try again later");
      }
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button 
            className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"}`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button 
            className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"}`}
            onClick={() => handleTabClick("tv")}
          >
            Tv Shows
          </button>
          <button 
            className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"}`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>

        </div>

        <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={(e) => handleSearch({e})}>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search for a " + activeTab}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => { // map return ค่าได้
            if(!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <Link to={"/actor/" + result.name} className="flex flex-col items-center">
                    <img 
                      src={ORIGINAL_IMAGE_BASE_URL + result.profile_path} 
                      alt={result.name} 
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                ) : (
                  <Link to={"/watch/" + result.id} >
                    <img 
                      src={ORIGINAL_IMAGE_BASE_URL + result.poster_path} 
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.title || result.name}</h2>
                  </Link>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default SearchPage