<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('shortDescription');
            $table->text('longDescription');
            $table->unsignedInteger('business_type_id');
            $table->unsignedInteger('category_id');
            $table->float('prize');
            $table->float('discountedPrize')->nullable();
            $table->integer('soldedCount');
            $table->float('rating');
            $table->boolean('top');
            $table->boolean('bestOfWeek');
            $table->json('image');
            $table->boolean('deleted')->default(false);
            $table->timestamps();

            $table->foreign('business_type_id')->references('id')->on('business_types');
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
