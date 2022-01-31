@extends('layout.app')

@section('customCss')
    <link href="{{ asset('css/basic/login.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/responsive/loginResponsive.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')

    <section class="wholeLogin">
        <div class="halfBlock">
            <img class="climber"
                 srcset="{{ asset('images/login/climber_400.jpg') }} 480w, {{ asset('images/login/climber.jpg') }} 800w"
                 sizes="(max-width: 600px) 480px, 800px"
                 src="{{ asset('images/login/climber.jpg') }}"
                 alt="climber">
        </div>
        <div class="halfBlock">
            <div class="rightBlock">
                <x-auth-session-status class="alert alert-info" :status="session('status')"/>

                <x-auth-validation-errors class="alert alert-info" :errors="$errors"/>

                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <label for="email">Email : </label>
                    <x-input id="email" placeholder="Napíš email" type="email" name="email" :value="old('email')"
                             required autofocus></x-input>

                    <label for="password">Heslo : </label>
                    <x-input id="password" type="password" placeholder="Napíš heslo" name="password" required
                             autocomplete="current-password"></x-input>


                    <div class="checkbox">
                        <label for="remember_me">
                            <input id="remember_me" type="checkbox" name="remember">
                            <span>Zapamätaj si ma</span>
                        </label>
                    </div>

                    <button type="submit" class="buttonBlack">Prihlásenie</button>
                    <div class="centerDiv">
                        <a href="{{ route('register') }}">Registrácia</a>
                    </div>
                </form>
            </div>
        </div>
    </section>
@endsection
