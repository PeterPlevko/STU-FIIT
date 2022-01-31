@extends('layout.app')

@section('content')
<h1>Detail úlohy: {{ $task->title }}</h1>
<div class="jumbotron">
	<div class="h5">Názov</div>
    <p>
		{{ $task->title }} 
    </p>
	<div class="h5">Opis</div>
	<p>
		{{ $task->description }}
	</p>
</div>
@endsection