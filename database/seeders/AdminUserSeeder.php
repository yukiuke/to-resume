<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Create or update the root admin user from YOSHI_ADMIN_NAME and YOSHI_ADMIN_PASS.
     */
    public function run(): void
    {
        $email = env('YOSHI_ADMIN_NAME');
        $password = env('YOSHI_ADMIN_PASS');

        if (empty($email) || empty($password)) {
            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $email,
                'password' => Hash::make($password),
            ]
        );
    }
}
