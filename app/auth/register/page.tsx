"use client";

import Image from "next/image";
import poor from "@/assets/images/poor.png";
import { useContext, useState } from "react";
export default function Register() {
  const [username, setUsername] = useState("");
  const [tag, setTag] = useState("");

  // const navigate = useNavigate();

  const handleGoogleLogin = () => {

    setUsername("");
    setTag("");

    // navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-primary/50">
      <div className="relative flex flex-col w-full m-2 bg-white rounded-lg md:flex-row overflow-clip h-3/4 md:w-3/4">
        <div className="absolute md:static flex-[2] md:flex-1 w-full h-full">
          <Image src={poor} alt="auth" />
        </div>
        <div
          className="flex-[1] first-letter:w-full w-full h-full p-2 mx-auto flex flex-col gap-2 items-center justify-center
      "
        >
          <input
            type="text"
            name="username"
            id=""
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="tag"
            id=""
            value={tag}
            placeholder="tag"
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            onClick={() => handleGoogleLogin()}
            className="flex items-center w-full gap-2 p-2 bg-white border-2 border-blue-500 rounded-md sm:w-3/4 justify-center_"
          >
            <span className="text-3xl text-blue-500">
              {/* <FaGoogle /> */}G
            </span>
            <p className="w-full text-center">sign in with Google</p>
          </button>
          <button
            // onClick={() => handleGoogleLogin()}
            className="flex items-center justify-center w-full gap-2 p-2 text-white bg-blue-500 rounded-md sm:w-3/4"
          >
            <span className="text-4xl">{/* <FaFacebook /> */}F</span>
            <p className="w-full text-center">sign in with Facebook</p>
          </button>
        </div>
      </div>
    </div>
  );
}
