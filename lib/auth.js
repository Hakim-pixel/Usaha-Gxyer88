// Role admin yang diizinkan
export const ADMIN_EMAIL = "admin@gxyer88.com";
export const ADMIN_PASSWORD = "admin123";

// Simpan session admin
export function loginAdmin(email) {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin-session", email);
  }
}

// Ambil session
export function getAdmin() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin-session");
}

// Logout admin
export function logoutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin-session");
  }
}
