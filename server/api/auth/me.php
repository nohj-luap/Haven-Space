<?php

require_once __DIR__ . '/../cors.php';
require_once __DIR__ . '/../../src/Core/bootstrap.php';

header('Content-Type: application/json');

use App\Core\Auth\JWT;

$token = $_COOKIE['access_token'] ?? '';

if (empty($token)) {
    http_response_code(401);
    echo json_encode(['error' => 'No token provided']);
    exit;
}

$payload = JWT::validate($token);

if (!$payload) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid or expired token']);
    exit;
}

echo json_encode([
    'success' => true,
    'user' => $payload
]);
