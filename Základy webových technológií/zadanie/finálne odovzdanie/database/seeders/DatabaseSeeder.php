<?php

namespace Database\Seeders;

use App\Models\BusinessType;
use App\Models\Category;
use App\Models\DeliveryType;
use App\Models\PaymentType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        (new BusinessTypeSeeder())->run();
        (new CategorySeeder())->run();
        (new ProductSeeder)->run();
        (new DeliveryTypeSeeder())->run();
        (new PaymentTypeSeeder())->run();
        (new UserSeeder())->run();

    }
}
