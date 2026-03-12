const nameInput = document.getElementById("name");
const diemInput = document.getElementById("diem");
const tablebody = document.querySelector("tbody");
let students = [];

function renderTable(){
    tablebody.innerHTML = "";
    let tongDiem = 0;
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        if (student.diem < 5) row.classList.add("highlight-weak");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.diem.toFixed(1)}</td>
        <td>${getRank(student.diem)}</td>
        <td><button class = "btn-delete" data-index = "${index}">Xoa</button></td>
        `;
        tablebody.appendChild(row);
        tongDiem += student.diem;
    });
    const tongSV = students.length;
    document.getElementById("totalStudents").textContent = tongSV;
    document.getElementById("avgScore").textContent = tongSV > 0 ? (tongDiem/tongSV) : 0;
}
function addStudent(){
    const name = nameInput.value.trim();
    const diem = +diemInput.value;
    if(name == ""){
        alert("Vui long khong de khoang trong ho ten!");
        nameInput.focus();
        return;
    }
    if(diemInput.value == "" || diem<0 || diem > 10){
        alert("Diem phai la so tu 0 den 10!");
        diemInput.focus();
        return;
    }
    students.push({ name, diem });
        
        renderTable();
        nameInput.value = "";
        diemInput.value = "";
        nameInput.focus();
    }
document.getElementById("btn").addEventListener("click", addStudent);
diemInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addStudent();
    }
});

tablebody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const indexToDelete = e.target.getAttribute("data-index");
        students.splice(indexToDelete, 1);     
        renderTable();
    }
});

function getRank(diem) {
    if (diem >= 8.5) return "Giỏi";
    if (diem >= 7.0) return "Khá";
    if (diem >= 5.0) return "Trung bình";
    return "Yếu";
}



