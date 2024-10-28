import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NoteCard from '../components/NoteCard';
import {toast} from 'react-toastify'

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNote, setFilteredNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
        setFilteredNote(
          notes.filter((note) => 
          note.title.toLowerCase().includes(query.toLowerCase())  || 
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes])

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("https://notes-server-v78m.onrender.com/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      });
      console.log("Fetched notes data:", data); // Log response to check its structure

      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => setModalOpen(false);

  const onEdit = (note) => {
    setCurrentNote(note); // Set the specific note to currentNote
    setModalOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "https://notes-server-v78m.onrender.com/api/note/add",
        { title, description }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (response.data.success) {
        fetchNotes();
        navigate('/home');
        closeModal();
        toast.success("Note added!")
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `https://notes-server-v78m.onrender.com/api/note/${id}`,
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (response.data.success) {
        toast.success("Note deleted!")

        fetchNotes();
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  }


  const editNote = async (id, title, description) => {

    try {
      const response = await axios.put(
        `https://notes-server-v78m.onrender.com/api/note/${id}`,
        { title, description }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (response.data.success) {
        fetchNotes();
        navigate('/home');
        closeModal();
        toast.success("Note edited!")
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery= {setQuery} />
      <div className='px-8 pt-4 grid grid-cols-1 gap-3 md:grid-cols-3'>
        {filteredNote.length > 0 ? filteredNote.map((note) => (
          <NoteCard 
            key={note._id}
            note={note}
            onEdit={onEdit} 
            deleteNote={deleteNote}
          />
        )) : <p>No notes</p>}
      </div>
      <button 
        onClick={() => { setModalOpen(true); setCurrentNote(null); }}
        className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>
        +
      </button>
      {isModalOpen && <NoteModal 
        closeModal={closeModal} 
        addNote={addNote}
        currentNote={currentNote}
        editNote={editNote}
      />}
    </div>
  );
};

export default Home;
