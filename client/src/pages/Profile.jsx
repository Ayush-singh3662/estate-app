import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../../firebase";

const Profile = () => {
  const { currentUser } = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  // console.log(filePerc);
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
        // console.log("Upload is "+progress+"% done");
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

  return (
    <div className="max-w-lg mx-auto">
      <h1  className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} hidden type="file" ref={fileRef} accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" />
        <p className="text-sm self-center">{fileUploadError ? <span className="text-red-700">Image Upload Error(image should be less than 2 MB)</span> : (filePerc > 0 && filePerc < 100) ? <span className="text-slate-700">{`Uploading...${filePerc}`}</span> : filePerc === 100 ? <span className="text-green-700">Image uploaded successfully</span> : ''}</p>
        <input type="text" placeholder="username" defaultValue={currentUser.username} className="border p-3 rounded-lg" id="username" />
        <input type="email" placeholder="email" defaultValue={currentUser.email} className="border p-3 rounded-lg" id="email" />
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">Update</button>
        <button className="bg-green-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">Create Listing</button>
      </form>
      <div className="flex justify-between my-2">
        <span className="text-red-700 text-lg cursor-pointer">Delete Account</span>
        <span className="text-red-700 text-lg cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile