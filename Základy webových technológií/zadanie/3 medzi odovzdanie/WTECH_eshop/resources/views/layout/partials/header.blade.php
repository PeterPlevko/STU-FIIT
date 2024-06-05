<header>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="twoRows">
            <div class="container-fluid row">
                <a class="navbar-brand" href="/">
                    <img src="{{ asset('images/mainPage/Logo.png') }}" alt="Lezec.sk" width="200">
                </a>
                <button class="navbar-toggler collapsed" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="true" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <form method="get" action="{{ route('products.index')}}">
                                <input class="headingInput" type="submit" value="Produkty" />
                            </form>
                        </li>
                        <li class="nav-item">
                            <form method="get" action="{{ route('products.index')}}">
                                <input class="headingInput" type="hidden" style="display: none" name="discount" value="{{true}}">
                                <input class="headingInput" type="submit" value="Zľavy"/>
                            </form>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a href="/shoppingCart">Košík 🛒</a>
                        </li>
                        @guest
                            <li class="nav-item login">
                                <a href="/login">Prihlásenie</a>
                            </li>
                        @endguest


                        @auth
                            <li class="nav-item">
                                @if(Auth::user()->customerInfo->email == "admin@admin.com")
                                    <a class="loggedUser" href="/admin">Prihlásený: {{ Auth::user()->customerInfo->name }}</a>
                                @else
                                    <p class="loggedUser">Prihlásený: {{ Auth::user()->customerInfo->name }}</p>
                                @endif
                            </li>

                            <li class="nav-item login">
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <input class="change" type="submit" value="Odhlásenie">
                                </form>
                            </li>
                        @endauth

                    </ul>
                </div>
            </div>
            <form method="get" action="{{ route('products.index')}}" class="halfSearch">
                <input type="text" class="searchTerm" placeholder="Názov produktu" name="search"/>
                <button type="submit" class="searchButton">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>
    </nav>
</header>
