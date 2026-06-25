const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const app = require('../app');
const pool = require('../config/db');

let server;
let createdUserId;

async function request(path, options = {}) {
  const baseUrl = `http://127.0.0.1:${server.address().port}${path}`;
  const response = await fetch(baseUrl, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const text = await response.text();
  let body = text;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  return { response, body };
}

test.before(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  server = app.listen(0);
  await once(server, 'listening');
});

test.after(async () => {
  await pool.query("DELETE FROM users WHERE email LIKE 'test-user-%'");
  server.close();
});

test('creates, reads, updates and deletes a user', async () => {
  const createResult = await request('/api/users', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test User', email: 'test-user@example.com' }),
  });

  assert.equal(createResult.response.status, 201);
  assert.equal(createResult.body.name, 'Test User');
  createdUserId = createResult.body.id;

  const listResult = await request('/api/users');
  assert.equal(listResult.response.status, 200);
  assert.ok(Array.isArray(listResult.body));

  const getResult = await request(`/api/users/${createdUserId}`);
  assert.equal(getResult.response.status, 200);
  assert.equal(getResult.body.email, 'test-user@example.com');

  const updateResult = await request(`/api/users/${createdUserId}`, {
    method: 'PUT',
    body: JSON.stringify({ name: 'Updated User' }),
  });
  assert.equal(updateResult.response.status, 200);
  assert.equal(updateResult.body.name, 'Updated User');

  const deleteResult = await request(`/api/users/${createdUserId}`, { method: 'DELETE' });
  assert.equal(deleteResult.response.status, 200);
  assert.equal(deleteResult.body.message, 'User deleted');

  const missingResult = await request(`/api/users/${createdUserId}`);
  assert.equal(missingResult.response.status, 404);
});
