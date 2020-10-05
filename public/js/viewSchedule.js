let id=0;

view = (btn) => {
    const schId = btn.querySelector("[name=schId]").value;
    if(id!==0&&id!=schId){
        document.getElementById(id).style.display = 'none';
    }
    id = schId;
    const schedule = document.getElementById(schId);
    schedule.style.display = 'block';
}

let deleteSchedule = btn => {
    const schId = btn.parentElement.querySelector('[name=schId]').value;
    console.log('Clicked-'+schId);
    fetch('/deleteSchedule/'+schId,{
        method: 'DELETE'
    })
    .then(res=>{
        if(res.status==200){
            console.log('Deleted');
            btn.parentNode.remove();
        }
    })
    .catch(err=>{
        console.log(err)
    })
}