<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\GoodsController;

Route::get("/", [PageController::class,"index"]);
Route::resource("goods", GoodsController::class);

