@extends('layout.app')

@section('customCss')
    <link href="{{ asset('css/basic/mainPage.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/responsive/mainPageResponsive.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="menu">
        <div class="row align-items-center">
            <div class="grid col-lg-4 col-sm-6">
                <div class="gridItem">
                    <h2>Lezečky</h2>
                    <form method="get" action="{{ route('products.index')}}">
                        <input type="hidden" style="display: none" name="category_1" value="1">
                        <button class="menuButton" type="submit">
                            <img class="menuPicture"
                                 src="{{ asset('images/mainPage/lezecky.jpg') }}"
                                 alt="Lezec.sk"
                                 width="140" height="140">
                        </button>
                    </form>
                </div>
            </div>
            <div class="grid col-lg-4 col-sm-6">
                <div class="gridItem">
                    <h2>Kurzy</h2>
                    <form method="get" action="{{ route('products.index')}}">
                        <input type="hidden" style="display: none" name="category_2" value="2">
                        <button class="menuButton" type="submit">
                            <img class="menuPicture"
                                 src="{{ asset('images/mainPage/kurz.jpg') }}"
                                 alt="Lezec.sk"
                                 width="140" height="140">
                        </button>
                    </form>
                </div>
            </div>
            <div class="grid col-lg-4 col-sm-6">
                <div class="gridItem">
                    <h2>Výbava</h2>
                    <form method="get" action="{{ route('products.index')}}">
                        <input type="hidden" style="display: none" name="category_4" value="4">
                        <button class="menuButton" type="submit">
                            <img class="menuPicture"
                                 src="{{ asset('images/mainPage/vybava.jpg') }}"
                                 alt="Lezec.sk"
                                 width="140" height="140">
                        </button>
                    </form>
                </div>
            </div>
            <div class="grid col-lg-4 col-sm-6">
                <div class="gridItem">
                    <h2>Laná</h2>
                    <form method="get" action="{{ route('products.index')}}">
                        <input type="hidden" style="display: none" name="category_5" value="5">
                        <button class="menuButton" type="submit">
                            <img class="menuPicture"
                                 src="{{ asset('images/mainPage/lano.jpg') }}"
                                 alt="Lezec.sk"
                                 width="140" height="140">
                        </button>
                    </form>
                </div>
            </div>
            <div class="grid col-lg-4 col-sm-6">
                <div class="gridItem">
                    <h2>Sety</h2>
                    <form method="get" action="{{ route('products.index')}}">
                        <input type="hidden" style="display: none" name="category_3" value="3">
                        <button class="menuButton" type="submit">
                            <img class="menuPicture"
                                 src="{{ asset('images/mainPage/set.jpg') }}"
                                 alt="Lezec.sk"
                                 width="140" height="140">
                        </button>
                    </form>
                </div>
            </div>
            <div class="grid col-lg-4 col-sm-6">
                <div class="gridItem">
                    <h2>Ostatné</h2>
                    <form method="get" action="{{ route('products.index')}}">
                        <input type="hidden" style="display: none" name="category_6" value="6">
                        <button class="menuButton" type="submit">
                            <img class="menuPicture"
                                 src="{{ asset('images/mainPage/vrecko.jpg') }}"
                                 alt="Lezec.sk"
                                 width="140" height="140">
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    @if ($bestOfWeek != null)
        <section id="bestOfWeek" class="bestOfWeek">
            <div class="leftPart">
                <h1>HIT TÝŽDŇA</h1>
                <a href="/products/{{$bestOfWeek->id}}">
                    <img class="bestOfWeekImg" srcset="{{ asset($imagePath . $bestOfWeek->image[0].'_200.jpg') }} 480w,
                     {{ asset($imagePath . $bestOfWeek->image[0].'_300.jpg') }} 800w"
                         sizes="(max-width: 600px) 480px, 800px"
                         src="{{ asset($imagePath . $bestOfWeek->image[0].'.jpg') }}"
                         alt="Hit týždňa"
                         width="350" height="350">
                </a>
                <p class="floatedDiscount">Zľava 50%</p>
            </div>
            <div class="rightPart">
                <h2>{{$bestOfWeek->name}}</h2>
                <p id="infoAboutBest">{{$bestOfWeek->shortDescription}}</p>
                <div class="buyPart">
                    <div class="pricePart">
                        <h2>{{$bestOfWeek->discountedPrize}}</h2>
                        <h2 class="crossedPrice">{{$bestOfWeek->prize}}</h2>
                    </div>
                    <form action="{{ route('shoppingCart.update',$bestOfWeek->id) }}" method="post">
                        @method('put')
                        @csrf
                        <input id="hidden" name="quantity" style="display: none" type="number" value="1"/>
                        <input type="submit" class="floatRight buttonWhite" value="Pridať do košíka"/>
                    </form>
                </div>
            </div>
        </section>
    @endif

    <section class="recommendations">
        <h1>Odporúčame</h1>
        <div class="slider">
            @foreach($recommendProducts as $product)
                <div>
                    <div class="sliderElement">
                        <div class="sliderInnerElement">
                            <a href="/products/{{$product->id}}">
                                <img srcset="{{ asset($imagePath . $product->image[0].'_200.jpg') }} 480w,
                                 {{ asset($imagePath . $product->image[0].'_300.jpg') }} 800w"
                                     sizes="(max-width: 600px) 480px, 800px"
                                     src="{{ asset($imagePath . $product->image[0].'.jpg') }}"
                                     alt="Odporucame"
                                     width="200" height="200">
                            </a>
                            <p>{{$product->name}}</p>
                            <p>{{$product->prize}} €</p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        </br>
    </section>
    <section class="newsletter">
        <h1>Odber noviniek</h1>
        <form action="/" method="post" class="newsletterForm">
            <label for="email">E-mail: </label>
            <input id="email" type="text" name="email">
            <input class="buttonWhite" type="submit" value="Odošli">
        </form>
    </section>
@endsection
