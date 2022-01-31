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
        <section id="mainPart">
            <form action="{{ route('shoppingCartPayment.store')}}" method="post">
                @method('post')
                @csrf
                <fieldset class="typeOfPayment">
                    <legend>Zvoliť typ platby:</legend>
                    @for($i = 0; $i < count($paymentTypes); $i++)
                        <div class="@if($order->paymentType != null and $order->paymentType->id == $paymentTypes[$i]->id)option-hover @else option @endif" id="option{{$i}}">
                            <input type="radio" name="paymentType" id="delivery_{{$i}}" value="{{$paymentTypes[$i]->id}}"  @if($order->paymentType != null and $order->paymentType->id == $paymentTypes[$i]->id)checked="{{true}}" @endif required>
                            <div class="spacing">
                                <label for="delivery_{{$i}}">{{$paymentTypes[$i]->name}}</label>
                                <label for="delivery_{{$i}}" style="font-weight: bold">{{$paymentTypes[$i]->prize}}€</label>
                            </div>
                        </div>
                    @endfor
                </fieldset>
                <fieldset class="functionalPart">
                    <div class="rightPart">
                        <input class="buttonWhite floatButton" id="paymentBtn" type="submit" value="Platba"/>
                        <a class="buttonWhite floatButtonLeft" href="/shoppingCartDelivery">Späť</a>
                        <h2 class="prize">{{$order->totalSumWithDelivery()}} €</h2>

                    </div>

                </fieldset>
            </form>
        </section>
    @endif
@endsection
