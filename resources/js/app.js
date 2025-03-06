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
    console.log(id);
}

function delGood(id) {
    console.log(id);
}

function updOrder(id) {
    console.log(id);
}

function updGood(id) {
    console.log(id);
}

function detOrder(id) {
    console.log(id);
}

function detGood(id) {
    console.log(id);
}

function exeOrder(id) {
    console.log(id);
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
