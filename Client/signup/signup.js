const signupBtn = document.getElementById('signup-btn');
const inputName = document.getElementById('InputUsername');
const inputEmail = document.getElementById('InputEmail');
const inputPassword = document.getElementById('InputPassword');
const inputRole = document.getElementById('InputRole');
const inputGender = document.getElementById('InputGender');

signupBtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    const name = inputName.value, email = inputEmail.value, password = inputPassword.value,
    role= inputRole.value, gender = inputGender.value;

    const body = {
        name,
        email,
        password,
        role,
        gender
    }
    
    try {
        const res = await fetch('http://localhost:3245/api/v1/auth/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        alert(resData.message);
        if(resData.success){
            alert('Now you can Login');
            location.href = '/index.html';
        }
    } catch (error) {
        alert('Something went wrong, Try Again later');
    }
})