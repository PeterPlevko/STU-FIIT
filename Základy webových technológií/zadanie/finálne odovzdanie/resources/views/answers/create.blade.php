@extends('layout.questionsLayout')

@section('customCss')
    <link href="{{ asset('css/basic/custom.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="createSection">
        <h1>Nová odpoved</h1>
        <hr>
        <form action="{{url('answers')}}"  method="post">
            @csrf
            <div>
                <label for="answerText">Odpoved</label>
                <input type="text" class="form-control" id="answerText"  name="answerText">
            </div>
            <input type="hidden" value="{{$questionId}}" name="id">
            @if ($errors->any())
                <div>
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <button class="buttonWhite" type="submit">Pridat</button>
        </form>
        <h2>Odpovede: </h2>
        <ul>
            @foreach($answers as $answer)
                <li>{{$answer->answer_text}}</li>
            @endforeach
        </ul>
    </section>
@endsection
