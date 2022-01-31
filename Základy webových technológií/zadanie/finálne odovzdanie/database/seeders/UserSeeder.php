<?php

namespace Database\Seeders;

use App\Models\CustomerInfo;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //heslo adminadmin
        $admin = User::create([
            'email' => 'admin@admin.com',
            'admin' => true,
            'password' => '$2y$10$IZGRB1/pZar4QeTmd5UacOiLLIkSQL4lOPKaMj6n7bkEOJQgPXl4S'
        ]);

        CustomerInfo::create([
            'name' => 'Admin',
            'user_id' => $admin->id,
            'street' => '',
            'postalCode' => '',
            'city' => '',
            'phone' => '',
            'email' => 'admin@admin.com',
        ]);
    }
}
