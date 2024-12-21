import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/postSlice";

function AllPosts() {
  const dispatch = useDispatch();
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        dispatch(addPost(posts));
      }
    });
  }, []);

  const posts = useSelector((state) => state.post.posts.documents);

  return (
    <div className="py-10 md:py-20">
      <Container>
        <div className="text-center mb-8 rounded-lg  text-white">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-md mb-4">
            Explore All Posts
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-semibold">
            Dive into a world of ideas, creativity, and inspiration. Find your
            next favorite read today!
          </p>
        </div>
        {posts?.length === 0 ? (
          <p className="text-gray-400">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts?.map((post) => (
              <div key={post.$id} className="mb-4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
