@extends('layout.app')

@section('customCss')
    <link href="{{ asset('css/basic/delivery.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/responsive/deliveryResponsive.css') }}" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="{{ asset('js/helperMethods.js') }}"></script>
@endsection

@section('content')
    @if($order == null)
        <section class="itemTypes">
            <p>V košíku sa nič nenachádza</p>
        </section>
    @else
        <section id="allPaid">
            <p>Všetko zaplatené. Ďakujeme za nákup. :)</p>
        </section>
    @endif
@endsection
