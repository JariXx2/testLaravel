<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\GoodsController;
use App\Http\Controllers\OrdersController;

Route::get("/", [PageController::class, "index"]);
Route::post('/keep-token-alive', function () {
    return response()->json(['message' => 'Token updated']);
})->middleware('throttle:60,1');


Route::post("/goods/get", [GoodsController::class, "index"]);
Route::post("/goods/create", [GoodsController::class, "store"]);
Route::post("/goods/show", [GoodsController::class, "show"]);
Route::post("/goods/update", [GoodsController::class, "update"]);
Route::post("/goods/delete", [GoodsController::class, "destroy"]);

Route::post("/orders/get", [OrdersController::class, "index"]);
Route::post("/orders/create", [OrdersController::class, "store"]);
Route::post("/orders/show", [OrdersController::class, "show"]);
Route::post("/orders/update", [OrdersController::class, "update"]);
Route::post("/orders/delete", [OrdersController::class, "destroy"]);
