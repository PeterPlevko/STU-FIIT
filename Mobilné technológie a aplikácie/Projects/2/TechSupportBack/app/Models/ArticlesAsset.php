<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticlesAsset extends Model
{
    use HasFactory;

    public function article(){
        return $this->belongsTo(Article::class);
    }

    public function remove(Article $article = null){
        $this->delete();

        if($article != null)
            return response()->json($article->load('articlesAsset', 'user')->toArray());
        else
            return response()->json();
    }

    public function data(Article $article){
        return response($this->asset, 200, ['Content-Type' => $this->type]);
    }
}
