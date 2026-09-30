const CACHE_KEY = 'team-data-cache-v2';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 menit

async function fetchTeamData() {
  const cached = getFromCache();
  if (cached) return cached;

  try {
    const res = await fetch('php/api/team.php');
    if (!res.ok) throw new Error('Gagal mengambil data tim');
    const json = await res.json();
    saveToCache(json.data);
    return json.data;
  } catch (err) {
    console.error('fetchTeamData error:', err);
    return []; // fallback aman: kembalikan array kosong, jangan crash halaman
  }
}

function getFromCache() {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;
  const { data, timestamp } = JSON.parse(raw);
  if (!data || !Array.isArray(data.anggota)) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
  if (Date.now() - timestamp > CACHE_TTL_MS) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
  return data;
}

function saveToCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
}

export { fetchTeamData };
