import React from 'react';
import './All.css';
import googlelogo from './google.jpg';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, db } from './firebase';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

function Signingoogle() {
  const provider = new GoogleAuthProvider(); // Create a new GoogleAuthProvider instance

  // Check if there is a result from redirect login
  React.useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const user = result.user;

          // Save user information to Firestore
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstname: user.displayName,
            photo: user.photoURL,
          });

          toast.success("Login successful with Google!", { position: "top-center" });
          window.location.href = "/home";
        }
      })
      .catch((error) => {
        toast.error(`Error during Google sign-in: ${error.message}`, { position: "top-center" });
      });
  }, []);

  const googleLogin = () => {
    if (window.innerWidth <= 576) {
      // Use signInWithRedirect for mobile devices
      signInWithRedirect(auth, provider);
    } else {
      // Use signInWithPopup for desktop devices
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;

          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstname: user.displayName,
            photo: user.photoURL,
          });

          toast.success("Login successful with Google!", { position: "top-center" });
          window.location.href = "/home";
        })
        .catch((error) => {
          toast.error(`Error during Google sign-in: ${error.message}`, { position: "top-center" });
        });
    }
  };

  return (
    <div className="google">
      <p className="continue-p"> Or Continue with </p>
      <div>
        <img onClick={googleLogin} className="logo-border" src={googlelogo} width="120px" alt="Google Logo" />
      </div>
    </div>
  );
}

export default Signingoogle;
