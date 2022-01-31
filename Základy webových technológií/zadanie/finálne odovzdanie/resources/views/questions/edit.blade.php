@extends('layout.questionsLayout')

@section('customCss')
    <link href="{{ asset('css/basic/custom.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="createSection">
        <h1>Editácia ankety</h1>
        <form action="{{route('answers.create')}}" method="GET">
            <input type="hidden" value="{{$question->id}}" name="id">
            <button class="buttonWhite" type="submit">Pridať možné odpovede</button>
        </form>
        <hr>
        <form action="{{route('questions.update', [$question->id])}}" method="POST">
            @method('PUT')
            @csrf
            <div>
                <label for="questionText">Text otazky</label>
                <input type="text" class="form-control" id="questionText" value="{{$question->question_text}}"  name="questionText">
            </div>
            <div>
                <label for="dateFrom">Platnost od</label>
                <input type="date" class="form-control" id="dateFrom"  value="{{$question->date_from}}" name="dateFrom">
            </div>
            <div>
                <label for="dateTo">Platnost do</label>
                <input type="date" class="form-control" id="dateTo"  value="{{$question->date_to}}" name="dateTo">
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
            <button type="submit" class="buttonWhite">Uložiť</button>
        </form>
    </section>
@endsection
