import React, { useEffect } from "react";
import { Button } from "./index";
import { Link } from "react-router-dom";
import appwriteStorage from "../appwrite/storage";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function PostCard({ $id, title, featuredImage, content, $createdAt, userId, userName, userEmail }) {

  function calculateReadTime(content) {
    const wordsPerMinute = 200; // Average reading speed
    const text = content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    const wordCount = text
      .split(/\s+/)
      .filter((word) => word.length > 0).length; // Count words
    const minutes = Math.floor(wordCount / wordsPerMinute);
    const seconds = Math.ceil(
      (wordCount % wordsPerMinute) / (wordsPerMinute / 60)
    );

    return `${minutes} min ${seconds} sec read`;
  }

  // function to get time string 
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    // Format options
    const options = {
      weekday: "long", // Full weekday name
      year: "numeric", // Full year
      month: "long",   // Full month name
      day: "numeric",  // Numeric day
      hour: "numeric", // Hour (12/24-hour based on locale)
      minute: "2-digit", // Minutes
      second: "2-digit", // Seconds
      hour12: true,    // 12-hour clock
    };
  
    // Format the date-time
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
 

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg border-gray-500 border p-4">
      {/* Image Section */}
      <img
        src={featuredImage ? appwriteStorage.getFilePreview(featuredImage) : ""}
        alt={title}
        className="rounded-lg w-full h-64 object-cover transition-transform duration-300 transform hover:scale-95 shadow-lg"
      />

      <h2 className="pt-4  text-lg md:text-xl font-bold text-white">{title.length>25 ? title?.substring(0,25):title}{title.length>25? "..." : ""}</h2>
      <p className="pt-2 text-sm text-gray-400">{calculateReadTime(content)}</p>
      <p className="pt-2 text-sm text-gray-400">{formatDateTime($createdAt)}</p>
      <p className="pt-2 text-sm text-gray-400">By: {userName}</p>
      {/* <p className="pt-2 text-sm text-gray-400">By: {}</p> */}
      <Link to={`/post/${$id}`} className="cursor-pointer">
        <Button>Read full article</Button>
      </Link>
    </div>
  );
}

export default PostCard;
