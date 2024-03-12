import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.log("error fetching data: " + err);
      }
    };
    fetchData();
  }, [url]);

  return data;
};
