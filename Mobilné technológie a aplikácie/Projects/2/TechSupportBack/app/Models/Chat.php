<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    public $with = ['userFrom', 'userTo'];

    public function userFrom(){
        return $this->belongsTo(User::class, 'user_from');
    }

    public function userTo(){
        return $this->belongsTo(User::class, 'user_to');
    }
}
