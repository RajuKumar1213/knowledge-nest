import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import appwriteStorage from "../../appwrite/storage";
import { useNavigate } from "react-router-dom";
import { Container, Input, Button, RTE, Select, Alert } from "../index";
import { useSelector, useDispatch } from "react-redux";
import spinner from "/spinner.svg";
import { showAlert } from "../../store/alertSlice";

function PostForm({ post }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [lodding, setLodding] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const { handleSubmit, register, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  useEffect(() => {
    if (post) {
      setValue("title", post.title || "");
      setValue("slug", post.$id || "");
      setValue("content", post.content || "");
      setValue("status", post.status || "active");
    }
  }, [post, setValue]);

  const submit = async (data) => {
    if (post) {
      setError("");
      setLodding(true);

      try {
        const file = data.image[0]
          ? await appwriteStorage.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteStorage.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          dispatch(showAlert({message:"Post Updated Successfully!", type:"success"}));
          navigate(`/post/${dbPost.$id}`);
        }
      } catch (error) {
        setError(error.message);
        setLodding(false);
      }
    } else {
      setError("");
      setLodding(true);
      try {
        const file = data.image[0]
          ? await appwriteStorage.uploadFile(data.image[0])
          : null;
        //upload the file
        if (file) {
          data.featuredImage = file.$id;
          // calling appwirite service to create new post
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
            userName: userData.name,
            userEmail: userData.email,
          });

          if (dbPost) {
            dispatch(showAlert({message:"Post Creted Successfully!", type:"success"}));
            navigate(`/post/${dbPost.$id}`);
          }
          setLodding(false);
        }
      } catch (error) {
        setLodding(false);
        setError(error.message);
      }
    }
  };

  // slug transform
  const slugTrasnform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[\W_]+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTrasnform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [slugTrasnform, setValue, watch]);

  return (
    <Container>
      {error && (
        <p className="text-sm pb-4 text-red-600 font-semibold mt-2 flex items-center">
          <svg
            className="w-4 h-4 mr-1 fill-current text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M11.001 10h2v5h-2zm0 8h2v2h-2z" />
            <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          </svg>
          {error}
        </p>
      )}

      <form className="flex w-full flex-wrap" onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col w-full md:w-2/3 pr-4 ">
          <Input
            label={"Title :"}
            type="text"
            name="title"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label={"Slug :"}
            type="text"
            name="slug"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTrasnform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          {<RTE /> ? (
            <RTE
              className="h-[400px]"
              label={"Content : "}
              control={control}
              name="content"
              defaultValue={getValues("content")}
            />
          ) : (
            <img src={{ spinner }} alt="" />
          )}
        </div>

        <div className="flex flex-col w-full md:w-1/3 py-6 md:py-0">
          <Input
            label={"Featured Image :"}
            type={"file"}
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full h-56 mb-4">
              <img
                src={
                  post ? appwriteStorage.getFilePreview(post.featuredImage) : ""
                }
                alt=""
                className="w-full object-cover h-full md:h-52 rounded-lg"
              />
            </div>
          )}
          <Select
            label={"Status :"}
            name="status"
            options={["active", "inactive"]}
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button type="submit" className="w-full">
            {" "}
            {lodding ? (
              <img src={spinner} alt="spinner" className="mx-auto h-6 w-6" />
            ) : post ? (
              "Update Post"
            ) : (
              "Create Post"
            )}
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default PostForm;
