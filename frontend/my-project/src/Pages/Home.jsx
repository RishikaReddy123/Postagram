import { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      <div className="Home-container">
        {posts.map((post) => (
          <div key={post._id} className="card home-card">
            <div className="card-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="card-content">
              <h6>{post.title}</h6>
              <p>{post.body}</p>
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              <label htmlFor={`commentInput-${post._id}`}>Comments</label>
              <input
                id={`commentInput-${post._id}`}
                type="text"
                placeholder="Enter comment"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div>
    //   <div className="Home-container">
    //     <div className="card home-card">
    //       <div className="card-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
    //           alt="Profile"
    //         />
    //       </div>
    //       <div className="card-content">
    //         <h6>Card Title</h6>
    //         <p>Hello!</p>
    //         <i className="material-icons" style={{ color: "red" }}>
    //           favorite
    //         </i>
    //         <label htmlFor="commentInput">Comments</label>
    //         <input id="commentInput" type="text" placeholder="Enter comment" />
    //       </div>
    //     </div>

    //     <div className="card home-card">
    //       <div className="card-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
    //           alt="Profile"
    //         />
    //       </div>

    //       <div className="card-content">
    //         <h6>Card Title</h6>
    //         <p>Hello!</p>
    //         <i className="material-icons" style={{ color: "red" }}>
    //           favorite
    //         </i>
    //         <label htmlFor="commentInput">Comments</label>
    //         <input id="commentInput" type="text" placeholder="Enter comment" />
    //       </div>
    //     </div>

    //     <div className="card home-card">
    //       <div className="card-image">
    //         <img
    //           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
    //           alt="Profile"
    //         />
    //       </div>
    //       <div className="card-content">
    //         <h6>Card Title</h6>
    //         <p>Hello!</p>
    //         <i className="material-icons" style={{ color: "red" }}>
    //           favorite
    //         </i>
    //         <label htmlFor="commentInput">Comments</label>
    //         <input id="commentInput" type="text" placeholder="Enter comment" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
