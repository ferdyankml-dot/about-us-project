<?php
require_once __DIR__ . '/../config.php';

// Simulasi "database" pakai file JSON statis untuk latihan ini
$dataFile = DATA_DIR . '/anggota.json';

if (!file_exists($dataFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'Data tim tidak ditemukan']);
    exit;
}

$rawData = file_get_contents($dataFile);
$team = json_decode($rawData, true);

if ($team === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal membaca data tim']);
    exit;
}

echo json_encode([
    'success' => true,
    'data' => $team,
]);
