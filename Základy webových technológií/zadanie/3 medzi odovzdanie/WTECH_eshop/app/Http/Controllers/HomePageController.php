<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class HomePageController extends Controller
{
    public function index()
    {
        $bestOfWeek = Product::where('bestOfWeek','=',true)->get();
        if (count($bestOfWeek) > 0)
            $bestOfWeek = $bestOfWeek[0];
        else
            $bestOfWeek = null;
        $recommendProducts = Product::where('top','=',true)->get();
        return view('homePage', compact('bestOfWeek', 'recommendProducts'))->with('imagePath', Config::get('app.productImage'));
    }
}
