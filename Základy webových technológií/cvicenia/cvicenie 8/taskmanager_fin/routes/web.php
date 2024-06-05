<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

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

Route::get('/', [TaskController::class, 'index'])->middleware(['auth']);

Route::get('/tasks', [TaskController::class, 'index'])->middleware(['auth']);
Route::get('/tasks/create', [TaskController::class, 'create'])->middleware(['auth']);
Route::post('/tasks/', [TaskController::class, 'store'])->middleware(['auth']);
Route::get('/tasks/{task}/', [TaskController::class, 'show'])->middleware(['auth']);
Route::get('/tasks/{task}/edit/', [TaskController::class, 'edit'])->middleware(['auth', 'can:update,task']);
Route::put('/tasks/{task}', [TaskController::class, 'update'])->middleware(['auth', 'can:update,task']);
Route::delete('/tasks/{task}/', [TaskController::class, 'destroy'])->middleware(['auth', 'can:delete,task']);

Route::get('locale/{locale}', function ($locale) {
    if (in_array($locale,  config('app.supported_languages'))) {
       session(['app_locale' => $locale]);
    }
    return redirect()->back();
  });  

require __DIR__.'/auth.php';
