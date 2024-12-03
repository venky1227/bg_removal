// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import userRouter from './routes/userRoutes.js';  // Assuming you have this file
// import connectDB from './configs/mongodb.js';  // Assuming you have a MongoDB connection config
// import path from 'path';  // Importing path module for path manipulation
// import { fileURLToPath } from 'url';  // For converting import.meta.url to file path
// import { dirname } from 'path';  // To get directory name

// // App Config
// const PORT = process.env.PORT || 4000;
// const app = express();

// // Initialize MongoDB connection
// await connectDB();

// // Get the directory name in ES module context
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename); // Now we have __dirname equivalent in ES modules

// // Middleware to set CSP headers
// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self'; " +
//     "script-src 'self' https://vercel.live 'unsafe-inline' 'unsafe-eval'; " +
//     "style-src 'self' 'unsafe-inline'; " +
//     "img-src 'self' data: blob:; " +
//     "font-src 'self'; " +
//     "object-src 'none'; " +
//     "base-uri 'self'; " +
//     "form-action 'self'; " +
//     "frame-ancestors 'none'; " +
//     "block-all-mixed-content; " +
//     "upgrade-insecure-requests;"
//   );
//   next();
// });

// // Middleware
// app.use(express.json());  // Parse incoming JSON data
// app.use(cors());  // Allow Cross-Origin Requests

// // API Routes
// app.use('/api/user', userRouter);
// // app.use('/api/image', imageRouter);  // Uncomment if you have this route

// // Serve static files from React's build directory (if you have a React frontend)
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Catch-all handler to serve React's index.html for non-API routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// // Root endpoint to check if the API is working
// app.get('/', (req, res) => res.send("API Working"));

// // Start the server
// app.listen(PORT, () => console.log('Server running on port ' + PORT));







import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
// import imageRouter from './routes/imageRoutes.js';


// App Config
const PORT = process.env.PORT || 4000
const app = express();
await connectDB()

// Intialize Middlewares
app.use(express.json())
app.use(cors())

// API routes
app.use('/api/user',userRouter)
// app.use('/api/image',imageRouter)

app.get('/', (req,res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));


