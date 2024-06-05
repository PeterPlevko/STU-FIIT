<?php

namespace Database\Seeders;

use App\Models\BusinessType;
use App\Models\DeliveryType;
use App\Models\PaymentType;
use Illuminate\Database\Seeder;

class BusinessTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BusinessType::create([
            'name' => 'Ocun',
        ]);

        BusinessType::create([
            'name' => 'Singing Rock',
        ]);

        BusinessType::create([
            'name' => 'Simond',
        ]);

        BusinessType::create([
            'name' => 'La Sportiva',
        ]);

    }
}
