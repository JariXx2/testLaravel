<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateGoodRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'name' => "required|string|unique:goods",
            'category_id' => 'required|integer|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Наименование товара обязательно',
            'name.unique' => 'Товар с таким наименованием уже существует',
            'category_id.required' => 'Категория товара обязательна',
            'category_id.exists' => 'Категория не найдена',
            'description.string' => 'Описание должно быть строкой',
            'price.required' => 'Цена товара обязательна',
            'price.numeric' => 'Цена должна быть числом',
        ];
    }
}
