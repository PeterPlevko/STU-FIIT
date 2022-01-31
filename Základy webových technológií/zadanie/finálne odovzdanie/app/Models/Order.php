<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'delivery_type_id',
        'payment_type_id',
        'state',
    ];

    public function customerInfo()
    {
        return $this->hasOne(CustomerInfo::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function deliveryType()
    {
        return $this->belongsTo(DeliveryType::class);
    }

    public function paymentType()
    {
        return $this->belongsTo(PaymentType::class);
    }

    public function productGroups()
    {
        return $this->hasMany(ProductGroup::class);
    }

    public function scopeTotalSum(): float
    {
        $total = 0;

        foreach ($this->productGroups as $productGroup)
            $total += $productGroup->sum();

        return $total;
    }

    public function scopeTotalSumWithDelivery(): float
    {
        $total = $this->scopeTotalSum();
        $total += $this->deliveryType->prize;
        return $total;
    }
}
