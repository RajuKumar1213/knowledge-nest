import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Button } from "../components";
import appwriteStorage from "../appwrite/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const slug = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuther = post && userData ? userData.$id === post.userId : false;

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

  return (
    <div className="flex flex-col items-start w-full text-white rounded-lg  p-4 space-y-4 ">
      {/* Image Section */}
      <div className=" w-full flex ">
        <img
          src={
            post
              ? appwriteStorage.getFilePreview(post.featuredImage)
              : ""
          }
          alt={post.title}
          className="w-2/3 md:w-1/2 h-full object-cover rounded-lg shadow-md"
        />

        <div className="flex flex-col">
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
        <h2 className="text-xl font-semibold text-white">{post.title}</h2>
        <div className="text-gray-400 mt-2 leading-7">
          {parse(String(post.content))}
        </div>
      </div>
    </div>
  );
}

export default Post;
