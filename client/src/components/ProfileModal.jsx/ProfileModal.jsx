import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../actions/userAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  // const{user} = useSelector((state)=>state.authreducer.authdata);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // ✅ CHANGED: API endpoint for image upload to backend (Cloudinary route)
  const UPLOAD_API = "https://sever-cuverse-1.onrender.com/upload/uploadProfileOrCover"
;
  // const UPLOAD_API = "https://connectify-fs61.onrender.com/api/upload/uploadProfileOrCover";

  // ✅ ADDED: Function to upload image to backend (which sends it to Cloudinary)
 // ✅ ADDED: Upload image with userId and type (profile or cover)
const uploadToCloudinary = async (imageFile, type) => {
  const data = new FormData();
  data.append("image", imageFile);
  data.append("userId", formData._id); // 👈 needed for DB update
  data.append("type", type);           // 👈 profile or cover

  try {
    const res = await fetch(UPLOAD_API, {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.msg || "Upload failed");
    }

    return result.imageUrl; // ✅ from backend response
  } catch (err) {
    console.error("Image upload failed:", err);
    return null;
  }
};


  // ✅ MODIFIED: Now uploads images to Cloudinary before calling updateUser
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = { ...formData };
  
    if (profileImage) {
      const profileUrl = await uploadToCloudinary(profileImage, "profile");
      if (profileUrl) UserData.profilePicture = profileUrl;
    }
  
    if (coverImage) {
      const coverUrl = await uploadToCloudinary(coverImage, "cover");
      if (coverUrl) UserData.coverPicture = coverUrl;
    }
  
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };
  

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Relationship Status"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        {/* ✅ CHANGED: File inputs for profile and cover images */}
        <div>
          Profile Image:
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image:
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
