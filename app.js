import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname } from 'path'; // Import dirname
import { getData, sendScore,login } from './connect.js';

const __filename = fileURLToPath(import.meta.url); // Get current filename
const __dirname = dirname(__filename); // Get current directory name

const app = express();

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

app.get('/', async (req, res) => {
    try {
        const data = await getData();
        res.json(data); // Send data as JSON
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    console.log("Hello")
    const { username, password } = req.body 
    try {
        const result = await login(username, password)
        console.log(result)
        if (result.length===0){
            return res.status(404).send({ message: "Invalid Credentials!" })
        }   
        return res.status(200).send(result)
    }
    catch (err) {
        return res.status(401).send('Invalid Username or Password')
    }
})

app.post("/scores", async (req, res) => {
    try {
        const { username,score } = req.body;
        const result = await sendScore(username,score);
        if (result.affectedRows === 1) {
            res.status(200).send('Successfully added the score');
            //res.status(200).sendFile("hello.html", { root: __dirname }); // Adjust the file path
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.error("Error sending score:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
