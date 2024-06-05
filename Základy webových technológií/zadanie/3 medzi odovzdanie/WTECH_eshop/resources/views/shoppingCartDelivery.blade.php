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
        <section>
            @auth
                <div class="dataFromProfile">
                    <button id="profile" class="buttonWhite floatButton">Vyplň údaje z profilu</button>
                </div>
            @endauth
            <form action="{{ route('shoppingCartDelivery.store')}}" method="post">
                @method('post')
                @csrf
                <fieldset class="typeOfDelivery">
                    <legend>Zvoliť typ dopravy:</legend>
                    @for($i = 0; $i < count($deliveryTypes); $i++)
                        <div class="@if($order->deliveryType != null and $order->deliveryType->id == $deliveryTypes[$i]->id)option-hover @else option @endif" id="option{{$i}}">
                            <input type="radio" name="deliveryType" id="delivery_{{$i}}" @if($order->deliveryType != null and $order->deliveryType->id == $deliveryTypes[$i]->id)checked="{{true}}" @endif
                                   value="{{$deliveryTypes[$i]->id}}" required>
                            <div class="spacing">
                                <label for="delivery_{{$i}}">{{$deliveryTypes[$i]->name}}</label>
                                <label for="delivery_{{$i}}" style="font-weight: bold">{{$deliveryTypes[$i]->prize}}
                                    €</label>
                                <label for="delivery_{{$i}}">{{$deliveryTypes[$i]->duration}}</label>
                            </div>
                        </div>
                    @endfor
                </fieldset>
                <fieldset class="infoAboutDelivery row">
                    <legend>Dodacie údaje:</legend>
                    <div>
                        <label for="name">Meno a priezvisko<abbr title="required">*</abbr></label><br>
                        <input type="text" id="name" name="name"
                               value="@if($order->customerInfo != null){{$order->customerInfo->name}}@endif" required><br>
                    </div>

                    <div>
                        <label for="street">Ulica a číslo domu <abbr title="required">*</abbr></label><br>
                        <input type="text" id="street" name="street"
                               value="@if($order->customerInfo != null){{$order->customerInfo->street}}@endif" required><br>
                    </div>

                    <div>
                        <label for="postalCode">PSČ <abbr title="required">*</abbr></label><br>
                        <input class="postalInput" type="text" id="postalCode" name="postalCode"
                               value="@if($order->customerInfo != null){{$order->customerInfo->postalCode}}@endif" required><br>
                    </div>

                    <div>
                        <label for="city">Mesto <abbr title="required">*</abbr></label><br>
                        <input class="cityInput" type="text" id="city" name="city"
                               value="@if($order->customerInfo != null){{$order->customerInfo->city}}@endif" required><br>
                    </div>

                    <div>
                        <label for="email">Emailová adresa <abbr title="required">*</abbr></label><br>
                        <input type="email" id="email" name="email"
                               value="@if($order->customerInfo != null){{$order->customerInfo->email}}@endif" required><br>
                    </div>

                    <div>
                        <label for="phone">Telefónne číslo <abbr title="required">*</abbr></label><br>
                        <input type="text" id="phone" name="phone"
                               value="@if($order->customerInfo != null){{$order->customerInfo->phone}}@endif" required><br>
                    </div>
                </fieldset>

                <fieldset class="functionalPart">
                    <input class="buttonWhite floatButton" type="submit" value="Pokračovať"/>

                    <a class="buttonWhite floatButtonLeft" href="/shoppingCart">Späť</a>
                </fieldset>
            </form>
        </section>
        <script>
            document.getElementById('profile').onclick = function () {
                document.getElementById('name').value = '@if($user){{$user->customerInfo->name}}@endif';
                document.getElementById('street').value = '@if($user){{$user->customerInfo->street}}@endif';
                document.getElementById('postalCode').value = '@if($user){{$user->customerInfo->postalCode}}@endif';
                document.getElementById('city').value = '@if($user){{$user->customerInfo->city}}@endif';
                document.getElementById('phone').value = '@if($user){{$user->customerInfo->phone}}@endif';
                document.getElementById('email').value = '@if($user){{$user->customerInfo->email}}@endif';
            }
            @for($i = 0; $i < count($deliveryTypes); $i++)
            document.getElementById('delivery_{{$i}}').onclick = function () {
                document.getElementById('option{{$i}}').classList.replace("option", "option-hover");
                @for($j = 0; $j < count($deliveryTypes); $j++)
                @if($i != $j)
                document.getElementById('option{{$j}}').classList.replace("option-hover", "option");
                @endif
                @endfor
            };
            @endfor
        </script>
    @endif
@endsection
