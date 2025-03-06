<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\Orders;
use App\Http\Requests\CreateOrderRequest;
use App\Http\Requests\DeleteOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Requests\ShowOrderRequest;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Orders::with('goods')->get();

        $ordersData = $orders->map(function ($order) {
            return [
                "id" => $order->id,
                "customer_name" => $order->customer_name,
                "price" => $order->quantity * $order->goods->price,
                "dateOrder" => $order->created_at->format("Y-m-d H:i:s"),
                "status" => $order->status,
            ];
        });
        return $ordersData;
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
    public function store(CreateOrderRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $order = Orders::create($validatedData);

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
    public function show(ShowOrderRequest $request)
    {
        $id = $request->input('id');

        $order = Orders::find($id);

        if (!$order) {
            return response()->json(['message' => 'Товар не найден'], 404);
        }

        return response()->json($order);
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
    public function update(UpdateOrderRequest $request)
    {
        $id = $request->input('id');

        $order = Orders::find($id);

        if (!$order) {
            return response()->json(['message' => 'Заказ не найден'], 404);
        }

        $order->update($request->validated());

        return response()->json(['message' => 'Заказ успешно обновлен'], 200);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteOrderRequest $request)
    {
        //
    }
}
