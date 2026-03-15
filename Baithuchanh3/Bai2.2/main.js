const prices = { "ao": 150000, "quan": 300000, "giay": 500000 };

function updateTotalPrice() {
    const product = document.getElementById('product').value;
    const qty = parseInt(document.getElementById('quantity').value) || 0;
    const price = prices[product] || 0;
    const total = price * qty;
    document.getElementById('total-price').innerText = total.toLocaleString("vi-VN") + "đ";
}

document.getElementById('product').addEventListener('change', updateTotalPrice);
document.getElementById('quantity').addEventListener('input', updateTotalPrice);

function showError(id, message){
    const errorElement = document.getElementById(`${id}-error`);
    errorElement.innerText = message;
}

function clearError(id){
    const errorElement = document.getElementById(`${id}-error`);
    if(!errorElement) errorElement.innerText = "";
}

document.getElementById('note').addEventListener('input', function() {
    const count = this.value.length;
    const countDisplay = document.getElementById('char-count');
    countDisplay.innerText = `${count}/200`;
    
    if (count > 200) {
        countDisplay.style.color = "red";
        showError('note', 'Ghi chú không được quá 200 ký tự');
    } else {
        countDisplay.style.color = "black";
        clearError('note');
    }
});

document.getElementById('note').addEventListener('input', function() {
    const count = this.value.length;
    const countDisplay = document.getElementById('char-count');
    countDisplay.innerText = `${count}/200`;
    
    if (count > 200) {
        countDisplay.style.color = "red";
        showError('note', 'Ghi chú không được quá 200 ký tự');
    } else {
        countDisplay.style.color = "black";
        clearError('note');
    }
});

function validateDate() {
    const inputDate = new Date(document.getElementById('deliveryDate').value);
    const today = new Date();
    today.setHours(0,0,0,0);

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (isNaN(inputDate.getTime())) return showError('deliveryDate', 'Vui lòng chọn ngày'), false;
    if (inputDate < today) return showError('deliveryDate', 'Không được chọn ngày quá khứ'), false;
    if (inputDate > maxDate) return showError('deliveryDate', 'Không được giao quá 30 ngày tới'), false;

    clearError('deliveryDate');
    return true;
}

function validateProduct(){
    const product = document.getElementById('product').value;
    if(!product) return showError('product', "Vui long chon 1 san pham"), false;
    clearError('product')
    return true;
}

function validateQuantity() {
    const qty = document.getElementById('quantity').value;
    const num = parseInt(qty);
    if (!qty || isNaN(num) || num < 1 || num > 99) {
        return showError('quantity', 'Số lượng phải từ 1 đến 99'), false;
    }
    clearError('quantity');
    return true;
}

function validateDate() {
    const dateValue = document.getElementById('deliveryDate').value;
    if (!dateValue) return showError('deliveryDate', 'Vui lòng chọn ngày giao'), false;

    const inputDate = new Date(dateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đưa về 0h để so sánh ngày chính xác

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30); // Giới hạn trong 30 ngày

    if (inputDate < today) {
        return showError('deliveryDate', 'Ngày giao không được ở quá khứ'), false;
    }
    if (inputDate > maxDate) {
        return showError('deliveryDate', 'Ngày giao không được quá 30 ngày tới'), false;
    }

    clearError('deliveryDate');
    return true;
}

function validateAddress() {
    const address = document.getElementById('address').value.trim();
    if (address.length < 10) {
        return showError('address', 'Địa chỉ giao hàng phải ít nhất 10 ký tự'), false;
    }
    clearError('address');
    return true;
}

function validateNote() {
    const note = document.getElementById('note').value;
    if (note.length > 200) {
        return showError('note', 'Ghi chú không được vượt quá 200 ký tự'), false;
    }
    clearError('note');
    return true;
}

function validatePayment() {
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) {
        return showError('payment', 'Vui lòng chọn phương thức thanh toán'), false;
    }
    clearError('payment');
    return true;
}

const form = document.getElementById('orderForm');
const confirmBox = document.getElementById('confirm-box');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isValid = validateProduct() && validateQuantity() && validateDate() && validateAddress() && validatePayment();

    if (isValid) {
        form.style.display = 'none';
        confirmBox.style.display = 'block';
        
        document.getElementById('order-summary').innerHTML = `
            <p>Sản phẩm: ${document.getElementById('product').options[document.getElementById('product').selectedIndex].text}</p>
            <p>Số lượng: ${document.getElementById('quantity').value}</p>
            <p>Tổng tiền: ${document.getElementById('total-price').innerText}</p>
            <p>Ngày giao: ${document.getElementById('deliveryDate').value}</p>
        `;
    }
});

document.getElementById('btn-confirm').addEventListener('click', () => {
    confirmBox.style.display = 'none';
    document.getElementById('final-success').style.display = 'block';
});

document.getElementById('btn-cancel').addEventListener('click', () => {
    confirmBox.style.display = 'none';
    form.style.display = 'block';
});

// Danh sách các ID cần kiểm tra realtime
const orderFields = ['quantity', 'deliveryDate', 'address', 'note'];

orderFields.forEach(id => {
    const element = document.getElementById(id);
    
    // Khi rời khỏi ô -> Kiểm tra lỗi
    element.addEventListener('blur', () => {
        if (id === 'quantity') validateQuantity();
        if (id === 'deliveryDate') validateDate();
        if (id === 'address') validateAddress();
        if (id === 'note') validateNote();
    });

    // Khi đang gõ -> Xóa lỗi ngay lập tức (UX tốt)
    element.addEventListener('input', () => clearError(id));
});

// Cho Dropdown sản phẩm
document.getElementById('product').addEventListener('change', () => {
    validateProduct();
    updateTotalPrice(); // Tiện thể cập nhật giá luôn
});

// Cho nhóm Radio thanh toán
const paymentRadios = document.querySelectorAll('input[name="payment"]');
paymentRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        validatePayment(); // Xóa lỗi ngay khi người dùng vừa tích chọn
    });
});