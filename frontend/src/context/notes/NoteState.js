import NoteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const host = "https://notenest-backend-yn27.onrender.com";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [userName, setUserName] = useState("");

  // Get User Name after login/signup
  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
      const data = await response.json();
      setUserName(data.user.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <NoteContext.Provider value={{
      notes,
      addNote,
      deleteNote,
      editNote,
      getNotes,
      getUser,
      userName
    }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
