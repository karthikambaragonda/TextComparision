import express from 'express';
import multer from 'multer';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Multer Setup
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.get('/', (req, res) => res.render('index'));

app.post('/compare', upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => {
    const file1 = req.files['file1'][0].path;
    const file2 = req.files['file2'][0].path;

    exec(`python3 python/compare.py ${file1} ${file2}`, (error, stdout) => {
        if (error) return res.status(500).send('Python Error: ' + error.message);
        res.render('result', { similarity: stdout.trim() });
    });
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
