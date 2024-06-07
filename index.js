const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const multer = require('multer'); // Add multer for handling file uploads
const path = require('path');

app.use(express.static('Main'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  collegeName: String, // University/College Name
  collegeType: String, // Type of College
  city: String, // City where the college is located
  state: String, // State where the college is located
  pinCode: Number,
});

const User = mongoose.model('User', userSchema, 'user1');
///////////////////////////////////////////////////////////////////////////////
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technology: String,
  genre: String,
  category: String,
  organization: String,
  files: [String], // Array of file paths
});

const Project = mongoose.model('Project', projectSchema);
/////////////////////////////////////////////////////////////////////////////
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads'); // Destination folder for uploaded files
  },
  
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    callback(null, Date.now() + ext);
    // callback(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/sign_up', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = new User({ name, email, password });
    await user.save();
    res.redirect('/stuindex.html');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/YOUR_LOGIN_ROUTE', async (req, res) => {
  try {
    const { loginEmail, loginPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: loginEmail });

    console.log('Email:', loginEmail);
    console.log('Password:', loginPassword);
    console.log('User:', user);
    if (loginEmail==user.email && loginPassword==user.password){
      res.redirect('/stuindex.html');
    }
    else{
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/store_university', async (req, res) => {
  try {
    // Extract university details from the request body
    const { collegeName, collegeType,email,password, city, state, pinCode } = req.body;
    console.log('Received request to store university data:', req.body);

    // Create a new instance of the User model with university details
    const university = new User({
       collegeName,
       email, // You can use the "email" field to store the college type
       password,
       collegeType,
       city,
       state,
       pinCode     // You can use the "password" field to store the city
      // You can add more fields as needed to store state, pin code, etc.
    });

    // Save the university details to the "user1" collection
    await university.save();
    res.redirect('/uniindex.html'); // Redirect to a success page
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})
///////////////////////////////////////////////////////////////////////////////
app.post('/upload_project', upload.array('files', 5), async (req, res) => {
  try {
    const {
      title,
      description,
      technology,
      genre,
      category,
      organization,
    } = req.body;
    
    // Get file paths from uploaded files
    const filePaths = req.files.map((file) => file.path);

    // Create a new project instance
    const project = new Project({
      title,
      description,
      technology,
      genre,
      category,
      organization,
      files: filePaths,
    });
 
    // Save the project details to the "projects" collection
    await project.save();
    
    res.status(200).json({ message: 'Project uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/YOUR_LOGIN_ROUTE1', async (req, res) => {
  try {
    const { loginEmail, loginPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: loginEmail });
    console.log('Request Email:', loginEmail);
    console.log('Request Password:', loginPassword);
    console.log('User:', user);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

    if (loginEmail==user.email && loginPassword==user.password) {
      // Password is valid, redirect to "uniindex.html"
      res.redirect('/uniindex.html');
    } else {
      // Password is invalid
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});