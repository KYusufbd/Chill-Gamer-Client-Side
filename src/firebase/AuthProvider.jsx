import PropTypes from "prop-types";
import AuthContext from "../contexts/AuthContext";
import auth from "./firebaseAuth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import ApiContext from "../contexts/ApiContext";
import swal from "sweetalert";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const { api } = useContext(ApiContext);
  const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  // Function for aading user info to database when logged in first time
  const postUser = (userObj) => {
    fetch(`${api}/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userObj),
    }).then((res) => {
      console.log(res);
    });
  };

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
        const userObj = { name, email };

        postUser(userObj);

        toast("Logged in with Google successfully!");
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

  // Create an account with email an password
  const register = (name, email, password, imageURL) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        // Add image URL
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imageURL,
        })
          .then(() => {
            // Profile updated!
            // Registration is successfull!
          })
          .catch((error) => {
            // An error occurred
            console.log(error);
          });
        // Update curren user
        const newUser = userCredential.user;
        setUser(newUser);
        const userObj = { name, email };
        const response = await postUser(userObj);
        console.log(response);
        toast("Registration is successful!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // Log in with email and password
  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const loggedUser = userCredential.user;
        // Update user
        setUser(loggedUser);
        toast("Logged in successfully!");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        toast("Username or password is incorrect!");
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
        swal("Logged Out!", "You have logged out successfully!", "warning");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const authInfo = {
    loginWithGoogle,
    register,
    signIn,
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
