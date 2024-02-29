import { Input } from 'antd';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const submitSearchHandler = () => {
    if (searchQuery.length === 0) {
      return;
    }
    navigate("search/" + searchQuery);
  };
  return (
    <div>
      <h2 style={{ color: "brown" }}>Having a hard time cooking?</h2>
      <p style={{ color: "black" }}>Find the best recipes with us</p>
      <Input.Search
        onSearch={submitSearchHandler}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        style={{ width: "40%", display: "block", margin: "0 auto" }}
      />
    </div>
  );
};

export default SearchComponent;
