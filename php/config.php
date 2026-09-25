<?php
// php/config.php
header('Content-Type: application/json; charset=utf-8');

// Jika API dipanggil dari domain berbeda saat development
// header('Access-Control-Allow-Origin: *');

define('DATA_DIR', __DIR__ . '/../data');
//halo(dito)