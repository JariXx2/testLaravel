<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\GoodsController;
use App\Http\Controllers\OrdersController;

class PageController extends Controller
{
    public function index() {
        
        $goodsController = new GoodsController();
        $ordersController = new OrdersController();

        $goodsData = $goodsController->index();
        $ordersData = $ordersController->index();

        return view("welcome",compact("goodsData","ordersData"));
    }
}
