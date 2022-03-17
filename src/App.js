import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import CustomNav from "./components/CustomNav";
import NewsContent from "./components/NewsContent/NewsContent";

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  const [category, setCategory] = useState("general");

  const [keywordExist, setKeywordExist] = useState(false);

  const NEWS_API_KEY = "928de73bc4254d84a86f7ebcc9fc1038";

  const newsApi = async () => {
    try {
      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}&pageSize=${loadMore}&category=${category}`
      );
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };

  const searchNews = async (keyword) => {
    try {
      const news = await axios.get(
        `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${NEWS_API_KEY}`
      );
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };

  let timeout = null; // created for debouncing
  const search = (keyword) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchNews(keyword);
    }, 3000);
  };

  useEffect(() => {
    if (keywordExist === false) {
      newsApi();
    }
  }, [newsResults, loadMore, category]);

  return (
    <div className="App" id="#home">
      <CustomNav setCategory={setCategory} setKeywordExist={setKeywordExist} />
      {newsResults && (
        <NewsContent
          category={category}
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
          searchNews={search}
          keywordExist={keywordExist}
          setKeywordExist={setKeywordExist}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
