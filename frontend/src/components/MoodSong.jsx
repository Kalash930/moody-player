import { useState } from "react";
import moody from '../assets/moody-player.png'


const MoodSong = ({Songs}) => {

  const [isPlaying,setIsPlaying]=useState(null);

  const handlePlayPause=(index)=>{
    if (isPlaying==index){
      setIsPlaying(null);
    }
    else{
      setIsPlaying(index);
    }

  }
 

  return (
    <div className="flex flex-col items-center bg-zinc-950 p-5  rounded-2xl shadow-lg w-full ">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        🎵 Recommended Songs
      </h2>

      {/* Scrollable container */}
      <div className="flex flex-col gap-3 w-full max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800 rounded-xl p-1">
        {Songs.map((song, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-800 p-3 rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-sm"
          >
            <div className="flex justify-center items-center gap-4">
              <img
  src={moody}
  alt={song.title}
  className="w-14 h-14 rounded-lg object-cover shadow-md"
/>
            <div>
              <h3 className="text-lg font-semibold text-white">{song.title}</h3>
              <p className="text-sm text-gray-300">{song.artist}</p>

            </div>
              
            </div>

            <div className="flex gap-2 text-2xl text-zinc-200">

              {
                 isPlaying==index&&
                  <audio src={song.audio} style={{
                    display:"none"
                  }} 
                  autoPlay={isPlaying==index}
                  ></audio>
              }

              <button onClick={()=>handlePlayPause(index)}>
                {
                  isPlaying===index?  <i className="ri-pause-circle-fill cursor-pointer text-3xl hover:text-zinc-400"></i> :   <i className="ri-play-circle-fill cursor-pointer text-3xl hover:text-zinc-400"></i>
                }

              </button>
              
            
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSong;
