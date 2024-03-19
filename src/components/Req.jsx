import React from 'react'
import "./css/req.css";

export const Req = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Plead a favour!</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>

        <button type="submit">Please</button>
      </form>
    </div>
  )
}
