import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Button } from "../components";
import appwriteStorage from "../appwrite/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import spinner from "/spinner.svg";

function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const slug = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuther = post && userData ? userData.$id === post.userId : false;
  const [textSize, setTextSize] = useState(16);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const handleDelete = async () => {
    const status = await appwriteService.deletePost(slug);
    if (status) {
      await appwriteStorage.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  return post ? (
    <div className="flex flex-col items-start w-full text-white rounded-lg  space-y-4 ">
      {/* // making big and small button */}
      <div className="flex gap-x-4 w-full ">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 active:bg-gray-800 focus:ring-2 focus:ring-gray-500"
          onClick={() => setTextSize(textSize - 2)}
        >
          A-
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 active:bg-gray-800 focus:ring-2 focus:ring-gray-500"
          onClick={() => setTextSize(textSize + 2)}
        >
          A+
        </button>
      </div>

      {/* Image Section */}
      <div className=" w-full flex ">
        <img
          src={post ? appwriteStorage.getFilePreview(post.featuredImage) : ""}
          alt={post.title}
          className={`${
            isAuther ? "w-2/3" : "w-full"
          }  md:w-1/2 h-full object-cover rounded-lg shadow-md`}
        />

        <div className="flex flex-col ">
          {/* Buttons Section */}
          {isAuther && (
            <div className="flex space-x-4 flex-col">
              <Link to={`/edit-post/${post.$id}`}>
                <Button>Edit</Button>
              </Link>
              <Link to="/">
                <Button className={"bg-red-600"} onClick={handleDelete}>
                  Delete
                </Button>
              </Link>
              <Link to="/">
                <Button>Submit</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Content Section */}

      {/* Title and Description Section */}
      <div className="mt-2">
        <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
        <div
          className="text-gray-400 mt-2 leading-8 pb-6 font-sans font-medium"
          style={{ fontSize: `${textSize}px` }}
        >
          {parse(String(post.content)) }
        </div>
      </div>
    </div>
  ) : (
    <img src={spinner} alt="" className="w-24 mx-auto my-auto h-screen" />
  );
}

export default Post;
