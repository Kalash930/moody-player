import React from "react";
import FaceDetector from "./components/FaceDetector";
import MoodSong from "./components/MoodSong";
import { useState } from "react";

function App() {

    const [Songs, setSongs] = useState([

    ]);
  


  return (
   <div className="min-h-screen bg-black  p-5">
    <div className="flex justify-center items-center mb-5">
      <h1 className="text-3xl text-white font-extrabold mb-5 tracking-wide drop-shadow-lg">🎧 Moody Player</h1>
    </div>
    <div className="flex gap-20 ">
          <FaceDetector className="w-1/2" setSongs={setSongs} />
          <MoodSong Songs={Songs} />
    </div>

   </div>
  );
}

export default App;
