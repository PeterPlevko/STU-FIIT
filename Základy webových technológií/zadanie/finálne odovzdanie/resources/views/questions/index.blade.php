@extends('layout.questionsLayout')

@section('customCss')
    <link href="{{ asset('css/basic/custom.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="indexTable">
        <table >
            <thead >
            <tr>
                <th>Otazka ankety</th>
                <th>Dátum platnosti od</th>
                <th>Dátum platnosti do</th>
                <th>Akcia</th>
            </tr>
            </thead>
            <tbody>
            @foreach($questions as $question)
                <tr>
                    <td>{{$question->question_text}}</td>
                    <td>{{$question->date_from}}</td>
                    <td>{{$question->date_to}}</td>
                    <td>
                        <div class="buttonGroup" role="group">
                            <form action="{{route('answers.index')}}" method="GET">
                                <input type="hidden" value="{{$question->id}}" name="id">
                                <button class="buttonYellow" type="submit">Vysledky</button>
                            </form>
                            <a class="buttonYellow" href="{{ route('questions.edit', [$question->id])}}">
                                Editovať
                            </a>&nbsp;&nbsp;
                            <form action="{{route('questions.destroy', [$question->id])}}" method="POST">
                                @method('DELETE')
                                @csrf
                                <input type="submit" class="buttonRed" value="Vymazať"/>
                            </form>
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </section>
@endsection
