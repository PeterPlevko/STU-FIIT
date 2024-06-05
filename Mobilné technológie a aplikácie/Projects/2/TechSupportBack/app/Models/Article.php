<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function articlesAsset(){
        return $this->hasMany(ArticlesAsset::class)->select('id', 'name', 'type', 'article_id', 'created_at', 'updated_at');
    }

    public function upload(Request $request){
        if($request->hasFile('files')){
            foreach($request->file('files') as $file){
                if($file != null){
                    $asset = new ArticlesAsset();
                    $asset->name = $file->getClientOriginalName();
                    $asset->type = $file->getMimeType();
                    $asset->asset = $file->openFile()->fread($file->getSize());
                    $asset->article_id = $this->id;

                    $asset->save();
                }
            }
        }
    }

    public static function index(){
        return response()->json(
            Article::select('id', 'title', 'category', 'created_at', 'updated_at', 'user_id')->latest()->limit(10)->with('user')->get()
        );
    }

    public static function indexCategory($category){
        return response()->json(
            Article::select('id', 'title', 'category', 'created_at', 'updated_at', 'user_id')->where('category', $category)->latest()->limit(3)->with('user')->get()
        );
    }

    public function show(){
        return response()->json($this->load('articlesAsset', 'user')->toArray());
    }

    public static function store(Request $request){

        $request->validate([
            'text' => ['required', 'string'],
            'title' => ['required', 'string', 'max:250'],
            'category' => ['required', 'string', 'max:250'],
            'files.*' => ['nullable', 'file', 'max:64']
        ]);
        $article = new static();
        $article->text = $request->text;
        $article->title = $request->title;
        $article->category = $request->category;
        $article->user_id = auth()->user()->id;
        $article->save();

        $article->upload($request);

        return response()->json($article->load('articlesAsset', 'user')->toArray());
    }

    public function modify(Request $request){
        $request->validate([
            'text' => ['nullable', 'string'],
            'title' => ['nullable', 'string', 'max:250'],
            'category' => ['nullable', 'string', 'max:250']
        ]);

        if($request->filled('text'))
            $this->text = $request->text;
        if($request->filled('title'))
            $this->title = $request->title;
        if($request->filled('category'))
            $this->category = $request->category;

        $this->save();

        return response()->json($this->load('articlesAsset', 'user')->toArray());
    }

    public function remove(){
        foreach($this->articlesAsset as $asset)
            $asset->remove();

        $this->delete();

        return response()->json();
    }

    public function add(Request $request){
        $request->validate([
            'files.*' => ['nullable', 'file', 'max:64']
        ]);

        $this->upload($request);

        return response()->json($this->load('articlesAsset', 'user')->toArray());
    }

    public static function search(Request $request){
        $request->validate([
            'title' => ['required', 'string', 'max:250']
        ]);
        return response()->json(Article::where('title', 'like', '%' . $request->title . '%')->latest()->with('user')->get());
    }
}
