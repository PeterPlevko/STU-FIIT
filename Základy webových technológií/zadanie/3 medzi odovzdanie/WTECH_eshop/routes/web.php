<?php

use App\Http\Controllers\ImageUploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Homepage Route
Route::get('/', 'App\Http\Controllers\HomePageController@index');

Route::get('/contact', 'App\Http\Controllers\ContactController@index');

Route::get('/shopNetwork', 'App\Http\Controllers\ShopNetworkController@index');

Route::resource('/shoppingCart', 'App\Http\Controllers\ShoppingCartController');

Route::resource('/shoppingCartDelivery', 'App\Http\Controllers\ShoppingCartDeliveryController');

Route::resource('/shoppingCartPayment', 'App\Http\Controllers\ShoppingCartPaymentController');

Route::resource('/products', 'App\Http\Controllers\ProductController')->middleware('deleteFilters');

Route::get('/admin', 'App\Http\Controllers\AdminController@index');

require __DIR__.'/auth.php';
