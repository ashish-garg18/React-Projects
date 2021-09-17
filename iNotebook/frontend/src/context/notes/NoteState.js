import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
   const host = "http://localhost:5000";

   const notesIinitial = []
   const [notes, setNotes] = useState(notesIinitial)

   // Get all note
   const getNotes = async () => {
      const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         }
      });
      const json = await response.json();
      // console.log(json)
      setNotes(json)
   }

   // Add a note
   const addNote = async (title, description, tag) => {
      // api call
      const response = await fetch(`${host}/api/notes/addNote`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },
         body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))
   }


   // Delete a note
   const deleteNote = async (id) => {
      // api call
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },
      });
      const json = response.json();
      console.log(json)

      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes)
   }

   // Edit a note
   const editNote = async (id, title, description, tag) => {
      // api call
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },
         body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
         const element = newNotes[index];
         if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag
            break;
         }
      }
      setNotes(newNotes);
   }

   return (
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
         {props.children}
      </NoteContext.Provider>
   )
}
export default NoteState