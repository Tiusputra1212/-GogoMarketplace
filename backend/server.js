const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs'); 

const app = express();
const PORT = 5000; 
const dbConfig = {
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'gogo' 
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.post('/api/product', upload.single('cover'), async (req, res) => {
    
    const { penjual, judul, deskripsi, harga, hp, bp } = req.body;
    const coverPath = req.file ? req.file.filename : null; 
    if (!penjual || !judul || !deskripsi || !harga || !hp || !bp || !coverPath) {
        if (req.file) {
            try { fs.unlinkSync(req.file.path); } catch (e) { console.error("Gagal menghapus file:", e); }
        }
        return res.status(400).json({ message: 'Semua kolom wajib diisi, termasuk foto cover.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        
        const [result] = await connection.execute(
            'INSERT INTO product (penjual, judul, deskripsi, harga, hp, bp, cover) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [penjual, judul, deskripsi, harga, hp, bp, coverPath] 
        );
        
        connection.end();
        res.status(201).json({ 
            message: 'Produk berhasil didaftarkan!', 
            productId: result.insertId,
            cover: coverPath
        });

    } catch (error) {
        console.error('Error saat pendaftaran produk:', error);
        if (req.file) {
            try { fs.unlinkSync(req.file.path); } catch (e) { console.error("Gagal menghapus file:", e); }
        }

        res.status(500).json({ message: 'Gagal mendaftarkan produk karena kesalahan server.' });
    }
});
app.get('/api/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT id, penjual, judul, deskripsi, harga, hp, bp, cover FROM product'
        );
        
        connection.end();
        res.json(rows); 

    } catch (error) {
        console.error('Error saat mengambil produk:', error);
        res.status(500).json({ message: 'Gagal memuat daftar produk dari server.' });
    }
});
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    const role = 'pemesan'; 
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Semua kolom wajib diisi.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.execute(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role] 
        );
        connection.end();
        res.status(201).json({ message: 'Pendaftaran berhasil!', userId: result.insertId, username: username });
    } catch (error) {
        console.error('Error saat pendaftaran:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Username atau Email sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal mendaftarkan pengguna karena kesalahan server.' });
    }
});
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT id, username, password, role FROM users WHERE username = ?', 
            [username]
        );
        const user = rows[0];

        if (!user) {
            connection.end();
            return res.status(401).json({ message: 'Username atau password salah.' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password); 

        if (!isMatch) {
            connection.end();
            return res.status(401).json({ message: 'Username atau password salah.' });
        }

        connection.end();
        res.json({ message: 'Login berhasil', username: user.username, role: user.role }); 

    } catch (error) {
        console.error('Error saat login:', error);
        res.status(500).json({ message: 'Server gagal memproses login.' });
    }
});
app.listen(PORT, async () => {
    try {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
            console.log(`Folder 'uploads' berhasil dibuat.`);
        }

        await mysql.createConnection(dbConfig); 
        console.log(`✅ Koneksi SQL berhasil.`);
        console.log(`✅ Server Backend berjalan di http://localhost:${PORT}`);
    } catch (error) {
        console.error('GAGAL Koneksi SQL atau Error Server.');
        console.error(error.message);
    }
});