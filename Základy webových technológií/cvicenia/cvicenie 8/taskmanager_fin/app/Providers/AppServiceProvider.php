<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Policies\TaskPolicy;
use App\Task;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        'App\Task' => 'App\Policies\TaskPolicy',
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {   
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
