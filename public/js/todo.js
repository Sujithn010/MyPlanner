const todoInput = document.querySelector('.todo-form-input');
const list = document.querySelector('.todo-list-items');
const addTodo = document.querySelector('.todo-form-addTodo');
const form = document.querySelector('.todo-form');
const todoItemList = document.querySelector('.todo-list-items');
let errMsg = document.querySelector('.todo-list-errMsg');

let formChanged = false;
form.addEventListener('change', () => formChanged = true);

const generateTemplate =  todo => {
    let sanitizedHTML = todo.replace('<','&lt').replace('>','&gt');
    const html = 
    `   <li class="todo-list-item">
            <span> ${sanitizedHTML}</span>
            <i class="fa fa-minus-circle delete" aria-hidden="true"></i>
        </li>   
    `;
    list.innerHTML += html;
};

addTodo.addEventListener('click', e=>{
    e.preventDefault();
    const todo = todoInput.value.trim();
    //console.log(todo);
    if(todo.length){
        errMsg.style.display = 'none';
        todoItemList.style.display = 'block';
        generateTemplate(todo);
        todoInput.value = "";  
    }  
});

list.addEventListener('click',e=>{
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

const todoList = {title: '',items:[]};

form.addEventListener('submit',e=>{
    e.preventDefault();
    if(list.children.length<1){
        errMsg.style.display = 'block';
        errMsg.textContent = 'Please fill your todo list';
    }
    else if(!form.title.value){
        errMsg.style.display = 'block';
        errMsg.textContent = 'Please add a title';
    }
    else{
        Array.from(list.children).map(li=>{
            // console.log(li.firstChild);
            todoList.items.push(li.textContent.trim());
        });
        errMsg.style.display = 'none';
        todoList.title = form.title.value.trim();
        console.log(todoList);   
        fetch('/submitTodo',{
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify(todoList),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            if(res.status===200||res.status===201){
                document.querySelector('.todo-list-successMsg').style.display = 'block';
                list.innerHTML = '';
                form.title.value = '';
                formChanged = false;
            }else{
                errMsg.style.display = 'block';
                errMsg.textContent = 'Failed to save list,please try again';
            }
        }) 
        .catch(err=>console.log(err));
    }
})  

window.addEventListener('beforeunload', (event) => {
  if (formChanged) {
    event.returnValue = 'Are you sure you want to leave this page?Your changes will not be saved!';
  }
});