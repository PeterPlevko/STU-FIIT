@extends('layout.app')

@section('customCss')
    <link href="{{ asset('css/basic/shopNetwork.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/responsive/shopNetworkResponsive.css') }}" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="{{ asset('js/helperMethods.js') }}"></script>
@endsection

@section('content')
        <section class="buttons row">
            <div class="col-xl-3 col-sm-6">
                <button class="button" onclick="showMap(1)"></button>
                <h2>Bratislava</h2>
                <h6 id="myInput1">Ilkovičova 2, 842 16 Karlova Ves <button onclick="myFunction(1)" class="copy"></button></h6>
            </div>

            <div class="col-xl-3 col-sm-6">
                <button class="button" onclick="showMap(2)"></button>
                <h2>Trnava</h2>
                <h6 id="myInput2">Jána Bottu 2744/24, 917 24 Trnava <button onclick="myFunction(2)" class="copy"></button></h6>
            </div>

            <div class="col-xl-3 col-sm-6">
                <button class="button" onclick="showMap(3)"></button>
                <h2>Trenčín</h2>
                <h6 id="myInput3">Študentská 1639/2, 911 01 Trenčín <button onclick="myFunction(3)" class="copy"></button></h6>
            </div>

            <div class="col-xl-3 col-sm-6">
                <button class="button" onclick="showMap(4)"></button>
                <h2>Nitra</h2>
                <h6 id="myInput4">Trieda Andreja Hlinku 2, 949 76 Nitra-Chrenová <button onclick="myFunction(4)" class="copy"></button></h6>
            </div>

            <div class="col-xl-3 col-sm-6">
                <button class="button" onclick="showMap(5)"></button>
                <h2>Žilina</h2>
                <h6 id="myInput5">Univerzitná 8215, 010 26 Žilina <button onclick="myFunction(5)" class="copy"></button></h6>
            </div>

            <div class="col-xl-3 col-sm-6">
                <button class="button" onclick="showMap(6)"></button>
                <h2>Banská Bystrica</h2>
                <h6 id="myInput6">Komenského 3730/20, 974 01 Banská Bystrica <button onclick="myFunction(6)" class="copy"></button></h6>
            </div>

            <div class="col-xl-3 col-sm-6">
                <button class="button" onclick="showMap(7)"></button>
                <h2>Prešov</h2>
                <h6 id="myInput7">17. novembra 3724/15, 080 01 Prešov <button onclick="myFunction(7)" class="copy"></button></h6>
            </div>

            <div class="col-xl-3 col-sm-6">
                <button class="button" onclick="showMap(8)"></button>
                <h2>Košice</h2>
                <h6 id="myInput8">041 80, Šrobárova 1014/2, 040 01 Košice <button onclick="myFunction(8)" class="copy"></button></h6>
            </div>

        </section>

        <section>
            <h1 style="text-align: center">Mapa</h1>
            <div  id="mapId" class="map">

            </div>
        </section>
@endsection
