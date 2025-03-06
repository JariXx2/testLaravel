async function delOrders(id) {}

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
            deleteCell.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Изменить";
            editCell.appendChild(editButton);

            const detailsButton = document.createElement("button");
            detailsButton.textContent = "Подробнее";
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
            deleteCell.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Изменить";
            editCell.appendChild(editButton);

            const detailsButton = document.createElement("button");
            detailsButton.textContent = "Подробнее";
            detailsCell.appendChild(detailsButton);

            const executeButton = document.createElement("button");
            executeButton.textContent = "Выполнить";
            executeCell.appendChild(executeButton);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
}
