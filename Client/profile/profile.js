const profileContainer = document.querySelector('.profile-container');
const detailsContainer = document.querySelector('.details-container');

const start = async () => {
    let endpoint;

    if (localStorage.getItem('role') === 'patient')
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

            logoutBtn.addEventListener('click', () => {
                localStorage.clear();
                location.href = '/index.html';
            });

            deleteBtn.addEventListener('click', () => {

            });

            profile.addEventListener('click', showProfile(resData));
        }
    } catch (error) {
        alert('Something went Wrong, Try again later');
    }
}

start();

const showProfile = (resData) => {
    const divEle = document.createElement('div');
    divEle.className = 'inner-container';
    divEle.innerHTML = `
        <h2>Edit Profile</h2>
        <input type="text" placeholder="Enter your full name" name="Username" id="InputUsername" value=${resData.data.name}>
        <input type="email" placeholder="Enter your email" name="Email" id="InputEmail" value=${resData.data.email} disabled>
        <input type="text" placeholder="Enter your Phone number" name="Phone" id="InputPhone" value=${resData.data.phone ? resData.data.phone : ''}>
        <input type="text" placeholder="Enter your Blood Group" name="BloodGroup" id="InputBloodGroup" value=${resData.data.bloodType ? resData.data.bloodType : ''}>
        <div style="margin-top: 10px;">
            <label for="gender"><strong>Gender: </strong></label>
                <select name="gender" id="InputGender">
                    <option value="male" ${resData.data.gender === 'male'? 'selected': ''}>Male</option>
                    <option value="female" ${resData.data.gender === 'female'? 'selected': ''}>Female</option>
                    <option value="other" ${resData.data.gender === 'other'? 'selected': ''}>Other</option>
                </select>
        </div>
        <button class="update-btn"> Update Profile</button>`;
    detailsContainer.appendChild(divEle);

    const updateBtn = document.querySelector('.update-btn');
    const inputName = document.getElementById('InputUsername');
    const inputPhone = document.getElementById('InputPhone');
    const inputBlood = document.getElementById('InputBloodGroup');
    const inputGender = document.getElementById('InputGender');

    updateBtn.addEventListener('click',async()=>{
        const name = inputName.value, phone = inputPhone.value, blood = inputBlood.value,
        gender = inputGender.value;

        const body = {
            name,
            gender
        }

        if(phone !== '')
            body.phone = phone;
        
        if(blood !== '')
            body.bloodType = blood;
        
        try{
            const updateRes = await fetch(`http://localhost:3245/api/v1/user/${resData.data._id}`,{
                method: 'PUT',
                body: JSON.stringify(body),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const updateResdata = await updateRes.json();
            alert(updateResdata.message);
        }catch(error){
            alert('Something went wrong, Try again');
        }
    })
}