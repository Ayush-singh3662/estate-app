import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">SignUp</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed">SignUp</button>
      </form>
      <div className="flex gap-2 my-2">
        <p>Already have an accout?</p>
        <Link to='/signin'><span className="text-blue-600 text-decoration: underline">SignIn</span></Link>
      </div>
    </div>
  )
}

export default SignUp