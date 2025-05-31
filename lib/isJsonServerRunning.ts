export async function isJsonServerRunning() {
  try {
    const res = await fetch("http://localhost:8080/api/server-status");
    return res.ok;
  } catch {
    return false;
  }
}
