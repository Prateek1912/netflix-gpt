import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { clearSearchedMovies, toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  }

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    dispatch(clearSearchedMovies());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-screen absolute px-8 py-2 z-10 bg-gradient-to-b from-black flex justify-between">
      <img className="w-60" src={LOGO}></img>
      {user && (
        <div className="flex p-2">
          {showGptSearch &&
            <select className="m-4 px-4 py-2 rounded-lg bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
            </select>
          }
          <button
            className="m-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={handleGptSearchClick}
          >
            {!showGptSearch? "Movie Search" : "Homepage"}
          </button>
          <img className="w-16 h-16" alt="userIcon" src={user.photoURL}></img>
          <button onClick={handleSignOut} className="font-bold text-white p-2">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header