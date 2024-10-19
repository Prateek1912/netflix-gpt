import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { clearSearchedMovies } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = ({forPath}) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const location = useLocation(); // Get current location object
  const currentPath = location.pathname; // Extract the current path

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(clearSearchedMovies());
    currentPath=="/movie" || currentPath=="/browse" ? navigate("/search") : navigate("/browse");
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleLogoClick = () => {
    navigate("/browse");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && forPath == "browse") {
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
      } else if (!user) {
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
      <Link to={"/"} onClick={handleLogoClick}>
        <img className="w-60" src={LOGO}></img>
      </Link>
      {user && (
        <div className="flex p-2">
          {currentPath!="/movie" && showGptSearch && (
            <select
              className="m-4 px-4 py-2 rounded-lg bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="m-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={handleGptSearchClick}
          >
            {currentPath == "/movie" || currentPath == "/browse"
              ? "Movie Search" : "Homepage"}
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