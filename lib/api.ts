export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function api(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      msg = typeof data === "string" ? data : JSON.stringify(data);
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const auth = {
  register: (payload: any) => api("/api/auth/register/", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: any) => api("/api/auth/login/", { method: "POST", body: JSON.stringify(payload) }),
  logout: (refresh: string) => api("/api/auth/logout/", { method: "POST", body: JSON.stringify({ refresh }) }),
};

export const wallet = { overview: () => api("/api/wallet/") };

export const transactions = {
  list: () => api("/api/transactions/"),
  byRef: (ref: string) => api(`/api/transactions/${ref}/`),
  transfer: (payload: any) => api("/api/transfers/", { method: "POST", body: JSON.stringify(payload) }),
};

export const requests = {
  list: () => api("/api/payment-requests/"),
  create: (payload: any) => api("/api/payment-requests/", { method: "POST", body: JSON.stringify(payload) }),
  pay: (ref: string) => api(`/api/payment-requests/${ref}/pay/`, { method: "POST", body: JSON.stringify({}) }),
};

export const users = { lookup: (q: string) => api(`/api/users/lookup/?q=${encodeURIComponent(q)}`) };

export const reports = { create: (payload: any) => api("/api/reports/", { method: "POST", body: JSON.stringify(payload) }) };
