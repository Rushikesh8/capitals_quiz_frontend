import React from "react";
import { Routes, Route} from "react-router-dom"
import Quiz from "./pages/quiz";
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <Routes>

    <Route path="/" element={<Quiz />} />
    
    </Routes>
    <Toaster />
    </>
  );

}

export default App;
