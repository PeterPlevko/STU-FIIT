<?php

namespace App\Http\Controllers;


use App\Models\Product;
use App\Models\Question;
use App\Models\Voting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class HomePageController extends Controller
{
    public function index()
    {
        $data["question"] = Question::with('answers')
            ->has('answers', '>=', 2)
            ->where('date_from', '<=', now()->toDayDateTimeString())
            ->where('date_to', '>=', now()->toDayDateTimeString())
            ->orderBy('date_from')->first();

        if ($data["question"] && Auth::user()) {
            $data["voting"] = Voting::all()
                ->where('user_id', '=', Auth::id())
                ->whereIn('answer_id', $data["question"]->answers()->pluck('id')->toArray())
                ->all();
        }
        $data["bestOfWeek"] = Product::where('bestOfWeek', true)->first();
        $data["recommendProducts"] = Product::where('top', true)->get();
        $data["imagePath"] = Config::get('app.productImage');
        return view('homePage', $data);
    }
}
