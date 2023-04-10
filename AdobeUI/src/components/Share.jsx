import React, { useRef, useState } from "react";
import img from "../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../actions/uploadAction";

const Share = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [imge, setImg] = useState(null);
  const imgeref = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const content = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImg(img);
    }
  };

  const reset = ()=>{
    setImg(null)
    content.current.value="";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      user_id: user._id,
      content: content.current.value,
    };
    console.log(newPost);

    if (imge) {
      const data = new FormData();
      const filename = Date.now() + imge.name;
      data.append("name", filename);
      data.append("file", imge);
      newPost.image = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset()
  };
  const uurl = `http://localhost:5000/images/`


  return (
    <div className="p-2 bg-white rounded-lg  w-full ">
      <div className="img flex gap-4 py-2 w-full flex items-center">
        <img className="w-12 rounded-full" src={user.profileImage?uurl+user.profileImage : uurl+"def.jpg"} alt="" />
        <input
          ref={content}
          required
          className="w-full h-12"
          type="text"
          placeholder="Whats Happening...."
        />
      </div>
      <div className="flex justify-between items-center px-28">
        <p
          onClick={() => imgeref.current.click()}
          className="flex gap-2 font-semibold text-sm"
        >
          <UilScenery />
          Photo
        </p>
        <p className="flex gap-2 font-semibold text-sm">
          <UilPlayCircle />
          Video
        </p>
        <p className="flex gap-2 font-semibold text-sm">
          <UilLocationPoint />
          Loction
        </p>
        <p className="flex gap-2 font-semibold text-sm">
          <UilSchedule />
          Schedules
        </p>
        <button
          className="bg-orange-400 text-white text-sm font-bold rounded px-4 py-1"
          onClick={handleSubmit}
        >
         {loading ? "Uploading..":"Share"}
        </button>
        <div className="hidden">
          <input
            type="file"
            name="myimge"
            ref={imgeref}
            onChange={onImageChange}
          />
        </div>
      </div>
      {imge && (
        <div className="overflow-hidden flex justify-center">
          <UilTimes
            className="bg-white text-black rounded-full relative top-6 left-[370px]"
            onClick={() => setImg(null)}
          />
          <img
            className="rounded mt-4 h-96 w-96"
            src={URL.createObjectURL(imge)}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Share;
