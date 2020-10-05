const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');
const backdrop = document.querySelector('.backdrop');
const errorMsg = document.querySelector('.schedule-maker__errMsg');
const addItemButton = document.querySelector('.schedule-maker-options__add');
const modalCloseButton = document.querySelector('.modal__action--negative');
const modal = document.querySelector('.modal');
const modalSubmit = document.querySelector('.modal__action');
const scheduleTable = document.querySelector('.schedule-maker__main-table');
const schTitle = document.querySelector('#schedule-title');
const  saveItems = document.querySelector('.schedule-maker-options__save');
const addItemsForm = document.querySelector('.add-items-form');
const itemTitle = document.getElementById('title');
const itemDay = document.getElementById('day');
const startTimeHour = document.querySelector('.startTimeHH');
const startTimeMin = document.querySelector('.startTimeMM')
const startTimeAP = document.querySelectorAll('#start_time');
const endTimeHour = document.querySelector('.endTimeHH');
const endTimeMin = document.querySelector('.endTimeMM');
const endTimeAP = document.querySelectorAll('#end_time');
const itemDescription = document.getElementById('description');
const important = document.getElementById('important');
const itemFormErrMsg = document.querySelector('.add-items-form__error-message');
const deleteButton = document.querySelector('.schedule-maker-options__delete');

toggleButton.addEventListener('click',()=>{
    // e.preventDefault();
    mobileNav.style.display = 'block';
    backdrop.style.display = 'block';
})

backdrop.addEventListener('click',()=>{
    mobileNav.style.display = 'none';
    backdrop.style.display = 'none';  
})

let formChanged = false;
let count=0;
const schedule = {
    scheduleTitle: '',
    items: []
};


addItemsForm.addEventListener('change', () => formChanged = true);
window.addEventListener('beforeunload', (event) => {
  if (formChanged) {
    event.returnValue = 'Are you sure you want to leave this page?Your changes will not be saved!';
  }
});

modalSubmit.addEventListener('click',e=>{
    e.preventDefault();
    let start_APValue,end_APValue,imp;
    let item = {};
    // console.log('Test1');
    Array.from(startTimeAP).map(AP=>{
        if(AP.checked) start_APValue = AP.value;
    })
    Array.from(endTimeAP).map(AP=>{
        if(AP.checked) end_APValue = AP.value;
    })
    // console.log(itemDescription.value);
    if(!itemTitle.value||!itemDay.value||!startTimeHour.value||!startTimeMin.value||!start_APValue||!end_APValue||!endTimeHour.value||!endTimeMin.value||!itemDescription.value){//||important.value){
        itemFormErrMsg.style.display = 'block';
        itemFormErrMsg.innerText = 'Please Fill all the fields';
        // console.log('Test2');
    }
    else if(!Number.isInteger(+startTimeHour.value)||!Number.isInteger(+startTimeMin.value)||!Number.isInteger(+endTimeHour.value)||!Number.isInteger(+endTimeMin.value)){
        itemFormErrMsg.style.display = 'block';
        itemFormErrMsg.innerText = 'Enter valid Time values';
    }
    else if((start_APValue==end_APValue&&+startTimeHour.value%12>+endTimeHour.value%12)||(start_APValue==end_APValue&&+startTimeHour.value==+endTimeHour.value&&+startTimeMin.value>+endTimeMin.value)){
        itemFormErrMsg.style.display = 'block';
        itemFormErrMsg.innerText = 'Enter valid Time values';
    }
    else if(!(startTimeHour.value>0&&startTimeHour.value<=12)||!(endTimeHour.value>0&&endTimeHour.value<=12)||!(startTimeMin.value>=0&&startTimeMin.value<=60)||!(endTimeMin.value>=0&&endTimeMin.value<=60)){
        itemFormErrMsg.style.display = 'block';
        itemFormErrMsg.innerText = 'Enter valid Time values';
    }
    else{
        if(important.checked) imp = true;
        else imp = false;
        item.id = Math.random();
        item.title =(itemTitle.value.trim().replace('<','&lt').replace('>','&gt'));
        item.day =  (itemDay.value.trim());
        item.startTime = (startTimeHour.value.trim()+':'+startTimeMin.value.trim()+' '+start_APValue);
        item.endTime = (endTimeHour.value.trim()+':'+endTimeMin.value.trim()+' '+end_APValue);
        item.description = (itemDescription.value.trim().replace('<','&lt').replace('>','&gt'));
        item.important = imp;
        schedule.items.push(item);
        console.log(schedule);
        let className = !item.important?"none":"important";
        let dayRow = document.getElementById(item.day);
        // dayRow.innerHTML='';
        let cell = document.createElement("td");
        cell.classList.add(className);
        cell.innerHTML = `${item.title} <i class="fa fa-minus-circle delete" id=${item.id} aria-hidden="true"></i><br>${item.startTime}-${item.endTime}`;
        dayRow.appendChild(cell);
        count++;
        itemFormErrMsg.style.display = 'none';
        backdrop.style.display = 'none';
        modal.style.display = 'none';
        errorMsg.style.display = 'none';
    }
})

addItemButton.addEventListener('click',e=>{
    e.preventDefault();
    modal.style.display = 'block';
    backdrop.style.display = 'block';
})

backdrop.addEventListener('click',e=>{
    e.preventDefault();
    backdrop.style.display = 'none';
    modal.style.display = 'none';
})

modalCloseButton.addEventListener('click',e=>{
    e.preventDefault();
    modal.style.display = 'none';
    backdrop.style.display = 'none';
})

deleteButton.addEventListener('click',e=>{
    // if(e.target.classList.contains)
    if(schedule.items.length>0){
        let deleteIcon = document.querySelectorAll('.delete');
        // console.log(deleteIcon);
        Array.from(deleteIcon).map(icon=>{
            icon.style.display='inline';
        })
        scheduleTable.addEventListener('click',e=>{
            if(e.target.classList.contains('delete')){
                // console.log(e.target);
                // console.log(e.target.id);
                let arr = schedule.items.filter(item=>{
                    // console.log(item.id,e.target.id)
                    return item.id!=e.target.id
                });
                schedule.items = arr;
                // console.log(arr);
                console.log(schedule);
                e.target.parentElement.remove();
                Array.from(deleteIcon).map(icon=>{
                    icon.style.display='none';
                })
                count--;
            }
        })
    }
})

saveItems.addEventListener('click',()=>{
    if(!schTitle.value){
        errorMsg.style.display = 'block';
        errorMsg.innerText = 'Please add a title';
    }
    else if(count<=0){
        errorMsg.style.display = 'block';
        errorMsg.innerText = 'Please add your schedule';
    }
    else{
        schedule.scheduleTitle = schTitle.value.trim().replace('<','&lt').replace('>','&gt');
        console.log(schedule);
        fetch('/submitSchedule',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(schedule)
        })
        .then(res=>{
            if(res.status===200||res.status===201){
                document.querySelector('.schedule-maker__successMsg').style.display = 'block';
                errorMsg.style.display = 'none';
                schTitle.value = '';
                formChanged = false;
                window.location.replace(window.location.origin+'/schedulemaker');
                //have to add redirection
            }else{
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Failed to save schedule,please try again';
            }
        })
    }
})




