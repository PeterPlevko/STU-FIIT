<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::with('author')->get();
        return view('tasks.index',compact('tasks',$tasks));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('tasks.create');
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
            'title' => 'required|min:3',
            'description' => 'required',
        ]);

        $userId = Auth::id();
        
        $task = Task::create(['title' => $request->title,'description' => $request->description, 'user_id' => $userId]);
        
        return redirect('/tasks/'.$task->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        $id = $task->id;
        $task = Cache::remember('task-' . $id, 60,
            function () use ($id) {
                return Task::find($id);
            });

        return view('tasks.show', compact('task', $task));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        return view('tasks.edit',compact('task',$task));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'required|min:3',
            'description' => 'required',
        ]);  
             
        $task->title = $request->title;
        $task->description = $request->description;
        $task->save();
        if (Cache::has('task-'.$task->id)) {
            Cache::forget('task-'.$task->id);
        }         
        $request->session()->flash('message', 'Úloha bola úspešne zmenená.');
          
        return redirect('tasks');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Task $task)
    {
        $task->delete();
        if (Cache::has('task-'.$task->id)) {
            Cache::forget('task-'.$task->id);
        }         
        $request->session()->flash('message', 'Úloha bola úspešne vymazaná.');
        return redirect('tasks');
    }
}
