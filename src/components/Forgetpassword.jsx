import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { auth } from "./firebase";
import { toast } from 'react-toastify';

function Forgetpassword() {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected case
    const emailVal = e.target.email.value; // Accessing the email input using its 'name' attribute
    try {
      await sendPasswordResetEmail(auth, emailVal); // Added await for better async handling


      window.location.href = "/";
      console.log("Check your Email!");
      toast.success("Check your Email!", { position: "top-center" });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "top-center" }); // Uncommented the toast for errors
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="box">
        <h3>Reset password</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email" // Added 'name' attribute to make it accessible in e.target.email
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}

export default Forgetpassword;
