import { useRef, useState } from "react";
import Header from "./Header"
import { validate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [message, setMessage] = useState("");
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
    
  const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
  }

  const validateInput = () => {
    const msg = validate(email.current.value, password.current.value);
    setMessage(msg);
    
    if (msg) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setMessage(error.message);
            });
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorMessage);
          // ..
        });
      
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorMessage);
        });
    }
  }
  
    return (
      <div>
        <Header />
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg"
        ></img>
        <form onSubmit={(e)=>e.preventDefault()} className="absolute text-white w-1/4 bg-black my-36 p-8 mx-auto left-0 right-0 rounded-lg bg-opacity-80">
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="p-4 my-4 w-full bg-gray-700"
                ></input>}
          <input
            ref={email}
            type="text"
            placeholder="Email or phone"
            className="p-4 my-4 w-full bg-gray-700"
          ></input>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          ></input>
          <p className="text-red-500 font-bold py-2 text-lg">{message}</p>
          <button onClick={ validateInput} className="bg-red-700 p-4 my-6 w-full rounded-lg">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm? "New to Netflix? Sign Up Now":"Already registered? Sign In now"}
          </p>
        </form>
      </div>
    );
}

export default Login;