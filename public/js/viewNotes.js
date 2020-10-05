
deleteNote = (btn) => {
    const noteId = btn.parentElement.querySelector('[name=noteId]').value;
    // console.log('Clicked-'+noteId);
    fetch('/deleteNote/'+noteId,{
        method: 'DELETE'
    })
    .then(res=>{
        if(res.status==200){
            // console.log('Deleted');
            btn.parentNode.remove();
        }
    })
    .catch(err=>{
        console.log(err) 
    })
}