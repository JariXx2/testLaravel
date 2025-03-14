setInterval(() => {
    fetch("/keep-token-alive", {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
    });
}, 1000 * 60 * 15);

reloadData();
async function reloadData() {
    fetch("/goods/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка сервера");
        }
    })
    .then((data) => {
        const tbodyGoods = document.getElementById("tbodyGoods");
        const selectGoods = document.getElementById("selectGoods");
        tbodyGoods.innerHTML = "";
        selectGoods.innerHTML = "";

        data.forEach((item) => {
            const option = new Option(item.name, item.id);

            const row = tbodyGoods.insertRow();
            const name = row.insertCell();
            const price = row.insertCell();
            const category = row.insertCell();
            const deleteCell = row.insertCell();
            const editCell = row.insertCell();
            const detailsCell = row.insertCell();

            name.textContent = item.name;
            price.textContent = parseFloat(item.price).toFixed(2);
            category.textContent = item.category;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click", function () {
                delGood(item.id);
            });
            deleteCell.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Изменить";
            editButton.addEventListener("click", function () {
                updGood(item.id);
            });
            editCell.appendChild(editButton);

            const detailsButton = document.createElement("button");
            detailsButton.textContent = "Подробнее";
            detailsButton.addEventListener("click", function () {
                detGood(item.id);
            });
            detailsCell.appendChild(detailsButton);

            selectGoods.appendChild(option);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });

    fetch("/orders/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка сервера");
        }
    })
    .then((data) => {
        const tbodyOrders = document.getElementById("tbodyOrders");
        tbodyOrders.innerHTML = "";

        data.forEach((item) => {
            const row = tbodyOrders.insertRow();

            const idCell = row.insertCell();
            const customerNameCell = row.insertCell();
            const dateOrderCell = row.insertCell();
            const statusCell = row.insertCell();
            const priceCell = row.insertCell();
            const deleteCell = row.insertCell();
            const editCell = row.insertCell();
            const detailsCell = row.insertCell();
            const executeCell = row.insertCell();

            idCell.textContent = item.id;
            customerNameCell.textContent = item.customer_name;
            dateOrderCell.textContent = item.dateOrder;
            statusCell.textContent = item.status;
            priceCell.textContent = parseFloat(item.price).toFixed(2);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click", function () {
                delOrder(item.id);
            });
            deleteCell.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Изменить";
            editButton.addEventListener("click", function () {
                updOrder(item.id);
            });
            editCell.appendChild(editButton);

            const detailsButton = document.createElement("button");
            detailsButton.textContent = "Подробнее";
            detailsButton.addEventListener("click", function () {
                detOrder(item.id);
            });
            detailsCell.appendChild(detailsButton);

            const executeButton = document.createElement("button");
            executeButton.textContent = "Выполнить";
            executeButton.addEventListener("click", function () {
                exeOrder(item.id);
            });
            executeCell.appendChild(executeButton);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
}

function delOrder(id) {
    fetch("/orders/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при удалении заказа");
        }
    })
    .then((data) => {
        console.log(data);
        reloadData();
    })
    .catch((error) => {
        console.error(error.message);
    });
}

function delGood(id) {
    fetch("/goods/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при удалении заказа");
        }
    })
    .then((data) => {
        console.log(data);
        reloadData();
    })
    .catch((error) => {
        console.error(error.message);
    });
}

function updOrder(id) {
    const inputsDiv = document.getElementById("informationOrders");
    inputsDiv.innerHTML = "";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "updOrderName";
    nameInput.placeholder = "Введите новое имя";

    const countInput = document.createElement("input");
    countInput.type = "number";
    countInput.id = "updOrderCount";
    countInput.placeholder = "Введите новое количество";

    const commentInput = document.createElement("textarea");
    commentInput.id = "updOrderComment";
    commentInput.placeholder = "Введите новый комментарий";

    const goodsSelect = document.createElement("select");
    goodsSelect.id = "updOrderGoods";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Сохранить изменения";
    saveButton.onclick = function () {
        saveChangesOrder(id);
    };

    inputsDiv.appendChild(nameInput);
    inputsDiv.appendChild(countInput);
    inputsDiv.appendChild(commentInput);
    inputsDiv.appendChild(goodsSelect);
    inputsDiv.appendChild(saveButton);

    fetch("/goods/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
    })
    .then((response) => response.json())
    .then((goods) => {
        goods.forEach((good) => {
            const option = document.createElement("option");
            option.value = good.id;
            option.textContent = good.name;
            goodsSelect.appendChild(option);
        });
    });

    fetch(`/orders/show`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при получении данных");
        }
    })
    .then((data) => {
        nameInput.value = data.customer_name;
        countInput.value = data.quantity;
        commentInput.value = data.customer_comment;

        const currentGoodsOption = goodsSelect.querySelector(
            `option[value="${data.goods_id}"]`
        );
        if (currentGoodsOption) {
            currentGoodsOption.selected = true;
        }
    })
    .catch((error) => {
        console.error(error.message);
    });
}

