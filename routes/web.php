<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\GoodsController;
use App\Http\Controllers\OrdersController;

Route::get("/", [PageController::class,"index"]);
Route::resource("goods", GoodsController::class);
Route::resource("orders", OrdersController::class);


