<!doctype html>
<html lang="sk">
<head>
    @include('layout.partials.head')
    @yield('customCss')
</head>

<body>
<header class="newHeader">
    <a class="buttonWhite" href="{{route('questions.index')}}">Zoznam otázok</a>
    <a class="buttonWhite" href="/">Hlavná stránka</a>
    <a class="buttonWhite" href="{{route('questions.create')}}">Pridat otázku</a>
</header>
<main >
    @yield('content')
</main>
<!-- Bootstrap core JavaScript -->
@include('layout.partials.footer-scripts');
</body>
</html>
