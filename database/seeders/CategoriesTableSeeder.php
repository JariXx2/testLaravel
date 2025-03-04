<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categories;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categories::create(["name"=>'Легкий']);
        Categories::create(["name"=>'Хрупкий']);
        Categories::create(["name"=>'Тяжелый']);
    }
}
