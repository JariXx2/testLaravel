<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/app.js'])
    <style>
        table {
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid black;
        }

        th {
            background-color: #ACFFAC;
            text-align: center;
        }

        td {
            background-color: #F7F7F7;
        }
    </style>
</head>

<body class="">
    <h1>Добро пожаловать на наш сайт!</h1>
    <div class="container" style="display: flex; justify-content: space-evenly;">
        <div class="orders">
            <div id="topOrders" style="display: flex; justify-content: space-evenly;">
                <div id="inputsOrders">
                    <input type="text" name="" id="nameOrders"><br>
                    <input type="number" name="" id="countOrders"><br>
                    <textarea id="commentOrders"></textarea><br>
                    <select name="" id="selectGoods">
                        @if (count($goodsData) > 0)
                            @foreach ($goodsData as $good)
                                <option value="{{$good["id"]}}">{{$good["name"]}}</option>
                            @endforeach
                        @endif
                    </select><br>
                    <button>Добавить</button><br>
                </div>
                <div id="informationOrders"></div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>ФИО</th>
                        <th>Дата заказа</th>
                        <th>Статус заказа</th>
                        <th>Итоговая цена</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if (count($ordersData) > 0)
                        @foreach ($ordersData as $order)
                            <tr>
                                <td>{{$order['id']}}</td>
                                <td>{{$order['customer_name']}}</td>
                                <td>{{$order['dateOrder']}}</td>
                                <td>{{$order['status']}}</td>
                                <td>{{$order['price']}}</td>
                                <td><button>Удалить</button></td>
                                <td><button>Изменить</button></td>
                                <td><button>Подробнее</button></td>
                                <td><button>Выполнить</button></td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
        </div>
        <div class="goods">
            <div id="topGoods" style="display: flex; justify-content: space-evenly;">
                <div id="inputsGoods">
                    <input type="text" id="nameGoods"> <br>
                    <input type="number" name="" pattern="[0-9\.]+" id="priceGoods" step="0.01"><br>
                    <textarea name="" id="descriptionGoods"></textarea><br>
                    <input type="text" id="priceGoods"><br>
                    <select id="selectCategories">
                        @if (count($categories) > 0)
                            @foreach ($categories as $category)
                                <option value="{{$category["id"]}}">{{$category["name"]}}</option>
                            @endforeach  
                        @endif
                    </select><br>
                    <button>Добавить</button><br>
                </div>
                <div id="infomationGoods">asdasdasdadsasd</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>Категория</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if (count($goodsData) > 0)
                        @foreach ($goodsData as $good)
                            <tr>
                                <td>{{$good['name']}}</td>
                                <td>{{$good['price']}}</td>
                                <td>{{$good['category']}}</td>
                                <td><button onclick="delOrders({{$good['id']}})">Удалить</button></td>
                                <td><button>Изменить</button></td>
                                <td><button>Подробнее</button></td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>