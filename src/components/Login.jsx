import React, { useState } from "react";
import "./All.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import Signingoogle from "./Signingoogle";
import { FaEye } from "react-icons/fa6";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showp, setShowp] = useState(true);
    const [hidep, sethidep] = useState(false);


    const handleShow = () => {
        setShowp(!showp);
        sethidep(!hidep)
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); // Corrected typo
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully!");

            window.location.href = "/home";

            toast.success("User logged in successfully!", { position: "top-center" });
        } catch (error) {
            console.error(error.message);
            toast.error(error.message, { position: "top-center" });
        }
    };

    const handleReset = () => {
        window.location.href = "/forget";
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="box">
                <h3>Login</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type={showp ?   "password" :"text"}
                        className="form-control"
                        id="inputz"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className="labbel" onClick={handleShow} style={{ cursor: "pointer" }}>
                        {showp ?  <FaEye /> :<IoMdEyeOff />}
                    </label>
                    
                </div>


                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

                <span className="regi-logi">
                    <p onClick={handleReset}>forget password ?</p>
                    New user? <Link to={"/signup"}><p>Signup Here</p></Link>
                </span>
                <Signingoogle />
            </div>

        </form>
    );
}

export default Login;
