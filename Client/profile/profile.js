const profileContainer = document.querySelector('.profile-container');
const detailsContainer = document.querySelector('.details-container');

const start = async () => {

    if (localStorage.getItem('role') === 'patient') {

        try {
            const res = await fetch(`http://localhost:3245/api/v1/user/profile/me`, {
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

                deleteBtn.addEventListener('click', async () => {
                    try {
                        const deleteRes = await fetch(`http://localhost:3245/api/v1/user/${resData.data._id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        });

                        const deleteResdata = await deleteRes.json();
                        alert(deleteResdata.message);
                        localStorage.clear();
                        location.href = '/index.html';
                    } catch (error) {
                        alert('Something went wrong, Try again');
                    }
                });

                profile.addEventListener('click', showProfile(resData));
            }
        } catch (error) {
            alert('Something went Wrong, Try again later');
        }
    }
    else {
        console.log('hi');
        try {
            const res = await fetch(`http://localhost:3245/api/v1/doctor/profile/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const resData = await res.json();
            if (resData.success) {
                console.log(resData);
                profileContainer.innerHTML = `
                <ul class="option-list">
                    <li>Overview</li>
                    <li>Appointments</li>
                    <li>Profile</li>
                </ul>
                <div class="btn-container">
                    <button class="logout-btn">Logout</button>
                    <button class="delete-btn">Delete Account</button>
                </div>`;

                const optionList = document.querySelector('.option-list');

                optionList.addEventListener('click', (e) => {
                    console.log(e.target.innerText);
                    if (resData.data.isApproved == 'pending') {
                        detailsContainer.innerHTML = `
                        <div class="alert alert-info alert-dismissible" role="alert">
                            <div>To get approval please complete your profile.We'll review manually and approve within 3 days.</div>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
                    }
                    const divEle = document.createElement('div');
                    divEle.className = 'inner-container';

                    if (e.target.innerText == 'Overview') {
                        divEle.innerHTML = `
                            <h4>About of ${resData.data.name}</h4>
                            <p>${resData.data.about ? resData.data.about : 'Not available'}</p>
                            <div class= "edu-container">
                                <h4>Education</h4>
                            </div>
                            <div class= "exp-container">
                                <h4>Experience</h4>
                            </div>`;

                        detailsContainer.appendChild(divEle);

                        const eduContainer = document.querySelector('.edu-container');
                        const expContainer = document.querySelector('.exp-container');

                        if (resData.data.qualifications.length) {
                            const eduContent = (resData.data.qualifications).forEach(qual => {
                                return `<tr>
                                        <td>
                                            ${qual}
                                        </td>
                                    </tr>`
                            }).join('');

                            const eduTable = document.createElement('table');
                            eduTable.className = 'edu-table';

                            eduTable.innerHTML = eduContent;
                            eduContainer.appendChild(eduTable);
                        } else {
                            const pTag = document.createElement('p');
                            pTag.innerText = 'Not Available';
                            eduContainer.appendChild(pTag);
                        }

                        if (resData.data.experiences.length) {
                            const expContent = (resData.data.experiences).forEach(exp => {
                                return `
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                          </div>`
                            }).join('');

                            const expBlock = document.createElement('div');
                            expBlock.className = 'exp-block';

                            expBlock.innerHTML = expContent;

                            expContainer.appendChild(expBlock);

                        } else {
                            const pTag = document.createElement('p');
                            pTag.innerText = 'Not Available';
                            expContainer.appendChild(pTag);
                        }

                    } else if (e.target.innerText == 'Appointments') {

                    } else if (e.target.innerText == 'Profile') {
                        divEle.innerHTML = `
                        <h1>Profile Details</h1>
                        <form class="row g-3">
                            <div class="col-md-12">
                                <label for="Username" class="form-label">Name</label>
                                <input type="text" class="form-control" id="InputUsername" value=${resData.data.name}>
                            </div>
                            <div class="col-md-12">
                                <label for="Email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="InputEmail" value=${resData.data.email} disabled>
                            </div>
  
                            <div class="col-12">
                                <label for="Phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" placeholder="Enter your Phone number" id="InputPhone" value=${resData.data.phone ? resData.data.phone : ''}>
                            </div>
                            <div class="col-12">
                                <label for="inputAddress2" class="form-label">Bio</label>
                                <textarea class="form-control" placeholder="Enter your Bio" name="Bio" id="InputBio" rows="3">${resData.data.bio ? resData.data.bio : ''}</textarea>
                            </div>
                            <div class="col-md-4">
                                <label for="gender" class="form-label">Gender</label>
                                <select id="InputGender" class="form-select">
                                    <option value="male" ${resData.data.gender === 'male' ? 'selected' : ''}>Male</option>
                                    <option value="female" ${resData.data.gender === 'female' ? 'selected' : ''}>Female</option>
                                    <option value="other" ${resData.data.gender === 'other' ? 'selected' : ''}>Other</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="Specialization" class="form-label">Specialization</label>
                                <select id="InputSpecialization" class="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label for="Price" class="form-label">Fee</label>
                                <input type="number" placeholder="Enter Fee" id="InputPrice" value=${resData.data.ticketPrice ? resData.data.ticketPrice : ''}>
                            </div>
                            <div id="educationFields">
                            <div class="education">
                                <input type="date" placeholder="Starting Date">
                                <input type="date" placeholder="Ending Date">
                                <input type="text" placeholder="Degree">
                                <input type="text" placeholder="University">
                            </div>
                            <button onclick="addEducationField()">Add More Education Field</button>
                            </div>`;
                    
                        detailsContainer.appendChild(divEle);
                    }
                })
            }
        } catch (error) {

        }
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
                    <option value="male" ${resData.data.gender === 'male' ? 'selected' : ''}>Male</option>
                    <option value="female" ${resData.data.gender === 'female' ? 'selected' : ''}>Female</option>
                    <option value="other" ${resData.data.gender === 'other' ? 'selected' : ''}>Other</option>
                </select>
        </div>
        <button class="update-btn"> Update Profile</button>`;
    detailsContainer.appendChild(divEle);

    const updateBtn = document.querySelector('.update-btn');
    const inputName = document.getElementById('InputUsername');
    const inputPhone = document.getElementById('InputPhone');
    const inputBlood = document.getElementById('InputBloodGroup');
    const inputGender = document.getElementById('InputGender');

    updateBtn.addEventListener('click', async () => {
        const name = inputName.value, phone = inputPhone.value, blood = inputBlood.value,
            gender = inputGender.value;

        const body = {
            name,
            gender
        }

        if (phone !== '')
            body.phone = phone;

        if (blood !== '')
            body.bloodType = blood;

        try {
            const updateRes = await fetch(`http://localhost:3245/api/v1/user/${resData.data._id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const updateResdata = await updateRes.json();
            alert(updateResdata.message);
        } catch (error) {
            alert('Something went wrong, Try again');
        }
    })
}