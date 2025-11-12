require('dotenv').config(); 
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL; 

if (!connectionString) {
    console.error("Gagal: Variabel lingkungan DATABASE_URL tidak ditemukan.");
    process.exit(1);
}
const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        console.log("Mencoba menghubungkan ke Neon...");
        await client.connect(); 
        console.log("✅ Koneksi berhasil!");

        const res = await client.query('SELECT NOW() as current_time');
        console.log("Waktu server database saat ini:", res.rows[0].current_time);

    } catch (err) {
        console.error("❌ Gagal terhubung atau menjalankan kueri:", err.message);
    } finally {
        await client.end(); 
        console.log("Koneksi ditutup.");
    }
}

testConnection();