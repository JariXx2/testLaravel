<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'customer_name' => 'required|string',
            'customer_comment' => 'nullable|string',
            'goods_id' => 'required|integer|exists:goods,id',
            'quantity' => 'required|integer|min:1',
        ];
    }

    public function messages()
    {
        return [
            'customer_name.required' => 'Имя клиента обязательно',
            'customer_name.string' => 'Имя клиента должно быть строкой',
            'customer_comment.string' => 'Комментарий клиента должен быть строкой',
            'goods_id.required' => 'Id товара обязателен',
            'goods_id.exists' => 'Товар с таким id не найден',
            'quantity.required' => 'Количество должно быть указано',
            'quantity.integer' => 'Количество должно быть целым числом',
            'quantity.min' => 'Количество должно быть не менее 1',
        ];
    }
}
