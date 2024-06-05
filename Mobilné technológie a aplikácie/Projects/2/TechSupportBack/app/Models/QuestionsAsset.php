<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionsAsset extends Model
{
    use HasFactory;

    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function data(Question $question){
        return response($this->asset, 200, ['Content-Type' => $this->type]);
    }

    public function remove(Question $question){
        $this->delete();

        return response()->json();
    }
}
