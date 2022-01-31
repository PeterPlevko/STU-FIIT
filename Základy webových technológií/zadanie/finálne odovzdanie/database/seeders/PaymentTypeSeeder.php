<?php

namespace Database\Seeders;

use App\Models\DeliveryType;
use App\Models\PaymentType;
use Illuminate\Database\Seeder;

class PaymentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PaymentType::create([
            'name' => 'Visa',
            'prize' => 0,
        ]);

        PaymentType::create([
            'name' => 'Dobierka',
            'prize' => 1.1,
        ]);
    }
}
