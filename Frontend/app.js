const ul = document.getElementById("items");

window.addEventListener("DOMContentLoaded", () => {

    const fetchData = async () => {
        const data = await fetch("http://localhost:3000/get-expense");
        const res = await data.json();
        res.forEach(element => {
            const amount = element.amount;
            const description = element.description;
            const category = element.category;
            //create delete button 
            const deleteBtn = document.createElement("input")
            deleteBtn.type = "button"
            deleteBtn.setAttribute("onclick", "deleteItem(event)")
            deleteBtn.className = "delete"
            deleteBtn.value = "Delete Expense"

            // create edit button
            const editBtn = document.createElement("input")
            editBtn.type = "button"
            editBtn.setAttribute("onclick", "editItem(event)")
            editBtn.className = "edit"
            editBtn.value = "Edit Expense"

            //create li element
            const new_li = document.createElement("li");
            new_li.className = "lists"

            new_li.textContent = `${amount}-${description}-${category}`
            new_li.appendChild(deleteBtn)
            new_li.appendChild(editBtn)

            ul.appendChild(new_li);
        });

    }
    fetchData();
})
function expenseSubmitted(event) {
    event.preventDefault()
    const amount = document.getElementById("amount").value
    const description = document.getElementById("description").value
    const category = document.getElementById("category").value
    const obj = {
        "amount": amount,
        "description": description,
        "category": category
    }
    const serialised = JSON.stringify(obj)
    fetch("http://localhost:3000/add-expense", {
        method: "POST",
        body: serialised,
        headers: {
            "Content-type": "application/json"
        }
    });
    localStorage.setItem(description, serialised)
    const deserialised = JSON.parse(localStorage.getItem(description))

    //create delete button 
    const deleteBtn = document.createElement("input")
    deleteBtn.type = "button"
    deleteBtn.setAttribute("onclick", "deleteItem(event)")
    deleteBtn.className = "delete"
    deleteBtn.value = "Delete Expense"

    // create edit button
    const editBtn = document.createElement("input")
    editBtn.type = "button"
    editBtn.setAttribute("onclick", "editItem(event)")
    editBtn.className = "edit"
    editBtn.value = "Edit Expense"

    //create li element
    const new_li = document.createElement("li");
    new_li.className = "lists"

    const liAmount = deserialised.amount
    const liDescription = deserialised.description
    const liCategory = deserialised.category
    new_li.textContent = `${liAmount}-${liDescription}-${liCategory}`
    new_li.appendChild(deleteBtn)
    new_li.appendChild(editBtn)

    ul.appendChild(new_li);


    document.getElementById("amount").value = ""
    document.getElementById("description").value = ""

}

function deleteItem(event) {
    event.target.parentNode.style.display = "none"
    const textContent = event.target.parentNode.textContent.split("-")
    const amount = +textContent[0].trim();
    const description = textContent[1].trim();
    const category = textContent[2].trim();
    const fetchData = async () => {
        const data = await fetch("http://localhost:3000/get-expense");
        const res = await data.json();
        let id;
        res.forEach((element) => {
            if (element.amount === amount && element.description === description && element.category === category) {
                id = element.id;
            }
        });
        fetch(`http://localhost:3000/delete-expense/${id}`, {
            method: "DELETE",
        })
    };
    fetchData();


}
function editItem(event) {
    event.target.parentNode.style.display = "none"
    const editedAmount = +event.target.parentNode.textContent.split("-")[0]
    const editDescription = event.target.parentNode.textContent.split("-")[1]
    const editCategory = event.target.parentNode.textContent.split("-")[2]

    document.getElementById("amount").value = editedAmount
    document.getElementById("description").value = editDescription
    document.getElementById("category").value = editCategory
    // const itemToBeRemoved = event.target.parentNode.textContent.split("-")[1];
    const fetchData = async () => {
        const data = await fetch("http://localhost:3000/get-expense");
        const res = await data.json();
        let id;
        res.forEach((element) => {
            if (element.amount === editedAmount && element.description === editDescription && element.category === editCategory) {
                id = element.id;
            }
        });
        fetch(`http://localhost:3000/delete-expense/${id}`, {
            method: "DELETE",
        })
    };
    fetchData();

}