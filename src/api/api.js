// export const API_BASE = "http://localhost:5000"; 

export const API_BASE="https://tinylink-pp16.onrender.com"

export async function createLink(data) {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
}

export async function getLinks() {
  return fetch(`${API_BASE}/api/links`).then((res) => res.json());
}

export async function getStats(code) {
  return fetch(`${API_BASE}/api/links/${code}`).then((res) => res.json());
}

export async function deleteLink(code) {
  return fetch(`${API_BASE}/api/links/${code}`, { method: "DELETE" });
}
