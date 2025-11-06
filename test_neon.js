// File: test_neon.js

// 1. Muat variabel lingkungan dari .env
require('dotenv').config(); 

// 2. Import Client dari library pg
const { Client } = require('pg');

// 3. Gunakan Connection String dari variabel lingkungan
const connectionString = process.env.DATABASE_URL; 

if (!connectionString) {
    console.error("Gagal: Variabel lingkungan DATABASE_URL tidak ditemukan.");
    process.exit(1);
}

// 4. Buat instance Client
const client = new Client({
    connectionString: connectionString,
    ssl: {
        // Neon memerlukan SSL untuk koneksi yang aman
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        console.log("Mencoba menghubungkan ke Neon...");
        await client.connect(); // Mulai koneksi
        console.log("✅ Koneksi berhasil!");

        // Contoh menjalankan kueri
        const res = await client.query('SELECT NOW() as current_time');
        console.log("Waktu server database saat ini:", res.rows[0].current_time);

    } catch (err) {
        console.error("❌ Gagal terhubung atau menjalankan kueri:", err.message);
    } finally {
        await client.end(); // Tutup koneksi
        console.log("Koneksi ditutup.");
    }
}

testConnection();