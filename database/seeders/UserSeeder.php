<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'sadmin@admin.com',
            'password' => bcrypt('123456789'),
            'phone' => '1234567',
            'status' => '1',
            'avatar' => asset('img/profile/default.jpg'),
        ])->assignRole('super admin');
        
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('123456789'),
            'phone' => '1234567',
            'status' => '1',
            'avatar' => asset('img/profile/admin.jpg'),
        ])->assignRole('admin');

        User::create([
            'name' => 'Agente',
            'email' => 'agente@admin.com',
            'password' => bcrypt('123456789'),
            'phone' => '1234567',
            'status' => '1',
            'avatar' => asset('img/profile/agente.jpg'),
        ])->assignRole('agente');
        
        User::create([
            'name' => 'Editor',
            'email' => 'editor@admin.com',
            'password' => bcrypt('123456789'),
            'phone' => '1234567',
            'status' => '1',
            'avatar' => asset('img/profile/editor.jpg'),
        ])->assignRole('editor');
    
    }
}
