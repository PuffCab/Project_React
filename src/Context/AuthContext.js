import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth } from "../config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  // console.log("props >>>", props);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const redirectTo = useNavigate();

  const signUp = async (displayName, email, password) => {
    console.log("displayName, email, password", email, password, displayName);
    try {
      const userSignUp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          console.log("profile updated");
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });

      console.log("userCredentials>", userSignUp);
      setUser(userSignUp);
      redirectTo("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error>", error);
    }
  };

  const logIn = async (email, password) => {
    console.log("email, password", email, password);
    try {
      const userLogIn = await signInWithEmailAndPassword(auth, email, password);
      console.log("userLogIn", userLogIn);
      setUser(userLogIn);
      redirectTo("/movies");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("login error>", error);
    }
  };

  const checkIfUserIsLogged = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("user is logged in");
        setUser(user);
      } else {
        console.log("user is NOT logged in");
        setUser(null);
      }
    });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        redirectTo("/");
      })
      .catch((error) => {});
  };

  const deleteUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  const handleDeleteUser = () => {
    
  } 

  const handleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    checkIfUserIsLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signUp,
        logIn,
        logOut,
        handleDropdown,
        open,
        updateProfile,
        handleDeleteUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
