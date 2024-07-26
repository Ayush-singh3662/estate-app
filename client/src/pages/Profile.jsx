import { useSelector } from "react-redux"

const Profile = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className="max-w-lg mx-auto">
      <h1  className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="Profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" />
        <input type="text" placeholder="username" value={currentUser.username} className="border p-3 rounded-lg" id="username" />
        <input type="email" placeholder="email" value={currentUser.email} className="border p-3 rounded-lg" id="email" />
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