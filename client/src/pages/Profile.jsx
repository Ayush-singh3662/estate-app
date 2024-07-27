import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => setFormData({...formData, avatar: downloadURL}));
      },
    );
  }

const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
}

const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if(data.success === false || error) {
      dispatch(updateUserFailure(data.message));
      return ;
    }
    dispatch(updateUserSuccess(data));
    setUpdate(true);
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
}

const handleUserDelete = async () => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if(data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return ;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
}

  return (
    <div className="max-w-lg mx-auto">
      <h1  className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} hidden type="file" ref={fileRef} accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" />
        <p className="text-sm self-center">{fileUploadError ? <span className="text-red-700">Image Upload Error(image should be less than 2 MB)</span> : (filePerc > 0 && filePerc < 100) ? <span className="text-slate-700">{`Uploading...${filePerc}`}</span> : filePerc === 100 ? <span className="text-green-700">Image uploaded successfully</span> : ''}</p>
        <input type="text" placeholder="username" defaultValue={currentUser.username} className="border p-3 rounded-lg" id="username" onChange={handleChange} />
        <input type="email" placeholder="email" defaultValue={currentUser.email} className="border p-3 rounded-lg" id="email" onChange={handleChange} />
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Update'}</button>
        <button className="bg-green-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">Create Listing</button>
      </form>
      <div className="flex justify-between my-2">
        <span onClick={handleUserDelete} className="text-red-700 text-lg cursor-pointer">Delete Account</span>
        <span className="text-red-700 text-lg cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 text-md mb-4">{error ? error : ''}</p>
      <p className="text-green-700 text-md mb-4">{!error && update ? 'Profile is updated successfully' : ''}</p>
    </div>
  )
}

export default Profile