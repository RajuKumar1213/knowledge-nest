import React, { useEffect, useState } from "react";
import { Container, PostCard, Button } from "../components";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { addPost } from "../store/postSlice";

function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts.documents);


  useEffect(() => {
    if (userData) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          dispatch(addPost(posts));
        }
      });
    }
  }, []);

  const userPost = posts?.filter((post) => post?.userId === userData?.$id);

  return !userData ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex justify-center">
          {userData ? (
            <h1 className="font-bold text-2xl text-primary-dark">
              No any articles to read. Use Add Post button to create a new post.
            </h1>
          ) : (
            <div className="flex flex-col items-center justify-center ">
              <h1 className="font-bold text-2xl text-primary-dark mb-8">
                No Posts Found on your Feed. Please Login to read and post
                articles.
              </h1>
              <div className="flex flex-col items-center justify-center w-full">
                <Link to="/login">
                  <Button type="submit" className="min-w-64">
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button type="submit" className="min-w-64">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-4">
      <Container>
        <div className="flex flex-col items-center text-white  ">
          {/* Welcome Section */}
          <div className="text-center w-full mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-4">
              Welcome to KnowledgeNest!
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300 mb-6">
              "Where thoughts take flight and creativity finds a home."
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400">
              Discover a world of ideas and inspiration! Whether you want to
              share your thoughts or learn from others, KnowledgeNest is here to
              nurture your creativity.
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="text-center mb-4 flex flex-col sm:flex-row gap-4">
            <Link to="/add-post">
              <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 sm:px-8 rounded-md">
                ✍️ Create a New Post
              </button>
            </Link>
            <Link to="/all-posts">
              <button className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-3 px-6 sm:px-8 rounded-md">
                🌍 Explore All Posts
              </button>
            </Link>
          </div>

          {/* Motivational Section */}
          <div className="text-center w-full py-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 mb-4">
              "Creativity is intelligence having fun." – Albert Einstein
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400">
              At KnowledgeNest, we believe in the power of sharing and learning.
              Every post is a story, a spark, and a connection waiting to
              happen.
            </p>
          </div>

          {/* User Posts Section */}
          <div className="w-full">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-8 text-center">
              📝 Your Contributions
            </h3>
            {userPost?.length === 0 && (
              <h2 className="text-xl text-center mb-4 ">
                No Contribution yet, click on create new post to contribute.
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts ? (
                posts
                  .filter((post) => post.userId === userData?.$id)
                  .map((post) => (
                    <div
                      key={post.$id}
                      className="bg-gray-800  rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                    >
                      <PostCard {...post} />
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-400 col-span-full">
                  No posts yet. Start your journey by creating a new post!
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Home;
