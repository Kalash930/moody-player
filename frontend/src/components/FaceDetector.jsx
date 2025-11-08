import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios'

export default function FaceDetector({setSongs}) {
  const videoRef = useRef();
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState('');

  // Load models and start camera
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setLoading(false);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error('Error accessing webcam:', err));
    };

    loadModels().then(startVideo);
  }, []);

  // Detect mood when button is clicked
  const detectExpression = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;

      const dominantExpression = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      setMood(dominantExpression);

       axios.get(`http://localhost:3000/songs?mood=${dominantExpression}`)
    .then((response)=>{
      console.log(response.data);
      setSongs(response.data.songs)
      
    })
    } else {
      setMood('No face detected 😶');
    }
   
  };

  // Fetch songs by mood
  const fetchSongsByMood = async (moodType) => {
    try {
      const response = await axios.get(`http://localhost:3000/songs?mood=${moodType}`);
      setSongs(response.data.songs);
      console.log('Fetched songs for:', moodType, response.data);
    } catch (err) {
      console.error('Error fetching songs:', err);
    }
  };

  // Handle dropdown mood selection
  const handleMoodSelect = (e) => {
    const moodValue = e.target.value;
    setSelectedMood(moodValue);
    if (moodValue) {
      setMood(moodValue);
      fetchSongsByMood(moodValue);
    }
  };


  return (
  <div className="flex flex-col items-start gap-3 ml-10 w-[85%] ">
  {/* Video Section */}
  <video
    ref={videoRef}
    autoPlay
    muted
    className="w-90 aspect-video object-cover rounded-xl border border-white/20 shadow-lg"
  />

  <h2 className='text-white font-bold text-3xl'>Live Mood detection</h2>
  <p className='text-zinc-400 text-xl'>Your current mood is analyzing in real-time. <br /> Enjoy music according to your mood
  </p>

  <div className='flex gap-20 justify-center items-center'>

    
  {/* Detect Button */}
  <button
    onClick={detectExpression}
    className="px-4 py-2 text-sm md:text-base font-semibold text-white bg-pink-500 rounded-lg shadow-md 
               hover:bg-pink-600 active:scale-95 transition-all duration-200 w-auto"
  >
    Detect Mood 🎭
  </button>

  <p className='text-white text-xl font-bold'>Or</p>

        {/* Manual Mood Selection */}
      <select
        value={selectedMood}
        onChange={handleMoodSelect}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg mt-2 border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="">🎶 Select Mood Manually</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😢 Sad</option>
        <option value="angry">😡 Angry</option>
        <option value="surprised">😲 Surprised</option>
        <option value="neutral">😐 Neutral</option>
        <option value="fearful">😨 Fearful</option>
        <option value="disgusted">🤢 Disgusted</option>
      </select>



  </div>

  {/* Mood Display */}
  {mood && (
    <div className="text-sm text-white">
      {mood === "happy" && "😊 You look Happy!"}
      {mood === "sad" && "😢 Feeling a bit Sad?"}
      {mood === "angry" && "😡 Calm down, it’s okay!"}
      {mood === "surprised" && "😲 Wow! Surprised much?"}
      {mood === "neutral" && "😐 Pretty Neutral right now."}
      {mood === "fearful" && "😨 Don’t worry, you’re safe here!"}
      {mood === "disgusted" && "🤢 Hmm… something smells off?"}
      {mood === "No face detected 😶" && "🚫 No face detected! Try again."}
    </div>
  )}
</div>

  );
}
