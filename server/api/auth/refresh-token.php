<?php

require_once __DIR__ . '/../cors.php';
require_once __DIR__ . '/../../src/Core/bootstrap.php';

header('Content-Type: application/json');

use App\Core\Auth\JWT;

$refreshToken = $_COOKIE['refresh_token'] ?? '';

if (empty($refreshToken)) {
    http_response_code(401);
    echo json_encode(['error' => 'No refresh token provided']);
    exit;
}

$payload = JWT::validate($refreshToken);

if (!$payload) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid or expired refresh token']);
    exit;
}

$config = require __DIR__ . '/../../config/app.php';

// Generate new access token
$newAccessToken = JWT::generate($payload, $config['jwt_expiration']);

// Set new access token cookie
setcookie('access_token', $newAccessToken, [
    'expires' => time() + $config['jwt_expiration'],
    'path' => '/',
    'domain' => '',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);

echo json_encode([
    'success' => true,
    'message' => 'Token refreshed successfully'
]);
