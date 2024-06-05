<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Samearticle
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
        if($request->route('article')->id == $request->route('asset')->article_id){
            return $next($request);
        }

        abort(404, 'Not found in current context');
    }
}
