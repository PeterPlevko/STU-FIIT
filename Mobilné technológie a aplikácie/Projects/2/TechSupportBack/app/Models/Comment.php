<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Comment extends Model
{
    use HasFactory;

    protected $with = ['user'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function comment(){
        return $this->belongsTo(Comment::class);
    }

    public function replies(){
        return $this->hasMany(Comment::class);
    }

    public static function store(Request $request, Question $question){
        $request->validate([
            'text' => ['required', 'string'],
            'reply' => ['nullable', 'exists:comments,id']
        ]);

        $comment = new static();
        $comment->text = $request->text;
        $comment->user_id = auth()->user()->id;
        $comment->question_id = $question->id;
        if($request->has('reply') && Comment::find($request->reply)->first()->question_id == $question->id)
            $comment->comment_id = $request->reply;
        $comment->save();

        return response()->json($question->load('questionsAsset', 'user', 'comments', 'answerComment')->toArray());
    }

    public function modify(Request $request, Question $question){
        $request->validate([
            'text' => ['nullable', 'string']
        ]);

        if($request->has('text'))
            $this->text = $request->text;
        $this->save();

        return response()->json($question->load('questionsAsset', 'user', 'comments', 'answerComment')->toArray());
    }

    public function remove(Question $question = null){
        if($this->question->comment_id != null){
            $question_2 = Question::find($this->question->id);
            $question_2->comment_id = null;
            $question_2->save();
        }

        foreach($this->replies as $comment){
            $comment->comment_id = null;
            $comment->save();
        }

        $this->delete();

        if($question != null)
            return response()->json($question->load('questionsAsset', 'user', 'comments', 'answerComment')->toArray());
        else
            return;
    }
}
