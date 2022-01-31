<?php

namespace Database\Seeders;

use App\Models\BusinessType;
use App\Models\Category;
use App\Models\DeliveryType;
use App\Models\PaymentType;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Lezecka',
        ]);

        Category::create([
            'name' => 'Kurz',
        ]);

        Category::create([
            'name' => 'Set',
        ]);

        Category::create([
            'name' => 'Vybava',
        ]);

        Category::create([
            'name' => 'Lano',
        ]);

        Category::create([
            'name' => 'Ostatne',
        ]);
    }
}
