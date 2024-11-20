import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="">
      <Container>
        <div className="text-center mb-8 rounded-lg  py-4 text-white">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-md">
            Create a new post!
          </h1>
        </div>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
