<?php

namespace App\Models;

use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Question extends Model
{
    use HasFactory;

    public function answerComment(){
        return $this->hasOne(Comment::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function questionsAsset(){
        return $this->hasMany(QuestionsAsset::class)->select('id', 'name', 'type', 'question_id', 'created_at', 'updated_at');
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function upload(Request $request){
        if($request->hasFile('files')){
            foreach($request->file('files') as $file){
                $content = $file->openFile()->fread($file->getSize());

                $asset = new QuestionsAsset();
                $asset->name = $file->getClientOriginalName();
                $asset->type = $file->getMimeType();
                $asset->asset = $content;
                $asset->question_id = $this->id;

                $asset->save();
            }
        }
    }

    public static function index(){
        return response()->json(Question::select('id', 'title', 'created_at', 'updated_at', 'user_id', 'comment_id')->latest()->with('user')->get());
    }

    public static function index4(){
        return response()->json(Question::select('id', 'title', 'created_at', 'updated_at', 'user_id')->with('user')->latest()->limit(4)->get());
    }

    public function show(){
        return response()->json($this->load('questionsAsset', 'user', 'comments', 'answerComment')->toArray());
    }

    public static function store(Request $request){
        $request->validate([
            'text' => ['required', 'string'],
            'title' => ['required', 'string', 'max:250'],
            'files.*' => ['nullable', 'file', 'max:64']
        ]);

        $question = new Question();
        $question->text = $request->text;
        $question->title = $request->title;
        $question->user_id = auth()->user()->id;
        $question->save();

        $question->upload($request);

        return response()->json($question->load('questionsAsset', 'user', 'comments', 'answerComment')->toArray());
    }

    public function modify(Request $request){
        $request->validate([
            'text' => ['nullable', 'string'],
            'title' => ['nullable', 'string', 'max:250']
        ]);

        if($request->filled('text'))
            $this->text = $request->text;
        if($request->filled('title'))
            $this->title = $request->title;

        $this->save();

        return response()->json($this->load('questionsAsset', 'user', 'comments', 'answerComment')->toArray());
    }

    public function answer(Comment $comment){
        $this->comment_id = $comment->id;
        $this->save();

        return response()->json($this->load('questionsAsset', 'user', 'comments', 'answerComment')->toArray());
    }

    public function remove(){
        foreach($this->comments as $comment)
            $comment->remove();

        foreach($this->questionsAsset as $asset)
            $asset->remove();

        $this->delete();

        return response()->json();
    }

    public function add(Request $request){
        $request->validate([
            'files.*' => ['nullable', 'file', 'max:64']
        ]);

        $this->upload($request);

        return response()->json($this->load('questionsAsset', 'user', 'comments', 'answerComment')->toArray());
    }

    public static function search(Request $request){
        $request->validate([
            'order_by' => ['nullable', 'string', Rule::in(['created_at', 'title'])],
            'order_type' => ['nullable', 'string', Rule::in(['asc', 'desc']), Rule::requiredIf($request->has('order_by'))],
            'title' => ['nullable', 'string', 'max:250']
        ]);

        $questions = Question::where('id', '>', 0);
        if($request->has('title'))
            $questions = $questions->where('title', 'like', '%' . $request->title . '%');
        if($request->has('order_by'))
            $questions = $questions->orderBy($request->order_by, $request->order_type);
        else
            $questions = $questions->latest();

        return response()->json($questions->with('user')->get());
    }
}
