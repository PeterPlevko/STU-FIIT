@extends('layout.app')

@section('customCss')
    <link href="{{ asset('css/basic/contact.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/responsive/contactResponsive.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="middle">
        <h1>Kontakt</h1>
        <p>Autori: Matej Delinčák, Peter Plevko</p>
        <p>Email: matej.delincak@gmail.com, pplevko@gmail.com</p>
        <h1>Obchodne podmienky / Reklamacia</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor urna nunc id cursus metus aliquam. Convallis tellus id interdum velit laoreet id donec. Faucibus interdum posuere lorem ipsum dolor. Eget nunc scelerisque viverra mauris in. Ut enim blandit volutpat maecenas volutpat. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. At in tellus integer feugiat scelerisque varius. Nunc sed id semper risus in hendrerit. Senectus et netus et malesuada fames.</p>
    </section>
@endsection
