@extends('layout.questionsLayout')

@section('customCss')
    <link href="{{ asset('css/basic/custom.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="createSection">
        <h1>Nová otázka</h1>
        <hr>
        <form action="{{route('questions.store')}}" method="post">
            @csrf
            <div>
                <label for="questionText">Otazka</label>
                <input type="text" class="form-control" id="questionText"  name="questionText">
            </div>
            <div>
                <label for="dateFrom">Platnost od</label>
                <input type="date" class="form-control" id="dateFrom"  name="dateFrom">
            </div>
            <div>
                <label for="dateTo">Platnost do</label>
                <input type="date" class="form-control" id="dateTo"  name="dateTo">
            </div>
            @if ($errors->any())
                <div>
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <button class="buttonWhite" type="submit">Vytvoriť</button>
        </form>
    </section>
@endsection
