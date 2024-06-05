<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentType extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'prize',
    ];


    public function order(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Order::class);
    }
}
