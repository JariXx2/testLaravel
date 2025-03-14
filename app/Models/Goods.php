<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Goods extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category_id',
        'description',
        'price',
    ];

    public function orders()
    {
        return $this->hasMany(Orders::class);
    }

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }
}