function updGood(id) {
    const infoDiv = document.getElementById("infomationGoods");
    infoDiv.innerHTML = "";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "updGoodName";
    nameInput.placeholder = "Введите новое название";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = "updGoodDescription";
    descriptionInput.placeholder = "Введите новое описание";

    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.id = "updGoodPrice";
    priceInput.step = "0.01";
    priceInput.placeholder = "Введите новую цену";

    const categorySelect = document.createElement("select");
    categorySelect.id = "updGoodCategory";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Сохранить изменения";
    saveButton.onclick = function () {
        saveChangesGood(id);
    };

    infoDiv.appendChild(nameInput);
    infoDiv.appendChild(descriptionInput);
    infoDiv.appendChild(priceInput);
    infoDiv.appendChild(categorySelect);
    infoDiv.appendChild(saveButton);

    fetch("/goods/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
    })
    .then((response) => response.json())
    .then((categories) => {
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    });

    fetch(`/goods/show`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при получении данных");
        }
    })
    .then((data) => {
        nameInput.value = data.name;
        descriptionInput.value = data.description;
        priceInput.value = data.price;

        const currentCategoryOption = categorySelect.querySelector(
            `option[value="${data.category_id}"]`
        );
        if (currentCategoryOption) {
            currentCategoryOption.selected = true;
        }
    })
    .catch((error) => {
        console.error(error.message);
    });
}

function saveChangesGood(id) {
    const updGoodName = document.getElementById("updGoodName").value;
    const updGoodDescription =
        document.getElementById("updGoodDescription").value;
    const updGoodPrice = document.getElementById("updGoodPrice").value;
    const updGoodCategoryId = document.getElementById("updGoodCategory").value;

    fetch("/goods/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
            name: updGoodName,
            description: updGoodDescription,
            price: updGoodPrice,
            category_id: updGoodCategoryId,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при сохранении изменений");
        }
    })
    .then((data) => {
        console.log(data);
        reloadData();
    })
    .catch((error) => {
        console.error(error.message);
    });
}

function saveChangesOrder(id) {
    console.log(id);
    const updOrderName = document.getElementById("updOrderName").value;
    const updOrderCount = document.getElementById("updOrderCount").value;
    const updOrderComment = document.getElementById("updOrderComment").value;
    const updOrderGoodsId = document.getElementById("updOrderGoods").value;

    fetch("/orders/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
            customer_name: updOrderName,
            quantity: updOrderCount,
            customer_comment: updOrderComment,
            goods_id: updOrderGoodsId,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при сохранении изменений");
        }
    })
    .then((data) => {
        console.log(data);
        reloadData();
    })
    .catch((error) => {
        console.error(error.message);
    });
}

