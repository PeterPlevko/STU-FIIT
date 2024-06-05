<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
        'order_id',
        'product_id'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeSum(): float|int
    {
        return ($this->product()->first()->discountedPrize != null ? $this->product()->first()->discountedPrize : $this->product()->first()->prize) * $this->quantity;
    }
}
