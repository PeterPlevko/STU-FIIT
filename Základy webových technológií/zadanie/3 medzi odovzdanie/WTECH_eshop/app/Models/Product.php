<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'shortDescription',
        'longDescription',
        'business_type_id',
        'category_id',
        'size',
        'prize',
        'discountedPrize',
        'soldedCount',
        'rating',
        'top',
        'image',
        'bestOfWeek'
    ];

    protected $casts = [
        'image' => 'array'
    ];

    public function productGroup()
    {
        return $this->hasOne(ProductGroup::class );
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function businessType()
    {
        return $this->belongsTo(BusinessType::class);
    }
}
