<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Samequestion
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $question_id = 0;
        $comment = $request->route('comment');
        $asset = $request->route('asset');
        if($comment != null)
            $question_id = $comment->question_id;
        else if($asset != null)
            $question_id = $asset->question_id;

        if($request->route('question')->id == $question_id){
            return $next($request);
        }

        abort(404, 'Not found in current context');
    }
}
