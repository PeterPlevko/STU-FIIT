<?php

namespace Database\Seeders;

use App\Models\DeliveryType;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DeliveryTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DeliveryType::create([
            'name' => 'Kuriér na adresu',
            'duration' => '1-2 dni',
            'prize' => 3.9,
        ]);

        DeliveryType::create([
            'name' => 'Dobierka',
            'duration' => '3-4 dni',
            'prize' => 1.9,
        ]);
    }
}
