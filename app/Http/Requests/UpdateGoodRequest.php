<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGoodRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:goods,id',
            'name' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Id товара обязателен',
            'id.integer' => 'Id должен быть целым числом',
            'id.exists' => 'Товар с таким id не найден',
            'name.required' => 'Наименование товара обязательно',
            'name.string' => 'Наименование должно быть строкой',
            'category_id.required' => 'Категория товара обязательна',
            'category_id.exists' => 'Категория не найдена',
            'description.string' => 'Описание должно быть строкой',
            'price.required' => 'Цена товара обязательна',
            'price.numeric' => 'Цена должна быть числом',
        ];
    }
}
