const profileContainer = document.querySelector('.profile-container');
const detailsContainer = document.querySelector('.details-container');


const start = async()=>{
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
            console.log(resData);

            profileContainer.innerHTML = `
                <p>${resData.data.name}</p>
                <p>${resData.data.email}</p>
                <div class="btn-container">
                    <button class="logout-btn">Logout</button>
                    <button class="delete-btn">Delete Account</button>
                </div>`;
            
            detailsContainer.innerHTML = `
                <div>
                    <button class="booking-btn"> My Appointments</button>
                    <button class="profile-btn"> Edit Profile</button>
                </div>`;
            
            const logoutBtn = document.querySelector('.logout-btn');
            const deleteBtn = document.querySelector('.delete-btn');
            const showBooking = document.querySelector('.booking-btn');
            const profile = document.querySelector('.profile-btn');

            logoutBtn.addEventListener('click',()=>{
                localStorage.clear();
                location.href = '/index.html';
            });

            deleteBtn.addEventListener('click',()=>{

            })
        }
    } catch (error) {
        alert('Something went Wrong, Try again later');
    }
}

start();