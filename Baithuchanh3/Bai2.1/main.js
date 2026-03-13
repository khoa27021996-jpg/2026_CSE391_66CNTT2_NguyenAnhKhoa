const form = document.getElementById("registerForm");

function showError(id, message){
    const errorElement = document.getElementById(`${id}-error`);
    errorElement.innerText = message;
}

function clearError(id){
    const errorElement = document.getElementById(`${id}-error`);
    if (errorElement) errorElement.innerText = "";
}

function validateFullname(){
    const value = document.getElementById("name").value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if(!value) return showError("name", "Ho ten khong duoc de trong"), false;
    if(!regex.test(value)) return showError("name", "Ho ten phai chua it nhat 3 ki tu"), false;
    clearError("name");
    return true;
}

function validateEmail(){
    const value = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!value) return showError('email', 'Email khong duoc de trong'), false;
    if(!regex.test(value)) return showError('email', 'Email khong dung dinh dang'), false;
    clearError('email');
    return true;
}

function validatePhone(){
    const value = document.getElementById('sdt').value.trim();
    const regex = /^0\d{9}$/;
    if(!regex.test(value)) return showError('sdt', 'SDT phai 10 so va bat dau bang so 0'), false;
    clearError('sdt');
    return true;
}

function validatePassword(){
    const value = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(value)) return showError('password', 'Mật khẩu ≥ 8 ký tự, gồm 1 chữ hoa, 1 chữ thường, 1 số'), false;
    clearError('password');
    return true;
};

function validateConfirmPass(){
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm !== pass || !confirm) return showError('confirmPassword', 'Mật khẩu xác nhận không khớp'), false;
    clearError('confirmPassword');
    return true;
};

function validateGender(){
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) return showError('gender', 'Vui lòng chọn giới tính'), false;
    clearError('gender');
    return true;
};

function validateTerms(){
    const checked = document.getElementById('terms').checked;
    if (!checked) return showError('terms', 'Bạn phải đồng ý với điều khoản'), false;
    clearError('terms');
    return true;
};

const fields = ['name', 'email', 'sdt', 'password', 'confirmPassword'];
fields.forEach(id =>{
    const input = document.getElementById(id);
    input.addEventListener('blur', () =>{
        if (id === 'name') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'sdt') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirmPass(); 
    })
    input.addEventListener("input", () => clearError(id));
});

form.addEventListener('submit', (e) =>{
    e.preventDefault();
        const isValid = validateFullname() &&
                  validateEmail() &&
                  validatePhone() && 
                  validatePassword() && 
                  validateConfirmPass() && 
                  validateGender() &&
                  validateTerms();
if (isValid) {
        const name = document.getElementById('name').value;
        form.style.display = 'none';
        const successBox = document.getElementById('success-msg');
        successBox.style.display = 'block';
        successBox.innerHTML = `<h3>Đăng ký thành công! 🎉</h3><p>Chào mừng, <b>${name}</b>!</p>`;
    }
})
