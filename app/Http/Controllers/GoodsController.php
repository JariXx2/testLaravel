<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
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
                "id" => $good->id,
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
        try {
            $validatedData = $request->validated();
            $good = Goods::create($validatedData);

            return response()->json(['message' => 'Товар успешно добавлен'], 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['message' => 'Server error'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowGoodRequest $request)
    {
        $id = $request->input('id');

        $good = Goods::find($id);

        if (!$good) {
            return response()->json(['message' => 'Товар не найден'], 404);
        }

        return response()->json($good);
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
        $id = $request->input('id');
        $good = Goods::find($id);

        if (!$good) {
            return response()->json(['message' => 'Товар не найден'], 404);
        }

        $good->update($request->validated());

        return response()->json(['message' => 'Товар успешно обновлен'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteGoodRequest $request)
    {
        $id = $request->input('id');
        $good = Goods::find($id);

        if (!$good) {
            return response()->json(['message' => 'Товар не найден'], 404);
        }

        $good->delete();

        return response()->json(['message' => 'Товар успешно удален'], 200);
    }

    public function getCategories()
    {
        return Categories::all();
    }
}
