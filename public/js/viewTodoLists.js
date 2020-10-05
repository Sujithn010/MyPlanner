deleteList = (btn) => {
    const listId = btn.parentElement.querySelector('[name=listId]').value;
    console.log('Clicked-'+listId);
    fetch('/deleteTodoList/'+listId,{
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