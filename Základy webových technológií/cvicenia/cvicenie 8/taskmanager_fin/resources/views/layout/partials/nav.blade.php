<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <a class="navbar-brand" href="/tasks">{{ __('Jednoduchý manažér úloh') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/tasks/create">Nová úloha</a>
            </li>
        </ul>
    </div>
    
    
    @auth
    <div class="text-white">
        {{ Auth::user()->name }}&nbsp;|&nbsp;{{ Auth::user()->email }}
        <div>
            <!-- Authentication -->
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <x-responsive-nav-link :href="route('logout')"
                        onclick="event.preventDefault();
                                    this.closest('form').submit();">
                    {{ __('Log Out') }}
                </x-responsive-nav-link>
            </form>
        </div>
    </div>
    @endauth

    <div class="btn-group text-white">
        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{App::getLocale()}}
        </button>
        <div class="dropdown-menu">
            <a class="dropdown-item" href="/locale/sk">sk</a>
            <a class="dropdown-item" href="/locale/en">en</a>
        </div>
    </div>

</nav>