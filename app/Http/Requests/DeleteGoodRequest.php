<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteGoodRequest extends FormRequest
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
            'id' => 'required|integer|exists:goods,id',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Id товара обязателен',
            'id.integer' => 'Id должен быть целым числом',
            'id.exists' => 'Товар с таким id не найден',
        ];
    }
}
