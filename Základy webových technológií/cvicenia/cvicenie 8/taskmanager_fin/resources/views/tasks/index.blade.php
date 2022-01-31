@extends('layout.app')
 
@section('content')
    @if (Session::has('message'))
        <div class="alert alert-info">{{ Session::get('message') }}</div>
    @endif
	<h1>Zoznam úloh</h1>
    <table class="table">
        <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Názov</th>
                <th scope="col">Opis</th>
                <th scope="col">Autor</th>
                <th scope="col">Dátum vytvorenia</th>
                <th scope="col">Akcia</th>
            </tr>
        </thead>
        <tbody>
        @foreach($tasks as $task)
            <tr>
                <th scope="row">{{$task->id}}</th>
                <td><a href="/tasks/{{$task->id}}">{{$task->title}}</a></td>
                <td>{{$task->description}}</td>
                <td>{{$task->author->name}}</td>
                <td>{{$task->created_at->toFormattedDateString()}}</td>
                <td>
                    <div class="btn-group" role="group">
                    @can('update', $task)
                        <a class="btn btn-warning" href="{{ URL::to('tasks/' . $task->id . '/edit') }}">
                            Editovať
                        </a>&nbsp;&nbsp;
                    @endcan
                    @can('delete', $task)
                        <form action="{{url('tasks', [$task->id])}}" method="POST">
                            <input type="hidden" name="_method" value="DELETE">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="submit" class="btn btn-danger" value="Vymazať"/>
                        </form>
                    </div>
                    @endcan
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection