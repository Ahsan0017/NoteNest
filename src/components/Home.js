import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';
import Notes from './Notes';
// import AddNote from './AddNote';

const Home = () => {
  const { userName, getUser } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      getUser(); // Fetch user data if token exists
    }
  }, [getUser, navigate]);

  return (
    <div className="container my-3">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome to NoteNest</h1>

        {userName && (
          <div style={{ textAlign: 'right' }}>
            <h3>Hello, {userName} 👋</h3>
          </div>
        )}
      </div>

      <hr />
      
      {/* <AddNote /> */}

      {/* <h2 className="my-3">Your Notes:</h2> */}
      <Notes />
    </div>
  );
};

export default Home;
