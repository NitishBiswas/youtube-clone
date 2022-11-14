import './App.css';
import Header from './components/Header.Component';
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';


function App() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data())
        } else {
          setUser([]);
        }
      } else {
        setUser([]);
      }
    });
  }, [])

  return (
    <div className="App container">
      <Header user={user} />
      <Routes>
        <Route path='/youtube-clone' element={<Home user={user} />} />
        {user.length === 0 ? <>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </> : null}
      </Routes>
    </div>
  );
}

export default App;
