<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'name' => 'Lezečky La Sportiva',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 4,
            'category_id' => 1,
            'prize' => 59.99,
            'discountedPrize' => 49.99,
            'soldedCount' => 10,
            'rating' => 4.9,
            'top' => true,
            'bestOfWeek' => true,
            'image' => ['Lezecka/lezecka1'],
        ]);

        Product::create([
            'name' => 'Lezečky Simond',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 3,
            'category_id' => 1,
            'prize' => 99.99,
            'discountedPrize' => null,
            'soldedCount' => 5,
            'rating' => 4.5,
            'top' => true,
            'bestOfWeek' => false,
            'image' => ['Lezecka/lezecka2'],
        ]);

        Product::create([
            'name' => 'Lezečky La Sportiva Žlté',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 4,
            'category_id' => 1,
            'prize' => 79.99,
            'discountedPrize' => null,
            'soldedCount' => 1,
            'rating' => 4.7,
            'top' => true,
            'bestOfWeek' => false,
            'image' => ['Lezecka/lezecka3'],
        ]);

        Product::create([
            'name' => 'Lezečky La Sportiva Modre',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 4,
            'category_id' => 1,
            'prize' => 49.99,
            'discountedPrize' => null,
            'soldedCount' => 3,
            'rating' => 4.1,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Lezecka/lezecka4'],
        ]);

        Product::create([
            'name' => 'Lezečky La Sportiva Mythos',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 4,
            'category_id' => 1,
            'prize' => 119.99,
            'discountedPrize' => null,
            'soldedCount' => 50,
            'rating' => 4.7,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Lezecka/lezecka5'],
        ]);

        Product::create([
            'name' => 'Lezecký set Ocún Climbing Twist',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 1,
            'category_id' => 3,
            'prize' => 71.99,
            'discountedPrize' => 70.99,
            'soldedCount' => 10,
            'rating' => 4.9,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Set/set1'],
        ]);

        Product::create([
            'name' => 'Lezecký set Camp Simond set',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 3,
            'category_id' => 3,
            'prize' => 51.99,
            'discountedPrize' => 30.99,
            'soldedCount' => 10,
            'rating' => 3.5,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Set/set2'],
        ]);

        Product::create([
            'name' => 'Singing Rock Lady Packet',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 2,
            'category_id' => 3,
            'prize' => 51.99,
            'discountedPrize' => null,
            'soldedCount' => 30,
            'rating' => 3.1,
            'top' => true,
            'bestOfWeek' => false,
            'image' => ['Set/set3'],
        ]);

        Product::create([
            'name' => 'Lano Singing Rock Static 11 mm',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 2,
            'category_id' => 5,
            'prize' => 48.99,
            'discountedPrize' => null,
            'soldedCount' => 30,
            'rating' => 3.5,
            'top' => true,
            'bestOfWeek' => false,
            'image' => ['Lano/lano1'],
        ]);

        Product::create([
            'name' => 'Lano Singing Rock Static 10.5 mm',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 2,
            'category_id' => 5,
            'prize' => 38.99,
            'discountedPrize' => null,
            'soldedCount' => 5,
            'rating' => 4.0,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Lano/lano2'],
        ]);

        Product::create([
            'name' => 'Lano Ocun Beal Contract 10.5',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 1,
            'category_id' => 5,
            'prize' => 48.99,
            'discountedPrize' => null,
            'soldedCount' => 30,
            'rating' => 3.9,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Lano/lano3'],
        ]);

        Product::create([
            'name' => 'Prilba La Sportiva - Petzl',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 4,
            'category_id' => 4,
            'prize' => 18.99,
            'discountedPrize' => null,
            'soldedCount' => 40,
            'rating' => 4.9,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Vybava/helma1'],
        ]);

        Product::create([
            'name' => 'Singing Rock D Steel Lock Screw',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 2,
            'category_id' => 4,
            'prize' => 8.99,
            'discountedPrize' => null,
            'soldedCount' => 15,
            'rating' => 4.9,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Vybava/karabina1'],
        ]);

        Product::create([
            'name' => 'Singing Rock Rig - Black',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 2,
            'category_id' => 4,
            'prize' => 17.99,
            'discountedPrize' => null,
            'soldedCount' => 10,
            'rating' => 4.1,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Vybava/karabina2'],
        ]);

        Product::create([
            'name' => 'Singing Rock Franklin',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 2,
            'category_id' => 6,
            'prize' => 17.99,
            'discountedPrize' => null,
            'soldedCount' => 10,
            'rating' => 4.1,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Ostatne/sedacka1'],
        ]);

        Product::create([
            'name' => 'Singing Rock Dry Duffle 40 l',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 2,
            'category_id' => 6,
            'prize' => 57.99,
            'discountedPrize' => null,
            'soldedCount' => 40,
            'rating' => 4.3,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Ostatne/vak1'],
        ]);

        Product::create([
            'name' => 'Kurz istenia (Top rope)',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 1,
            'category_id' => 2,
            'prize' => 27.99,
            'discountedPrize' => null,
            'soldedCount' => 40,
            'rating' => 4.3,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Kurz/kurz1'],
        ]);

        Product::create([
            'name' => 'Kurz istenia (Leading)',
            'shortDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            'longDescription' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. At consectetur lorem donec massa sapien faucibus et. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque viverra justo nec ultrices dui sapien eget mi proin.',
            'business_type_id' => 1,
            'category_id' => 2,
            'prize' => 29.99,
            'discountedPrize' => null,
            'soldedCount' => 40,
            'rating' => 4.3,
            'top' => false,
            'bestOfWeek' => false,
            'image' => ['Kurz/kurz2'],
        ]);



    }
}
