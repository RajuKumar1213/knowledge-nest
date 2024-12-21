import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const posts = useSelector((state) => state.post.posts.documents);
  const userData = useSelector((state) => state.auth.userData);

  // console.log(posts, userData);
  const noOfPosts = posts?.filter((post) => post?.userId === userData?.$id);

  return (
    <div className="pt-10 md:pt-20 text-white flex items-center justify-center">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg rounded-lg p-6 w-96 relative">
        <button className="bg-slate-900 text-white rounded-2xl px-3 py-1 absolute right-2 top-2 block">
          Edit profile
        </button>
        <div className="flex flex-col items-center ">
          <img
            className="w-24 h-24 rounded-full shadow-md object-cover border-2 border-white"
            src="https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg"
            alt="Profile"
          />
          <h2 className="text-2xl font-semibold mt-4">{userData?.name}</h2>
          <p className="text-gray-400">{userData?.email}</p>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-300">Number of your Posts</p>
            <p className="font-bold text-lg">{noOfPosts?.length}</p>
          </div>
        </div>

        <Link to="/">
          <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-teal-600 transition duration-200">
            See your posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
