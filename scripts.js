document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("item-form");
    const searchBar = document.getElementById("search-bar");
    const itemList = document.getElementById("item-list");

    fetchItems();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newItem = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            stock: document.getElementById("stock").value,
        };

        const response = await fetch("http://localhost:5001/api/inventory/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
        });

        if (response.ok) {
            fetchItems();
            form.reset();
        } else {
            alert("Failed to add item.");
        }
    });

    async function fetchItems() {
        const response = await fetch("http://localhost:5001/api/inventory/items");
        const items = await response.json();
        renderItems(items);
    }

    function renderItems(items) {
        itemList.innerHTML = items.map(
            (item) =>
                `<tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.price}</td>
                    <td>${item.stock}</td>
                </tr>`
        ).join("");
    }

    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        const rows = itemList.querySelectorAll("tr");
        rows.forEach((row) => {
            row.style.display = row.innerText.toLowerCase().includes(query) ? "" : "none";
        });
    });
});
