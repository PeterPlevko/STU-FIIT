<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\MessageBag;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index()
    {
        $data["questions"] =  DB::table('questions')->orderBy("date_from", "ASC")->get();
        return view('questions.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('questions.create');
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
            'questionText' => 'required|string',
            'dateFrom' => 'required|date',
            'dateTo' => 'required|date',
        ]);
        if ($request["dateTo"] <= $request["dateFrom"]) {
            $errors= new MessageBag(["Dates not in order!"]);
            return back()->with('errors', $errors);
        }

        $questions = Question::all()
            ->where("date_from", "<=" ,  $request["dateTo"])
            ->where("date_to", ">=" , $request["dateFrom"])->count();
        if ($questions > 0) {
            $errors= new MessageBag(["There already exists a question with in this date!"]);
            return back()->with('errors', $errors);
        }

        $question = new Question();
        $question->question_text = $request["questionText"];
        $question->date_from = $request["dateFrom"];
        $question->date_to = $request["dateTo"];
        $question->save();

        return redirect('questions');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        return back();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        return view('questions.edit',compact('question',$question));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'questionText' => 'required|string',
            'dateFrom' => 'required|date',
            'dateTo' => 'required|date',
        ]);
        if ($request["dateTo"] <= $request["dateFrom"]) {
            $errors= new MessageBag(["Dates not in order!"]);
            return back()->with('errors', $errors);
        }

        $questions = Question::all()
            ->where("date_from", "<=" ,  $request["dateTo"])
            ->where("date_to", ">=" , $request["dateFrom"])
            ->where("id", "!=", $question->id)->count();
        if ($questions > 0) {
            $errors= new MessageBag(["There already exists a question with in this date!"]);
            return back()->with('errors', $errors);
        }

        $question->question_text = $request["questionText"];
        $question->date_from = $request["dateFrom"];
        $question->date_to = $request["dateTo"];
        $question->save();

        return redirect('questions');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        foreach ($question->answers()->get() as $answer) {
            $answer->voting()->delete();
            $answer->delete();
        }
        $question->delete();
        return back();
    }
}
