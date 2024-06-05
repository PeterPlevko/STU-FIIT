<?php

namespace App\Models;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Validation\Rules;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function latestChat($id): Chat{
        return Chat::where(['user_from' => $id, 'user_to' => auth()->user()->id ])->orWhere(['user_from' => auth()->user()->id, 'user_to' => $id ])->orderBy('created_at', 'desc')->first();
    }

    public function questions(){
        return $this->hasMany(Question::class);
    }

    public function comments(){
        return $this->hasMany(Comments::class);
    }

    public function articles(){
        return $this->hasMany(Article::class);
    }

    public function sentChats(){
        return $this->hasMany(Chat::class, 'user_from');
    }

    public function recvChats(){
        return $this->hasMany(Chat::class, 'user_to');
    }

    public static function recentUsers(){
        $users = [];
        foreach(User::select('name', 'id')->whereIn('id', auth()->user()->recvChats->pluck('user_from'))->orWhereIn('id', auth()->user()->sentChats->pluck('user_to'))->get() as $user){
            $user->unreads = auth()->user()->recvChats()->where('user_from', $user->id)->where('viewed', 0)->count();
            $user->latest = auth()->user()->latestChat($user->id);
            array_push($users, $user);
        }

        return response()->json($users);
    }

    public static function read(User $user_from, User $user_to){
        Chat::where(['user_from' => $user_from->id, 'user_to' => $user_to->id])->update(['viewed' => 1]);
        return response()->json();
    }

    public static function userHistory(User $user) {
        return response()->json(auth()->user()->sentChats()->where('user_to', $user->id)->orWhere('user_from', $user->id)->orderBy('created_at', 'asc')->get()->toArray());
    }

    public function send(Request $request, User $user_to){
        $request->validate([
            'text' => ['required', 'string', 'max:4000']
        ]);

        $chat = new Chat();
        $chat->user_from = $this->id;
        $chat->user_to = $user_to->id;
        $chat->message = $request->text;
        $chat->save();  

        User::read($user_to, auth()->user());

        return response()->json($chat->load('userFrom', 'userTo')->toArray());
    }

    public static function token(Request $request){
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'max:1000'],
            'device_name' => ['required', 'string', 'max:250']
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $tmpUser = $user->toArray();
        $tmpUser['token'] = $user->createToken($request->device_name)->plainTextToken;
        return response()->json($tmpUser);
    }

    public static function register(Request $request){
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults(), 'max:1000'],
            'device_name' => ['required', 'string', 'max:250']
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        $tmpUser = $user->toArray();
        $tmpUser['token'] = $user->createToken($request->device_name)->plainTextToken;
        return response()->json($tmpUser);
    }

    public static function logout(Request $request){
        auth()->user()->currentAccessToken()->delete();

        return response()->json();
    }

    public function modify(Request $request){
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255', 'unique:users,email,' . auth()->user()->id],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults(), 'max:1000'],
        ]);

        if($request->filled('name'))
            $this->name = $request->name;
        if($request->filled('email'))
            $this->email = $request->email;
        if($request->filled('password'))
            $this->password = Hash::make($request->password);

        $this->save();
        return response()->json($this->toArray());
    }
}
