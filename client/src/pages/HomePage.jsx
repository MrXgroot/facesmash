import React from "react";
import Post from "../components/Post";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://192.168.199.88:5000/");

        if (res.status !== 200) {
          throw new Error(`Unexpected status code: ${res.status}`);
        }

        const data = await res.json();
        setPosts(data.data);
        console.log("Fetched data:", data.data);
      } catch (err) {
        console.error("❌ Error fetching data:", err.message || err);
      }
    };

    fetchData();
  }, []);

  console.log(posts.length);
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* {posts.length > 0 &&
        posts.map((post, idx) => (
          <Post key={post._id} imageUrl={post.imageUrl} />
        ))} */}
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default HomePage;
