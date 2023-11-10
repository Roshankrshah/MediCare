const loginBtn = document.querySelector('.login-btn');
const dynSlot = document.querySelector('.dyn-slot');

loginBtn.addEventListener('click', () => {
    location.href = '/login/index.html';
});

if (localStorage.getItem('token')) {

    let endpoint;

    if(localStorage.getItem('role')=== 'patient')
        endpoint = 'api/v1/user/profile/me';
    else
        endpoint = 'api/v1/doctor/profile/me';

    try {
        const res = await fetch(`http://localhost:3245/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const resData = await res.json();
        if (resData.success) {

            dynSlot.innerHTML = `
                <p class="username" id='user-btn'>${resData.data.name}</p>
                <button class="btn logout-btn" style="background:red;">Logout</button>`;

            const logoutBtn = document.querySelector('.logout-btn');
            logoutBtn.addEventListener('click', () => {
                localStorage.clear();
                location.reload();
            });

            const userBtn = document.querySelector('#user-btn');
            userBtn.addEventListener('click',showDetails);
        }
    } catch (error) {
        alert('Something went Wrong, Try again later');
    }
}

function showDetails(){
    if(localStorage.getItem('role')== 'patient')
        location.href = '/profile/index.html';
    else
        location.href = '/docProfile/index.html';
}




