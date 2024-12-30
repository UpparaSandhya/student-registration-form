const form = document.getElementById('registration-form');
const tableBody = document.querySelector('#records-table tbody');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('student-name').value;
    const id = document.getElementById('student-id').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact-number').value;

    if (!name || !id || !email || !contact) return alert('All fields are required');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${id}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);
    saveToLocalStorage();
});

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentElement.parentElement;
        const cells = row.querySelectorAll('td');
        document.getElementById('student-name').value = cells[0].innerText;
        document.getElementById('student-id').value = cells[1].innerText;
        document.getElementById('email').value = cells[2].innerText;
        document.getElementById('contact-number').value = cells[3].innerText;
        row.remove();
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.parentElement.remove();
        saveToLocalStorage();
    }
});

function saveToLocalStorage() {
    const rows = [...tableBody.querySelectorAll('tr')];
    const data = rows.map(row => ({
        name: row.cells[0].innerText,
        id: row.cells[1].innerText,
        email: row.cells[2].innerText,
        contact: row.cells[3].innerText
    }));
    localStorage.setItem('students', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('students') || '[]');
    data.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

window.onload = loadFromLocalStorage;
