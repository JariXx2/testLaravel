<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use App\Models\Goods;
use App\Http\Requests\CreateGoodRequest;
use App\Http\Requests\DeleteGoodRequest;
use App\Http\Requests\UpdateGoodRequest;
use App\Http\Requests\ShowGoodRequest;

class GoodsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goods = Goods::with("category")->get();

        $goodsData = $goods->map(function ($good) {
            return [
                "id"=> $good->id,
                "name" => $good->name, 
                "price" => $good->price, 
                "category" => $good->category ? $good->category->name : 'Не указана'
            ];
        });
        return $goodsData;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateGoodRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowGoodRequest $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGoodRequest $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteGoodRequest $id)
    {
        //
    }

    public function getCategories()
    {
        return Categories::all();
    }
}
