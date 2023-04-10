import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../actions/uploadAction";
import { updateUser } from "../actions/userAction";

const ProfileModal = ({opened,setOpened,data}) => {
  const {password , ...other} = data;
  const [formData , setformData] = useState(other)
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profileImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setOpened(false);
  };


  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
       <div className="p-4 bg-red-200 flex flex-col justify-center items-center gap-3">
        <input type="text" placeholder='Name' name="firstname" onChange={handleChange}  value={formData.firstname}/>
        <input type="text" placeholder='Lname' name="lastname" onChange={handleChange}  value={formData.lastname}/>
        <input type="text" placeholder='worksat' name="worksAt" onChange={handleChange}  value={formData.worksAt}/>
        <input type="text" placeholder='livesat' name="livesIn" onChange={handleChange}  value={formData.livesIn}/>
        <input type="text" placeholder='country' name="country" onChange={handleChange}  value={formData.country}/>
        <input type="text" placeholder='rela' name="relationShip" onChange={handleChange}  value={formData.relationShip}/>
        <input type="file" name="profileImage" onChange={onImageChange}/>
        <input type="file" name="coverImage"   onChange={onImageChange}/>
        <button onClick={handleSubmit}>Update</button>
        
      </div>
      </Modal>

      
    </div>
  );
};

export default ProfileModal;