function detOrder(id) {
    fetch("/orders/show", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при получении данных");
        }
    })
    .then((data) => {
        const infoDiv = document.getElementById("informationOrders");
        infoDiv.innerHTML = "";

        const nameDiv = document.createElement("div");
        nameDiv.textContent = `Имя клиента: ${data.customer_name}`;

        const dateDiv = document.createElement("div");
        dateDiv.textContent = `Дата создания: ${(new Date(data.created_at).toISOString().replace('T',' '.split('.'))).split('.')[0]}`;

        const statusDiv = document.createElement("div");
        statusDiv.textContent = `Статус: ${data.status}`;

        const quantityDiv = document.createElement("div");
        quantityDiv.textContent = `Количество: ${data.quantity}`;

        const commentDiv = document.createElement("textarea");
        commentDiv.readOnly = true;
        commentDiv.style.resize = "none";
        commentDiv.style.width = "100%";
        commentDiv.style.height = "100px";
        commentDiv.value = `Комментарий: ${data.customer_comment}`;

        fetch("/goods/show", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
            },
            body: JSON.stringify({
                id: data.goods_id,
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Ошибка при получении данных товара");
            }
        })
        .then((goodData) => {
            const goodsNameDiv = document.createElement("div");
            goodsNameDiv.textContent = `Товар: ${goodData.name}`;

            infoDiv.appendChild(nameDiv);
            infoDiv.appendChild(dateDiv);
            infoDiv.appendChild(statusDiv);
            infoDiv.appendChild(quantityDiv);
            infoDiv.appendChild(commentDiv);
            infoDiv.appendChild(goodsNameDiv);
        })
        .catch((error) => {
            console.error(error.message);
        });
    })
    .catch((error) => {
        console.error(error.message);
    });
}

function detGood(id) {
    fetch("/goods/show", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при получении данных");
        }
    })
    .then((data) => {
        const infoDiv = document.getElementById("infomationGoods");
        infoDiv.innerHTML = "";

        const nameDiv = document.createElement("div");
        nameDiv.textContent = `Название: ${data.name}`;

        const descriptionDiv = document.createElement("textarea");
        descriptionDiv.readOnly = true;
        descriptionDiv.style.resize = "none";
        descriptionDiv.style.width = "100%";
        descriptionDiv.style.height = "100px";
        descriptionDiv.value = `Описание: ${data.description}`;

        const priceDiv = document.createElement("div");
        priceDiv.textContent = `Цена: ${data.price}`;

        infoDiv.appendChild(nameDiv);
        infoDiv.appendChild(descriptionDiv);
        infoDiv.appendChild(priceDiv);

        fetch("/goods/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
            },
        })
        .then((response) => response.json())
        .then((categories) => {
            const category = categories.find(
                (category) => category.id === data.category_id
            );
            if (category) {
                const categoryDiv = document.createElement("div");
                categoryDiv.textContent = `Категория: ${category.name}`;
                infoDiv.appendChild(categoryDiv);
            } else {
                console.error("Категория не найдена");
            }
        })
        .catch((error) => {
            console.error(error.message);
        });
    })
    .catch((error) => {
        console.error(error.message);
    });
}

function exeOrder(id) {
    fetch("/orders/execute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
            id: id,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ошибка при выполнении заказа");
        }
    })
    .then((data) => {
        console.log(data);
        reloadData();
    })
    .catch((error) => {
        console.error(error.message);
    });
}

document
.getElementById("createGoodButton")
.addEventListener("click", function () {
    const name = document.getElementById("nameGoods").value;
    const price = document.getElementById("priceGoods").value;
    const description = document.getElementById("descriptionGoods").value;
    const categoryId = document.getElementById("selectCategories").value;

    fetch("/goods/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: name,
            category_id: categoryId,
            description: description,
            price: price,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 422) {
            return response.json().then((data) => {
                console.log(data.errors);
                throw new Error("Ошибки валидации");
            });
        } else {
            throw new Error("Ошибка сервера");
        }
    })
    .then((data) => {
        reloadData();
        console.log(data);
    })
    .catch((error) => {
        console.error(error.message);
    });
});

document
.getElementById("createOrderButton")
.addEventListener("click", function () {
    const name = document.getElementById("nameOrders").value;
    const count = document.getElementById("countOrders").value;
    const comment = document.getElementById("commentOrders").value;
    const goodsId = document.getElementById("selectGoods").value;

    fetch("/orders/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
            Accept: "application/json",
        },
        body: JSON.stringify({
            customer_name: name,
            goods_id: goodsId,
            customer_comment: comment,
            quantity: count,
        }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 422) {
            return response.json().then((data) => {
                console.log(data.errors);
                throw new Error("Ошибки валидации");
            });
        } else {
            throw new Error("Ошибка сервера");
        }
    })
    .then((data) => {
        reloadData();
        console.log(data);
    })
    .catch((error) => {
        console.error(error.message);
    });
});
