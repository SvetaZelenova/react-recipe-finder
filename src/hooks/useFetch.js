import { useEffect, useState } from "react";

const useFetch = (getFnc, prm) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFnc(prm)
      .then((res) => {
        setFetchedData(res)
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [prm, getFnc]);

  return { fetchedData, error };
};

export default useFetch;
