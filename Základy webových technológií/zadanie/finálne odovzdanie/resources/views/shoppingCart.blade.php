@extends('layout.app')

@section('customCss')
    <link href="{{ asset('css/basic/shoppingCard.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/responsive/shoppingCardResponsive.css') }}" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="{{ asset('js/helperMethods.js') }}"></script>
@endsection

@section('content')
    @if($order == null)
        <section class="itemTypes">
            <p class="middle">V košíku sa nič nenachádza</p>
        </section>
    @else
        @foreach($order->productGroups as $productGroup)
            <section class="itemTypes">
                <div class="leftPart">
                    <div class="imagePart">
                        <a href="/products/{{$productGroup->product->id}}">
                            <img src="{{ asset($imagePath . $productGroup->product->image[0] . ".jpg") }}" alt="Obrazok produktu">
                        </a>
                    </div>
                    <div class="textPart">
                        <h2>{{$productGroup->product->name}}</h2>
                        <p>{{$productGroup->product->shortDescription}}</p>
                    </div>
                </div>
                <div class="rightPart">
                    <div class="functionalPart">
                        <form action="{{ route('shoppingCart.update',$productGroup->product->id) }}" method="post">
                            @method('put')
                            @csrf
                            <label class="moveDown textForAmount" for="amount">Počet kusov:</label>
                            {{--                            <div>--}}
                            <input class="moveDown quantityInput" id="amount" name="quantity" type="number" min="1"
                                   value="{{(int) $productGroup->quantity}}"/>
                            <input type="submit" class="sizeDown buttonBlack smallButton" value="OK"/>
                            {{--                            </div>--}}
                        </form>
                        <h2>{{$productGroup->sum()}} €</h2>
                    </div>

                </div>

                <form class="closePart" action="{{ route('shoppingCart.destroy',$productGroup->product->id) }}"
                      method="post">
                    @method('delete')
                    @csrf
                    <input type="submit" class="sameMargin buttonBlack xButton" value="X"/>
                </form>


            </section>
        @endforeach

        <section class="summaryInfo">
            <a class="buttonWhite" href="{{ $previousPage }}">Späť</a>
            <div style="display: flex">
                <p>Spolu: {{$order->totalSum()}} €</p>
                <a class="buttonWhite" href="/shoppingCartDelivery">Pokračovať</a>
            </div>
        </section>
    @endif
@endsection
