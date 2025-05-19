const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    // Validar nombre
    if (!name) {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    // Validar apellido
    if (!lastName) {
        alert("Por favor, ingrese un apellido válido.");
        return;
    }

    // Validar nota
    if (isNaN(grade) || grade < 1 || grade > 7) {
        alert("La nota debe ser un número entre 1 y 7.");
        return;
    }

    const student = { name, lastName, grade };
    students.push(student);
    addStudentToTable(student);
    updateAverage();
    this.reset();
});

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td><button class="delete-btn">Eliminar</button> </td>`;

        row.querySelector(".delete-btn").addEventListener("click",function(){
            deleteEstudiante(student,row);
        });

    tableBody.appendChild(row);

function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if(index>-1){
        students.splice(index,1);
        updateAverage();
        row.remove();
    }
}
}

function updateAverage() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        return;
    }

    let sum = 0;
    for (let i = 0; i < students.length; i++) {
        sum += students[i].grade;
    }
    const average = (sum / students.length).toFixed(1);
    averageDiv.textContent = `Promedio General del Curso: ${average}`;
}