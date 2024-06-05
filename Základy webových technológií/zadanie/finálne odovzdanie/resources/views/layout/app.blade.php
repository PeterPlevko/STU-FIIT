<!doctype html>
<html lang="sk">
<head>
    @include('layout.partials.head')
    @yield('customCss')
</head>

<body>
@include('layout.partials.header')
<main >
    @yield('content')
</main>
@include('layout.partials.footer')
<!-- Bootstrap core JavaScript -->
@include('layout.partials.footer-scripts');
@yield('customJs')
</body>
</html>
