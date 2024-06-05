<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use App\Models\Voted;
use App\Models\Voting;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data["question"] = Question::all()->find($request["id"]);
        $data["answers"] = $data["question"]->answers()->get();
        foreach ($data["answers"] as $answer) {
            $data["counts"][$answer->id] = Voting::all()->where('answer_id', '=',$answer->id)->count();
        }
        return view('answers.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data["answers"] = Question::all()->find($request["id"])->answers()->get();
        $data["questionId"] = $request["id"];
        return view('answers.create', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'answerText' => 'required|string'
        ]);

        $answer = new Answer();
        $answer->answer_text = $request["answerText"];
        $answer->question_id = $request["id"];
        $answer->save();

        return back();
    }
}
