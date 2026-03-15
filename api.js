// ─── API Service ─────────────────────────────────────────────────────────────
// Abstrai todas as chamadas ao backend.
// Se a API estiver indisponível, o app opera em modo offline (localStorage).

const API_URL = window.MEUGIN_API_URL || '';

function getUserId() {
  return localStorage.getItem('meugin_user_id');
}

function setUserId(id) {
  localStorage.setItem('meugin_user_id', id);
}

async function apiFetch(path, options = {}) {
  const userId = getUserId();
  const headers = {
    'Content-Type': 'application/json',
    ...(userId ? { 'X-User-ID': userId } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

const Api = {
  // Cria usuário se não existir e persiste o ID
  async ensureUser() {
    if (getUserId()) return getUserId();
    const { userId } = await apiFetch('/users', { method: 'POST' });
    setUserId(userId);
    return userId;
  },

  async getShots(date) {
    return apiFetch(`/shots?date=${date}`);
  },

  async registerShot(type) {
    return apiFetch('/shots', {
      method: 'POST',
      body: JSON.stringify({ type }),
    });
  },

  async deleteShot(id) {
    return apiFetch(`/shots/${id}`, { method: 'DELETE' });
  },

  async getSettings() {
    return apiFetch('/settings');
  },

  async saveSettings(settings) {
    return apiFetch('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

export default Api;
