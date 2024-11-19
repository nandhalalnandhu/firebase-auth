import React, { useState } from "react";
import "./All.css"
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa6";
import { IoMdEyeOff } from "react-icons/io";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setName] = useState("");

    const [showp, setShowp] = useState(true);
    const [hidep, sethidep] = useState(false);
    const [errors, setErrors] = useState({});

    const passwordRequirements = [
        { test: (pw) => pw.length >= 6, message: "Must be at least 8 characters" },
        { test: (pw) => /[A-Z]/.test(pw), message: "Must contain at least one uppercase letter" },
        { test: (pw) => /[a-z]/.test(pw), message: "Must contain at least one lowercase letter" },
        { test: (pw) => /[0-9]/.test(pw), message: "Must contain at least one number" },
        { test: (pw) => /[!@#$%^&*]/.test(pw), message: "Must contain at least one special character (!@#$%^&*)" },
    ];

    const handleShow = () => {
        setShowp(!showp);
        sethidep(!hidep);
    };

    const validateInputs = () => {
        const newErrors = {};

        if (!fname.trim()) {
            newErrors.fname = "Name is required.";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email address.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else {
            const failedRequirements = passwordRequirements
                .filter((req) => !req.test(password))
                .map((req) => req.message);

            if (failedRequirements.length > 0) {
                newErrors.password = failedRequirements.join(", ");
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent form submission

        if (!validateInputs()) {
            return;
        }

        try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            // Get the currently authenticated user
            const user = auth.currentUser;

            if (user) {
                // Save the user data in Firestore
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstname: fname,
                    photo: "",
                });
            }

            window.location.href = "/login";
            toast.success("User Registered successfully!", { position: "top-center" });
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div className="box">
                <h3>SignUp</h3>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.fname && <p className="error-text">{errors.fname}</p>}
                </div>
                <div className="mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="mb-3">

                    <label>Password</label>
                    <input
                        type={showp ? "password" : "text"}
                        className="form-control"
                        id="inputz2"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        
                    />
                    <label
                        className="labbel2"
                        onClick={handleShow}
                        style={{ cursor: "pointer" }}
                    >
                        {showp ? <FaEye /> : <IoMdEyeOff />}
                    </label>
                    {errors.password && <p className="error-text">{errors.password}</p>}

                </div>

                <span className="regi-logi">
                    Already Registered?{" "}
                    <Link to={"/login"}>
                        <p>Login Here</p>
                    </Link>
                </span>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        SignUp
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Signup;
