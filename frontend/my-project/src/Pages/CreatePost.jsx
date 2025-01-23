import "./CreatePost.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const submitPost = () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "postagram");
    formData.append("cloud_name", "rishika-cloud");

    fetch("https://api.cloudinary.com/v1_1/rishika-cloud/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.error) {
          setError("Image upload failed: " + data.error.message);
        } else {
          setSuccess("Image uploaded successfully!");
          createPost(data.secure_url);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("An error occurred while uploading the image.");
        console.log(error);
      });
  };

  const createPost = (imageUrl) => {
    console.log(localStorage.getItem("token"));

    fetch("http://localhost:5000/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        body: body,
        image: imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.message) {
          M.toast({ html: "Post created successfully!" });
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        M.toast({ html: "Something went wrong. Please try again." });
      });
  };

  return (
    <div className="card create-post-container">
      <h3>Create Post</h3>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        placeholder="Post Title"
      />
      <input
        value={body}
        onChange={(event) => setBody(event.target.value)}
        type="text"
        placeholder="Post Content"
      />

      <div className="file-field input-field">
        <div className="btn">
          <span style={{ color: "white" }}>Upload Post Image</span>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      {loading && <div>Uploading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}

      <button
        onClick={submitPost}
        style={{ color: "white" }}
        className="waves-effect waves-light btn"
      >
        Submit Post
      </button>
    </div>
  );
}

export default CreatePost;
