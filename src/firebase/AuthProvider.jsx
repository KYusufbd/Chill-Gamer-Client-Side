import PropTypes from "prop-types";
import AuthContext from "../contexts/AuthContext";
import auth from "./firebaseAuth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import ApiContext from "../contexts/ApiContext";
import swal from "sweetalert";

const AuthProvider = ({ children }) => {
  const { api } = useContext(ApiContext);
  const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();
  // Login with Google:
  const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const loggedUser = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // Update user state
        setUser(loggedUser);
        const name = loggedUser.displayName;
        const email = loggedUser.email;
        const image = loggedUser.photoURL;
        const userObj = { name, email, image };
        console.log(userObj);

        // Add user info to database when logged in first time
        fetch(`${api}/user`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userObj),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  //   Get current user:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   setLoading(false);
      return unsubscribe();
    });
  }, []);

  //   Log out:
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        swal("Logged Out!", "You are logged out successfully!", "warning");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const authInfo = {
    loginWithGoogle,
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
