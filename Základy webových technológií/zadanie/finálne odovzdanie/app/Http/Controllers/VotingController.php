<?php

namespace App\Http\Controllers;

use App\Models\Voted;
use App\Models\Voting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VotingController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $voted = new Voting();
        $voted->date = now()->toDateTimeString();
        $voted->answer_id = $request["answer_id"];
        $voted->user_id = Auth::id();
        $voted->save();
        return back();
    }
}
