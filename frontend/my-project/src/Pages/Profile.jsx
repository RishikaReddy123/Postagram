import { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile");
        const data = await response.json();
        setProfile(data.profile);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchProfileData();
    fetchPosts();
  }, []);

  return (
    <div className="main-container">
      <div className="Profile-container">
        <div className="Profile-details">
          <div className="Image-container">
            <img
              className="Profile-image"
              src={profile.image || "https://default-profile-image.jpg"}
              alt="Profile"
            />
          </div>
          <div className="Profile-name">
            <h2>{profile.fullName || "John Doe"}</h2>
          </div>
          <div className="Profile-followers">
            <p>{profile.postsCount || 0} posts</p>
            <p>{profile.followersCount || 0} followers</p>
            <p>{profile.followingCount || 0} following</p>
          </div>
        </div>
      </div>

      <div className="Posts">
        {posts.map((post) => (
          <img
            key={post._id}
            src={post.image || "https://default-image.jpg"}
            alt={`Post ${post._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;

// import "./Profile.css";

// const Profile = () => {
//   return (
//     <div className="main-container">
//       <div className="Profile-container">
//         <div className="Profile-details">
//           <div className="Image-container">
//             <img
//               className="Profile-image"
//               src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
//               alt="Profile"
//             />
//           </div>
//           <div className="Profile-name">
//             <h2>John Doe</h2>
//           </div>
//           <div className="Profile-followers">
//             <p>30 posts</p>
//             <p>19 followers</p>
//             <p>20 following</p>
//           </div>
//         </div>
//       </div>
//       <div className="Posts">
//         <img
//           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
//           alt="post1"
//         />
//         <img
//           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
//           alt="post2"
//         />
//         <img
//           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
//           alt="post3"
//         />
//         <img
//           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
//           alt="post4"
//         />
//         <img
//           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
//           alt="post5"
//         />
//         <img
//           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
//           alt="post6"
//         />
//         <img
//           src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
//           alt="post7"
//         />
//       </div>
//     </div>
//   );
// };

// export default Profile;
