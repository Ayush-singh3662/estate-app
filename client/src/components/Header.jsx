// import React from 'react'

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
        <h1>
            <span className="text-slate-500">Ayush</span>
            <span className="text-slate-700">Estate</span>
        </h1>
        <form>
            <input type="text" placeholder="Search..." className="bg-transparent" />
        </form>
    </header>
  )
}

export default Header;