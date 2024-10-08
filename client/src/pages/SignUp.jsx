import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        setError(data.message);
        setLoading(false);
        return ;
      }
      setError(null);
      setLoading(false);
      navigate('/signin');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed">{loading ? 'Loading...': 'SignUp'}</button>
        <OAuth />
      </form>
      <div className="flex gap-2 my-2">
        <p>Already have an accout?</p>
        <Link to='/signin'><span className="text-blue-600 text-decoration: underline">SignIn</span></Link>
      </div>
      {error && <p className="text-red-700 mt-4 text-lg">{error}</p>}
    </div>
  )
}

export default SignUp;