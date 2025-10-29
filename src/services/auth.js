/* Simple auth service using localStorage as "database" */

async function sha256Hex(message) {
	// browser crypto API
	const enc = new TextEncoder();
	const data = enc.encode(message);
	const hash = await crypto.subtle.digest('SHA-256', data);
	const arr = Array.from(new Uint8Array(hash));
	return arr.map(b => b.toString(16).padStart(2, '0')).join('');
}

function loadUsers() {
	const raw = localStorage.getItem('gogo_users');
	return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
	localStorage.setItem('gogo_users', JSON.stringify(users));
}

/* EXPORT: registerUser */
export async function registerUser({ username, name, email, password, nomorWa }) {
	if (!email || !password || !name) throw new Error('Nama, email, dan password wajib diisi.');
	const users = loadUsers();
	const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase() || (username && u.username === username));
	if (exists) throw new Error('User dengan email atau username ini sudah terdaftar.');
	const passwordHash = await sha256Hex(password);
	const user = {
		id: Date.now(),
		username: username ?? null,
		name,
		email: email.toLowerCase(),
		nomorWa: nomorWa ?? null,
		passwordHash,
		createdAt: new Date().toISOString(),
	};
	users.push(user);
	saveUsers(users);
	// safe user object (no passwordHash)
	const safeUser = { id: user.id, username: user.username, name: user.name, email: user.email, nomorWa: user.nomorWa, createdAt: user.createdAt };
	localStorage.setItem('gogo_current_user', JSON.stringify(safeUser));
	return safeUser;
}

/* EXPORT: loginUser */
export async function loginUser(email, password) {
	if (!email || !password) throw new Error('Email dan password wajib diisi.');
	const users = loadUsers();
	const passwordHash = await sha256Hex(password);
	const user = users.find(u => u.email === email.toLowerCase() && u.passwordHash === passwordHash);
	if (!user) throw new Error('Email atau password salah.');
	const safeUser = { id: user.id, username: user.username, name: user.name, email: user.email, nomorWa: user.nomorWa, createdAt: user.createdAt };
	localStorage.setItem('gogo_current_user', JSON.stringify(safeUser));
	return safeUser;
}

/* EXPORT: getCurrentUser */
export function getCurrentUser() {
	const raw = localStorage.getItem('gogo_current_user');
	return raw ? JSON.parse(raw) : null;
}

/* EXPORT: logout */
export function logout() {
	localStorage.removeItem('gogo_current_user');
}