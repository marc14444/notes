import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "App";
//import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNoteFound } from "pages/PageNotFound/PageNotFound";
import { NoteBrowse } from "pages/NoteBrowse/NoteBrowse";
import { Note } from "pages/Note/Note";
import { NoteCreate } from "pages/NoteCreate/NoteCreate";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
    <Provider store={store}>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<NoteBrowse />} ></Route>
            <Route path="/note/:noteId" element={<Note />}></Route>
            <Route path="/note/new" element={<NoteCreate />}></Route>
          </Route>
            <Route path="*" element={<PageNoteFound />}></Route>
        </Routes>
     </BrowserRouter>
    </Provider>

);
