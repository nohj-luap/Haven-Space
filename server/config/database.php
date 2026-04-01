<?php
// Haven Space Database Configuration

return [
    'host' => $_ENV['DB_HOST'] ?? '127.0.0.1',
    'database' => $_ENV['DB_NAME'] ?? 'havenspace_db',
    'username' => $_ENV['DB_USER'] ?? 'root', // Default XAMPP username
    'password' => $_ENV['DB_PASS'] ?? '',     // Default XAMPP password (empty)
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ],
];
