import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";

function EditPage() {
  const navigate = useNavigate();
  const slug = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug,navigate]);

  return post ? (
    <div>
      <Container>
      <div className="text-center mb-8 rounded-lg  py-4 text-white">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-md ">
            Edit Post
          </h1>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPage;
