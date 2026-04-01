<?php
// Haven Space Application Configuration

return [
    'app_name' => 'Haven Space',
    'jwt_secret' => $_ENV['JWT_SECRET'] ?? getenv('JWT_SECRET') ?? 'your_jwt_secret_key_here',
    'jwt_expiration' => 3600, // 1 hour for access token
    'refresh_token_expiration' => 604800, // 7 days for refresh token
    'api_prefix' => '/api',
];
