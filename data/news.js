import { useEffect, useState } from "react";

function news() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=c3c883d416f04893835e79d699ae0f52"
        );
        const jsonData = await response.json();
        //console.log(jsonData);
        setData(jsonData.articles);
        //console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return data;
}

export default news;
