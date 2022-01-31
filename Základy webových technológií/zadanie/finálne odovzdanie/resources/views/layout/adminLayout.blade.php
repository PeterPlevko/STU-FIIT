<!doctype html>
<html lang="sk">
<head>
    @include('layout.partials.head')
    @yield('customCss')
</head>

<body>
<main >
    @yield('content')
</main>
<!-- Bootstrap core JavaScript -->
@include('layout.partials.footer-scripts');
@yield('customJs')
</body>
</html>
