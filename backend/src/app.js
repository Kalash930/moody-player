const express=require('express')

const songRoutes=require('./routes/song.route')
const cors=require('cors')

const app=express();
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://moody-player-theta-seven.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/',songRoutes)

module.exports=app