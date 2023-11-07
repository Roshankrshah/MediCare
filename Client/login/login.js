const loginBtn = document.getElementById('login-btn');
const inputEmail = document.getElementById('InputEmail');
const inputPassword = document.getElementById('InputPassword');

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = inputEmail.value, password = inputPassword.value;
    const body = {
        email,
        password
    }

    try {
        const res = await fetch('http://localhost:3245/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        alert(resData.message);
        if(resData.success){
            localStorage.setItem('token',resData.token);
            localStorage.setItem('role',resData.role);
            location.href = '/index.html';
        }
    } catch (error) {
        alert('Something went wrong, Try Again later');
    }
});