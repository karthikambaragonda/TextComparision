import express from 'express';
import multer from 'multer';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse urlencoded form data (for text inputs)
app.use(express.urlencoded({ extended: true }));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Multer Setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// ✅ Ensure both `similarity` and `error` are passed
app.get('/', (req, res) => res.render('index', { similarity: null, error: null }));

app.post('/compare', upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => {
    const { text1, text2 } = req.body;

    const handleError = (message) => {
        res.render('index', { similarity: null, error: message });
    };

    if (text1 && text2) {
        const filePath1 = path.join(__dirname, 'uploads', 'input1.txt');
        const filePath2 = path.join(__dirname, 'uploads', 'input2.txt');

        fs.writeFileSync(filePath1, text1, 'utf-8');
        fs.writeFileSync(filePath2, text2, 'utf-8');

        exec(`python "python/compare.py" "${filePath1}" "${filePath2}"`, (error, stdout) => {
            if (error) return handleError('Error processing texts: Please check your inputs and try again.');
            res.render('index', { similarity: stdout.trim(), error: null });
        });

    } else if (req.files['file1'] && req.files['file2']) {
        const file1 = req.files['file1'][0].path;
        const file2 = req.files['file2'][0].path;

        exec(`python "python/compare.py" "${file1}" "${file2}"`, (error, stdout) => {
            if (error) return handleError('Error processing files: Please ensure the files are valid text files.');
            res.render('index', { similarity: stdout.trim(), error: null });
        });

    } else {
        handleError('Please upload two files or enter two texts for comparison.');
    }
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
