<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\GoodsController;

class PageController extends Controller
{
    public function index() {
        
        $goodsController = new GoodsController();
        $goodsData = $goodsController->index();

        return view("welcome",compact("goodsData"));
    }
}
