@extends('layout.app')

@section('customCss')
    <link href="{{ asset('css/basic/clientRegistration.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/responsive/clientRegistrationResponsive.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="mainForm">
        <x-auth-validation-errors class="alert alert-info" :errors="$errors" />

        <form class="registrationForm"  method="POST" action="{{ route('register') }}">
            @csrf

                <label style="margin-top: 20px;" for="name">Meno a priezvisko: </label>
                <x-input id="name" type="text" name="name" :value="old('name')" required autofocus /><br/>

                <label for="street">Ulica: </label>
                <x-input id="street" type="text" name="street" :value="old('street')" required /><br/>

            <div class="cityPostalDiv">
                <div class="left">
                    <label for="postalCode">PSČ</label>
                    <x-input id="postalCode" type="text" name="postalCode" :value="old('postalCode')" required /><br/>
                </div>

                <div class="right">
                    <label for="city">Mesto</label>
                    <x-input id="city" type="text" name="city" :value="old('city')" required /><br/>
                </div>
            </div><br/>

                <label for="email">Emailová adresa</label>
                <x-input id="email" type="email" name="email" :value="old('email')" required /><br/>


                <label for="passWord">Heslo</label>
                <x-input id="password" type="password" name="password" required autocomplete="new-password" /><br/>



                <label for="password_confirmation">Zopakovať heslo</label>

                <x-input id="password_confirmation" type="password" name="password_confirmation" required /><br/>


                <a href="{{ route('login') }}">
                    Už ste zaregistrovaný?
                </a><br/>

                <input class="buttonBlack" type="submit" value="Registrovať">

        </form>
        </section>
@endsection
