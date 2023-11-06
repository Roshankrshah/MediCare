const loginBtn = document.querySelector('.login-btn');
const dynSlot = document.querySelector('.dyn-slot');

loginBtn.addEventListener('click',()=>{
    location.href = '/login/index.html';
});

if(localStorage.getItem('token')){
    dynSlot.innerHTML = `
        <button class="btn logout-btn" style="background:red;">Logout</button>`;
    
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click',()=>{
        localStorage.clear();
        location.reload();
    })
}




