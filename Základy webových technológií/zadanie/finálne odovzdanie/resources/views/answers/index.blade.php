@extends('layout.questionsLayout')

@section('customCss')
    <link href="{{ asset('css/basic/custom.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="indexTable">
        <h1>Otazka: {{$question->question_text}}</h1>
        <table >
            <thead >
            <tr>
                <th scope="col">Odpoved</th>
                <th scope="col">Pocet</th>
            </tr>
            </thead>
            <tbody>
            @foreach($answers as $answer)
                <tr>
                    <th>{{$answer->answer_text}}</th>
                    <th>{{$counts[$answer->id]}}</th>
                </tr>
            @endforeach
            </tbody>
        </table>
    </section>
@endsection
