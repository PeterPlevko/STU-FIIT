@extends('layout.app')

@section('customCss')
    <link href="{{ asset('css/basic/products.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/responsive/productsResponsive.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('content')
    <section class="searchOptions">
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Top
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <form method="get" action="{{ route('products.index')}}">
                    <button class="dropdown-item" type="submit" name="top" value="ASC">Top prvé</button>
                    <button class="dropdown-item" type="submit" name="top" value="DESC">Top posledné</button>
                </form>
            </div>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Najpredávanejšie
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <form method="get" action="{{ route('products.index')}}">
                    <button class="dropdown-item" type="submit" name="soldedCount" value="DESC">Najpredávanejšie prvé
                    </button>
                    <button class="dropdown-item" type="submit" name="soldedCount" value="ASC">Najpredávanejšie
                        posledné
                    </button>
                </form>
            </div>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Cena
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <form method="get" action="{{ route('products.index')}}">
                    <button class="dropdown-item" type="submit" name="prize" value="DESC">Najdrahšie</button>
                    <button class="dropdown-item" type="submit" name="prize" value="ASC">Najlacnejšie</button>
                </form>
            </div>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Top podľa recenzií
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <form method="get" action="{{ route('products.index')}}">
                    <button class="dropdown-item" type="submit" name="rating" value="DESC">Top podľa recenzií prvé
                    </button>
                    <button class="dropdown-item" type="submit" name="rating" value="ASC">Top podľa recenzií posledné
                    </button>
                </form>
            </div>
        </div>
    </section>
    <section class="filtering">
        <form method="get" action="{{ route('products.index')}}" class="formFiltering row align-items-center">
            <fieldset class="grid col-lg-3 col-sm-6">
                <legend>Cena od</legend>
                <div>
                    <label for="prizeRangeFrom"
                           id="prizeRangeFromLbl">@if($request->prizeRangeFrom){{$request->prizeRangeFrom}} @else
                            0  @endif €</label>
                    <input type="range" class="form-range" min="0" max="400" step="1" id="prizeRangeFrom"
                           name="prizeRangeFrom"
                           value="@if($request->prizeRangeFrom){{$request->prizeRangeFrom}}@else{{0}}@endif">
                </div>

                <legend>Cena do</legend>
                <div>
                    <label for="prizeRangeTo"
                           id="prizeRangeToLbl">@if($request->prizeRangeTo){{$request->prizeRangeTo}} @else
                            400  @endif €</label>
                    <input type="range" class="form-range" min="0" max="400" step="1" id="prizeRangeTo"
                           name="prizeRangeTo"
                           value="@if($request->prizeRangeTo){{$request->prizeRangeTo}}@else{{400}}@endif">
                </div>
            </fieldset>
            <fieldset class="grid col-lg-3 col-sm-6">
                <legend>Značka</legend>
                <div class="row align-items-center">
                    @foreach($businessTypeList as $businessType)
                        <div class="grid col-6">
                            <input type="checkbox" id="businessType_{{$businessType->id}}"
                                   name="businessType_{{$businessType->id}}" value="{{$businessType->id}}"
                                   @if($request['businessType_'.$businessType->id]) checked @endif>
                            <label for="businessType_{{$businessType->id}}">{{$businessType->name}}</label>
                        </div>
                    @endforeach
                </div>
            </fieldset>
            <fieldset class="grid col-lg-3 col-sm-6">
                <legend>Druh</legend>
                <div class="row align-items-center">
                    @foreach($categoryList as $category)
                        <div class="grid col-6">
                            <input type="checkbox" id="category_{{$category->id}}" name="category_{{$category->id}}"
                                   value="{{$category->id}}" value="{{$businessType->id}}"
                                   @if($request['category_'.$category->id]) checked @endif>
                            <label for="category_{{$category->id}}">{{$category->name}}</label>
                        </div>
                    @endforeach
                </div>
            </fieldset>
            <fieldset class="lastPart grid col-lg-3 col-sm-6">
                <div>
                    <input type="submit" class="buttonWhite" value="Filtruj">
                </div>
            </fieldset>
        </form>
    </section>
    <section class="allProducts">
        @if(count($productsList) != 0)
            <div class="row align-items-center">
                @foreach($productsList as $product)
                    <article class="grid col-lg-4 col-sm-6">
                        <div class="gridItem">
                            <h1>{{$product->name}}</h1>
                            <a href="/products/{{$product->id}}">
                                <img srcset="{{ asset($imagePath . $images[$product->id] .'_200.jpg') }} 480w,
                             {{ asset($imagePath . $images[$product->id] .'_300.jpg') }} 800w"
                                     sizes="(max-width: 600px) 480px, 800px"
                                     src="{{ asset($imagePath . $images[$product->id] .'.jpg') }}"
                                     alt="{{$product->name}}"
                                     width="280">
                            </a>


                            @if($product->discountedPrize)
                                <div class="prizes">
                                    <h2 class="prize">{{$product->discountedPrize}}</h2>
                                    <h2 class="crossedPrice">{{$product->prize}}</h2>
                                </div>
                            @else
                                <div class="prizes">
                                    <h2 class="prize">{{$product->prize}} €</h2>
                                </div>
                            @endif

                            <form action="{{ route('shoppingCart.update',$product->id) }}" method="post" class="alignMiddle">
                                @method('put')
                                @csrf
                                <label for="amount">Počet kusov:</label>
                                <input id="amount" class="quantityInput" name="quantity" type="number" min="1"
                                       value="1"/>
                                <input type="submit" class="buttonWhite" value="Pridať do košíka"/>
                            </form>
                        </div>
                    </article>
                @endforeach
            </div>
        @else
            <p class="center">Bohužiaľ takéto produkty nemáme.</p>
        @endif
    </section>
    @if(count($productsList) != 0)
        <section class="padding">
            @if ($productsList->hasPages())
                {{ $productsList->appends(request()->query())->links() }}
            @else
                <p>Všetky výsledky zobrazené</p>
            @endif
        </section>
    @endif
@endsection

@section('customJs')
    <script>
        randomBackground();
        document.getElementById('prizeRangeTo').addEventListener('mousemove', function () {
            document.getElementById('prizeRangeToLbl').innerHTML = document.getElementById('prizeRangeTo').value + ' €';
        });
        document.getElementById('prizeRangeFrom').addEventListener('mousemove', function () {
            console.log('kkt');
            document.getElementById('prizeRangeFromLbl').innerHTML = document.getElementById('prizeRangeFrom').value + ' €';
        });
    </script>
@endsection
