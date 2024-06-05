@extends('layout.app')
 
@section('content')
<h1>Nová úloha</h1>
<hr>
<form action="/tasks" method="post">
    {{ csrf_field() }}
    <div class="form-group">
        <label for="title">Názov úlohy</label>
        <input type="text" class="form-control" id="taskTitle"  name="title">
    </div>
    <div class="form-group">
        <label for="description">Opis úlohy</label>
        <textarea class="form-control" id="taskDescription" name="description"></textarea>
    </div>
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <button type="submit" class="btn btn-primary">Vytvoriť</button>
</form>
@endsection