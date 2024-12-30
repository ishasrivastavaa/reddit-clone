const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const port = 3000;

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const subredditRoutes = require('./routes/subredditRoutes');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/subreddits', subredditRoutes);

app.get('/', (req, res) => {
    res.send("Reddit backend");
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
