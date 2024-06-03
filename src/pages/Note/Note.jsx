import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import s from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { NoteForm } from 'components/NoteForm/NoteForm';
import { useState } from 'react';
import { NoteAPI } from 'api/note-api';
import { updateNote } from 'store/note/note-slice';
import { deleteNote } from 'store/note/note-slice';
export function Note(props){
    const [isEditable, setIsEditable] =useState(false)
    const {noteId} = useParams()
    const note = useSelector((store)=> store.NOTE.noteList.find((note)=> note.id === noteId));
    const [seachParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
   async function submit(formValues){
        const updatedNote = await NoteAPI.update({...formValues, id:note.id})
        dispatch(updateNote(updatedNote));
        setIsEditable(false);
    }
    function deleteNote_(note){
        if(window.confirm('Are you sure you want to delete')){
            NoteAPI.deleteById(note.id)
            dispatch(deleteNote(note))
            navigate("/")
        }
    }
    return(<>
        {note && <NoteForm 
            isEditable={isEditable} 
            title={isEditable?"Edit note":note.title} 
            note={note} 
            onclickEdit={()=>setIsEditable(!isEditable)} 
            onClickTrash={()=>deleteNote_(note)} 
            onSubmit={isEditable && submit}
        />}
    </>)
}