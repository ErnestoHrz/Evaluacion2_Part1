const students = [];
let editingIndex = null;

const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    if (!name) {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    if (!lastName) {
        alert("Por favor, ingrese un apellido válido.");
        return;
    }

    if (isNaN(grade) || grade < 1 || grade > 7) {
        alert("La nota debe ser un número entre 1 y 7.");
        return;
    }

    const student = { name, lastName, grade };

    if (editingIndex !== null) {
        //  estudiante existente
        students[editingIndex] = student;
        refreshTable();
        updateAverage();
        editingIndex = null;
        this.reset();
    } else {
        //  nuevo estudiante
        students.push(student);
        addStudentToTable(student);
        updateAverage();
        this.reset();
    }
});

function addStudentToTable(student, index = students.length - 1) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td><button class="delete-btn">♻</button></td>
        <td><button class="edit-btn">✎</button></td>`;

    // eliminar
    row.querySelector(".delete-btn").addEventListener("click", function () {
        deleteEstudiante(index);
    });

    // editar
    row.querySelector(".edit-btn").addEventListener("click", function () {
        editEstudiante(index);
    });

    tableBody.appendChild(row);
}

function deleteEstudiante(index) {
    students.splice(index, 1);
    refreshTable();
    updateAverage();
}

function editEstudiante(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    editingIndex = index;
}

function refreshTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        addStudentToTable(student, index);
    });
}

function updateAverage() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        return;
    }

    const sum = students.reduce((acc, curr) => acc + curr.grade, 0);
    const average = (sum / students.length).toFixed(1);
    averageDiv.textContent = `Promedio General del Curso: ${average}`;
}
