import NotesList from './components/NotesList';
import './components/index.css';
import { useState } from 'react';
import {nanoid} from 'nanoid';
import Search from './components/Search';
import Header from './components/Header';
import { useEffect } from 'react';

const App = () => {
    const[notes,setNotes]=useState([             //notes is passed to NoteList through props
        {
        id:nanoid(),
        text:"my first note!",
        date:'12/04/2022',
    },
    {
        id:nanoid(),
        text:"my second note!",
        date:'12/04/2022',
    },
    {
        id:nanoid(),
        text:"my third note!",
        date:'12/04/2022',
    },
    {
        id:nanoid(),
        text:"my fourth note!",
        date:'12/04/2022',
    }
]);

const [searchText, setSearchText] = useState('');

const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
    const savedNotes = JSON.parse(
        localStorage.getItem('notes-app-data')
    );

    if (savedNotes) {
        setNotes(savedNotes);
    }
}, []);


useEffect(() => {
    localStorage.setItem(
        'notes-app-data',
        JSON.stringify(notes)
    );
}, [notes]);


  const addNote=(text) => {
    const date = new Date();
    const newNote = {
        id: nanoid(),
        text: text,
        date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
};
const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
};
    return (
        <div className={`${darkMode && 'dark-mode'}`}>
        <div className='container'>
            <Header handleToggleDarkMode={setDarkMode} />
            <Search handleSearchNote={setSearchText}/>
            <NotesList notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}  
            handleAddNote={addNote}  
            handleDeleteNote={deleteNote}
            />  
        </div>
        </div>
    );
};

export default App;
