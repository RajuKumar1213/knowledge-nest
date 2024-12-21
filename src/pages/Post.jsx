import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Button } from "../components";
import appwriteStorage from "../appwrite/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import spinner from "/spinner.svg";
import { setLoadingFalse } from "../store/loadingSlice";
import { showAlert } from "../store/alertSlice";

function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const slug = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuther = post && userData ? userData.$id === post.userId : false;
  const [textSize, setTextSize] = useState(16);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const loading = useSelector((state) => state.loading.loading);

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
    dispatch(setLoadingFalse());
  }, [slug, navigate]);

  const handleDelete = async () => {
    const status = await appwriteService.deletePost(slug);
    if (status) {
      await appwriteStorage.deleteFile(post.featuredImage);
      dispatch(
        showAlert({ message: "Post deleted successfully", type: "success" })
      );
      navigate("/");
    }
  };

  const confirmDelete = () => {
    handleDelete();
    setShowModal(false); // Close the modal after confirming delete
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
  };

  return !loading ? (
    <div className="flex flex-col overflow-scroll md:overflow-hidden items-start w-full text-white rounded-lg  space-y-4 mt-10 md:mt-20">
      {/* Buttons for adjusting text size */}
      <div className=" w-full">
        <div className="  gap-x-4 flex ">
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

              <Button
                className={"bg-red-600"}
                onClick={() => setShowModal(true)}
              >
                Delete
              </Button>

              <Link to="/">
                <Button>Submit</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-2">
        <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
        <div
          className="text-gray-400 mt-2 leading-8 pb-6 font-sans font-medium"
          style={{ fontSize: `${textSize}px` }}
        >
          {post ? parse(String(post.content)) : "loading... "}
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className=" p-4 fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg md:w-1/3 w-full text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-around">
              <Button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Yes
              </Button>
              <Button
                onClick={cancelDelete}
                className="bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <img src={spinner} alt="" className="w-24 mx-auto my-auto h-screen" />
  );
}

export default Post;
