<?php

use App\Http\Middleware\Administrator;
use App\Http\Middleware\Samearticle;
use App\Http\Middleware\Samequestion;
use App\Http\Middleware\Sameuser;
use App\Http\Middleware\Sameusercomment;
use App\Models\Article;
use App\Models\ArticlesAsset;
use App\Models\Comment;
use App\Models\Question;
use App\Models\QuestionsAsset;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Test
Route::middleware('api')->get('/test', function(){ return now(); });
Route::middleware('api')->post('/token', function (Request $request) { return User::token($request); });
Route::middleware('api')->post('/register', function (Request $request) { return User::register($request); });
Route::middleware('auth:sanctum', 'api')->post('/users', function (Request $request) { return auth()->user()->modify($request); });
Route::middleware('auth:sanctum', 'api')->post('/logout', function (Request $request) { return User::logout($request); });

// Chats
Route::middleware('auth:sanctum', 'api')->get('/chats/', function (){ return User::recentUsers(); });
Route::middleware('auth:sanctum', 'api')->get('/chats/{user}', function (User $user){ return User::userHistory($user); });
Route::middleware('auth:sanctum', 'api')->post('/chats/call-user', 'App\Http\Controllers\VideoChatController@callUser');
Route::middleware('auth:sanctum', 'api')->post('/chats/accept-call', 'App\Http\Controllers\VideoChatController@acceptCall');
Route::middleware('auth:sanctum', 'api')->post('/chats/{user}', function (Request $request, User $user){ return auth()->user()->send($request, $user); });
Route::middleware('auth:sanctum', 'api')->put('/chats/{user}/read', function (User $user){ return User::read($user, auth()->user()); });


// Best practise
Route::middleware('api')->get('/articles', function(){ return Article::index(); });
Route::middleware('api')->get('/articles/{article}', function(Article $article){ return $article->show(); });
Route::middleware('api')->post('/articles/search', function(Request $request){ return Article::search($request); });
Route::middleware('api')->get('/articles/latest/{category}', function($category){ return Article::indexCategory($category); });
Route::middleware('auth:sanctum', 'api', Administrator::class)->post('/articles', function(Request $request){ return Article::store($request); }); // ADMIN
Route::middleware('auth:sanctum', 'api', Administrator::class)->put('/articles/{article}', function(Request $request, Article $article){ return $article->modify($request); }); // ADMIN
Route::middleware('auth:sanctum', 'api', Administrator::class)->delete('/articles/{article}', function(Article $article){ return $article->remove(); }); // ADMIN
// Best practise assets
Route::middleware('api', Samearticle::class)->get('/articles/{article}/assets/{asset}', function(Article $article, ArticlesAsset $asset){ return $asset->data($article); });
Route::middleware('auth:sanctum', 'api', Administrator::class)->post('/articles/{article}/assets', function(Request $request, Article $article){ return $article->add($request); }); // ADMIN
Route::middleware('auth:sanctum', 'api', Administrator::class, Samearticle::class)->delete('/articles/{article}/assets/{asset}', function(Article $article, ArticlesAsset $asset){ return $asset->remove($article); }); // ADMIN

// Forum
Route::middleware('api')->get('/questions', function(){ return Question::index(); });
Route::middleware('api')->get('/questions/latest', function(){ return Question::index4(); });
Route::middleware('api')->post('/questions/search', function(Request $request){ return Question::search($request); });
Route::middleware('api')->get('/questions/{question}', function(Question $question){ return $question->show(); });
Route::middleware('auth:sanctum', 'api')->post('/questions', function(Request $request){ return Question::store($request); });
Route::middleware('auth:sanctum', 'api', Sameuser::class)->put('/questions/{question}', function(Request $request, Question $question){ return $question->modify($request); });
Route::middleware('auth:sanctum', 'api', Sameuser::class)->delete('/questions/{question}', function(Question $question){ return $question->remove(); });
// Comments
Route::middleware('auth:sanctum', 'api')->post('/questions/{question}/comments', function(Request $request, Question $question){ return Comment::store($request, $question); });
Route::middleware('auth:sanctum', 'api', Sameusercomment::class, Samequestion::class)->put('/questions/{question}/comments/{comment}', function(Request $request, Question $question, Comment $comment){ return $comment->modify($request, $question); });
Route::middleware('auth:sanctum', 'api', Sameusercomment::class, Samequestion::class)->delete('/questions/{question}/comments/{comment}', function(Question $question, Comment $comment){ return $comment->remove($question); });
Route::middleware('auth:sanctum', 'api', Sameuser::class, Samequestion::class)->get('/questions/{question}/comments/{comment}/answer', function(Question $question, Comment $comment){ return $question->answer($comment); });
// Forum assets
Route::middleware('api', Samequestion::class)->get('/questions/{question}/assets/{asset}', function(Question $question, QuestionsAsset $asset){ return $asset->data($question); });
Route::middleware('auth:sanctum', 'api', Sameuser::class)->post('/questions/{question}/assets', function(Request $request, Question $question){ return $question->add($request); });
Route::middleware('auth:sanctum', 'api', Sameuser::class, Samequestion::class)->delete('/questions/{question}/assets/{asset}', function(Question $question, QuestionsAsset $asset){ return $asset->remove($question); });
