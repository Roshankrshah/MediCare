const logoutBtn = document.querySelector('.logout-btn');
const deleteBtn = document.querySelector('.delete-btn');
const inputUsername = document.getElementById('InputUsername');
const inputPhone = document.getElementById('InputPhone');
const inputEmail = document.getElementById('InputEmail');
const inputBio = document.getElementById('InputBio');
const inputGender = document.getElementById('InputGender');
const inputSpecialization = document.getElementById('InputSpecialization');
const inputPrice = document.getElementById('InputPrice');
const inputAbout = document.getElementById('InputAbout');
var educationFields = document.getElementById('educationFields');
var educations = educationFields.getElementsByClassName('education');
const alertMsg = document.querySelector('.alert-msg');

const optionList = document.querySelector('.option-list');
const btns = optionList.querySelectorAll('li');
const contents = document.querySelectorAll('.content');

logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    location.href = '/index.html';
});

deleteBtn.addEventListener('click', async () => {
    try {
        const deleteRes = await fetch(`http://localhost:3245/api/v1/doctor/${resData.data._id}`, {
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

let res = '', resData = '';

const start = async () => {
    const Overview = document.getElementById('Overview');
    Overview.classList.add("active");
    try {
        res = await fetch(`http://localhost:3245/api/v1/doctor/profile/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        resData = await res.json();
        if (resData.success) {
            console.log(resData);
            
            if (resData.data.isApproved == 'pending') {
                alertMsg.innerHTML = `
                <div class="alert alert-info alert-dismissible" role="alert">
                    <div>To get approval please complete your profile.We'll review manually and approve within 3 days.</div>
                </div>`;
            }

            showOverviewContent();
        }
    } catch (error) {
        alert('Something went Wrong,Try Again');
    }
}

optionList.addEventListener('click', (e) => {
    if (e.target.innerText == 'Overview' || e.target.innerText == 'Appointments' || e.target.innerText == 'Profile') {
        btns.forEach((btn) => {
            btn.classList.remove("active");
        })
        e.target.classList.add("active");
        contents.forEach((content) => {
            content.classList.remove("active");
        })
        const element = document.getElementById(e.target.innerText);
        element.classList.add("active");

        if (e.target.innerText == 'Overview') {
            showOverviewContent();
        } else if (e.target.innerText == 'Appointments') {
            showAppointmentContent();
        } else if (e.target.innerText == 'Profile') {
            showProfileContent();
        }
    }
})

start();


const showOverviewContent = () => {
    const name = document.getElementById('name');
    const about = document.getElementById('about');
    const eduContainer = document.querySelector('.edu-container');
    const expContainer = document.querySelector('.exp-container');

    name.innerText = resData.data.name;
    about.innerText = resData.data.about ? resData.data.about : 'Not available';

    if (resData.data.qualifications.length) {
        const eduContent = (resData.data.qualifications).forEach(qual => {
            return `
            <tr>
                <td>
                    ${qual}
                </td>
            </tr>`
        }).join('');

        const eduTable = document.createElement('table');
        eduTable.className = 'edu-table';

        eduTable.innerHTML = eduContent;
        eduContainer.innerHTML = `
        <h4>Education</h4>
        ${eduTable}`;
    } else {
        eduContainer.innerHTML = `
        <h4>Education</h4>
        <p>Not Available</p>`;
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

        expContainer.innerHTML = `
        <h4>Education</h4>
        ${expBlock}`;

    } else {
        expContainer.innerHTML = `
        <h4>Experience</h4>
        <p>Not Available</p>`;
    }
}

function showAppointmentContent(){

}

function showProfileContent(){
    inputUsername.value = resData.data.name;
    inputEmail.value= resData.data.email;
    inputPhone.value = resData.data.phone ? resData.data.phone : '';
    inputBio.innerText = resData.data.bio ? resData.data.bio : '';
    
    const genderOptions = inputGender.querySelectorAll('option');
    genderOptions.forEach(option=>{
        if((option.innerText).toLowerCase() == resData.data.gender){
            option.setAttribute('selected','');
        }
    });

    inputPrice.value= resData.data.ticketPrice ? resData.data.ticketPrice : '';
    inputAbout.innerText = resData.data.about ? resData.data.about : '';
}

const addEdu = document.getElementById('add-edu');
addEdu.addEventListener('click', (e) => {
    e.preventDefault();
    var educationFields = document.getElementById('educationFields');
    var newField = document.createElement('div');
    newField.className = 'education';
    newField.innerHTML = `
                            <div class="col-md-6">
                                <label for="start-date" class="form-label">Start Date</label>
                                <input type="date" placeholder="Starting Date">
                            </div>
                            <div class="col-md-6">
                                <label for="end-date" class="form-label">End Date</label>
                                <input type="date" placeholder="Ending Date" >
                            </div>
                            <div class="col-md-6">
                                <label for="degree" class="form-label">Degree</label>
                                <input type="text" placeholder="Degree">
                            </div>
                            <div class="col-md-6">
                                <label for="university" class="form-label">University</label>
                                <input type="text" placeholder="University">
                            </div>
                            `;

    educationFields.insertBefore(newField, addEdu);
});

const addExp = document.getElementById('add-exp');
addExp.addEventListener('click', (e) => {
    e.preventDefault();
    var experienceFields = document.getElementById('experienceFields');
    var newField = document.createElement('div');
    newField.className = 'experience';
    newField.innerHTML = `
                            <div class="col-md-6">
                                <label for="start-date" class="form-label">Start Date</label>
                                <input type="date" placeholder="Starting Date">
                            </div>
                            <div class="col-md-6">
                                <label for="end-date" class="form-label">End Date</label>
                                <input type="date" placeholder="Ending Date" >
                            </div>
                            <div class="col-md-6">
                                <label for="degree" class="form-label">Degree</label>
                                <input type="text" placeholder="Degree">
                            </div>
                            <div class="col-md-6">
                                <label for="university" class="form-label">University</label>
                                <input type="text" placeholder="University">
                            </div>
                            `;

    experienceFields.insertBefore(newField, addExp);
});

const addTime = document.getElementById('add-time');
addTime.addEventListener('click', (e) => {
    e.preventDefault();
    var timeSlotFields = document.getElementById('timeSlotFields');
    var newField = document.createElement('div');
    newField.className = 'timeSlot';
    newField.innerHTML = `
                            <div class="col-md-6">
                                <label for="day" class="form-label">Day</label>
                                <select class="form-select">
                                    <option selected>Select</option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </div>
                                <div class="col-md-6">
                                <label for="start-time" class="form-label">Start Time</label>
                                <input type="time" placeholder="Starting Time">
                                </div>
                                <div class="col-md-6">
                                <label for="end-time" class="form-label">End Time</label>
                                <input type="time" placeholder="Ending Time" >
                                </div>
                            `;

    timeSlotFields.insertBefore(newField, addTime);
});

const updateBtn = document.querySelector('.update-btn');

updateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    var educationFields = document.getElementById('educationFields');
    var educations = educationFields.getElementsByClassName('education');

    for (var i = 0; i < educations.length; i++) {
        var inputs = educations[i].getElementsByTagName('input');
        var startDate = inputs[0].value;
        var endDate = inputs[1].value;
        var degree = inputs[2].value;
        var university = inputs[3].value;
    }
})