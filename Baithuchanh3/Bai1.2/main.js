
const nameInput = document.getElementById("name");
const diemInput = document.getElementById("diem");
const searchInput = document.getElementById("searchInput");
const filterRank = document.getElementById("filterRank");
const tableBody = document.getElementById("studentTable");

let students = [];
let sortDirection = 0;
function getRank(diem) {
    if (diem >= 8.5) return "Giỏi";
    if (diem >= 7.0) return "Khá";
    if (diem >= 5.0) return "Trung bình";
    return "Yếu";
}
function applyFilters() {
    const keyword = searchInput.value.toLowerCase();
    const rankValue = filterRank.value;
    let result = students.filter(s => {
        const matchesName = s.name.toLowerCase().includes(keyword);
        const matchesRank = rankValue === "all" || getRank(s.diem) === rankValue;
        return matchesName && matchesRank;
    });

    if (sortDirection !== 0) {
        result.sort((a, b) => (a.diem - b.diem) * sortDirection);
    }
    renderTable(result);
}
function renderTable(dataToRender) {
    tableBody.innerHTML = "";
    let tongDiem = 0;

    if (dataToRender.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">Không tìm thấy kết quả phù hợp</td></tr>`;
        updateStatistics(0, 0);
        return;
    }

    dataToRender.forEach((student, index) => {
        const row = document.createElement("tr");
        if (student.diem < 5) row.classList.add("highlight-weak");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.diem.toFixed(1)}</td>
            <td>${getRank(student.diem)}</td>
            <td><button class="btn-delete" data-id="${student.id}">Xóa</button></td>
        `;
        tableBody.appendChild(row);
        tongDiem += student.diem;
    });

    updateStatistics(dataToRender.length, tongDiem / dataToRender.length);
}

function updateStatistics(count, avg) {
    const totalElem = document.getElementById("totalStudent");
    const avgElem = document.getElementById("avgScore");

    if (totalElem) totalElem.textContent = count;
    if (avgElem) avgElem.textContent = avg > 0 ? avg.toFixed(2) : "0.00";
}

function addStudent() {
    const name = nameInput.value.trim();
    const diem = parseFloat(diemInput.value);

    if (name === "" || isNaN(diem) || diem < 0 || diem > 10) {
        alert("Thông tin không hợp lệ! Vui lòng nhập tên và điểm từ 0-10.");
        return;
    }

    const newStudent = {
        id: Date.now(),
        name: name,
        diem: diem
    };

    students.push(newStudent);
    applyFilters();
    nameInput.value = "";
    diemInput.value = "";
    nameInput.focus();
}

document.getElementById("btn").addEventListener("click", addStudent);

diemInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addStudent();
});
searchInput.addEventListener("input", applyFilters);
filterRank.addEventListener("change", applyFilters);
document.getElementById("sortScore").addEventListener("click", () => {
    if (sortDirection === 0 || sortDirection === -1) sortDirection = 1; 
    else sortDirection = -1;

    const icon = sortDirection === 1 ? "▲" : "▼";
    document.getElementById("sortIcon").textContent = icon;
    applyFilters();
});
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const idToDelete = parseInt(e.target.getAttribute("data-id"));
        students = students.filter(s => s.id !== idToDelete);
        applyFilters();
    }
});
