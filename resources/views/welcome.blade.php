<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite(['resources/js/app.js'])
</head>

<body class="">
    <h1>Добро пожаловать на наш сайт!</h1>
    <div class="container" style="display: flex; justify-content: center;">
        <div class="orders"></div>
        <div class="goods">
            <input type="text" id="nameGoods"> <br>
            <input type="number" name="" pattern="[0-9\.]+" id="priceGoods" step="0.01"><br>
            <textarea name="" id="descriptionGoods"></textarea><br>
            <input type="text" id="priceGoods"><br>
            <select name="user" id="user">
                @if (count($categories) > 0)
                    @foreach ($categories as $category)
                        <option value="{{$category["id"]}}">{{$category["name"]}}</option>
                    @endforeach  
                @endif
            </select><br>
        </div>
    </div>
</body>

</html>