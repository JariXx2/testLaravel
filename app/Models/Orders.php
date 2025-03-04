<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'status',
        'customer_comment',
        'goods_id',
        'quantity',
    ] ;

    public function goods()
    {
        return $this->belongsTo(Goods::class);
    }
}
