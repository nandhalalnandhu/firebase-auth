import React, { useEffect, useState } from 'react'
import "./Home.css"
import { auth, db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

// import { toast } from "react-toastify";

function Home() {

    const [userData, setUserdata] = useState(null);

    const fetchUserData = async () => {

        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            // setUserdata(user)
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserdata(docSnap.data())
                console.log(docSnap.data());

            } else {
                console.log("user is not logged in");

            }
        })
    }

    useEffect(() => {
        fetchUserData();
    }, [])


    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/login"
        } catch (error) {
            console.error("Error logging out", error.message);

        }
    }

    return (
        <div className="containerr">
            {userData ? (
                <>
                    <div className="profile-container">
                        <img
                            src={userData.photo}
                            alt="User Profile"
                            className="profile-image"
                        />
                    </div>
                    <h3 className="welcome-text">
                        Welcome {userData.displayName}🎉🎉
                    </h3>
                    <div className="user-info">
                        <p className="user-detail">Name: {userData.firstname}</p>
                        <p className="user-detail">Email: {userData.email}</p>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <p className="loading-text">Loading...</p>
            )}
        </div>

    )
}

export default Home;