/* Seleção de elementos*/

const todoForm = document.querySelector('#todo_form');
const inputForm = document.querySelector('#input_todo');
const todoEditForm = document.querySelector('.todo_form_edit');
const todoEditInput = document.querySelector('#input_todo_editar');
const buttonCancel = document.querySelector('#cancel-edit');
const todoTarefasLista = document.querySelector('#todo_tarefas');
let oldInputValue;

/* Funções*/

//função de adicionar tarefas
function saveTodo(text)
{
    const todo = document.createElement('div');
    todo.classList.add('todo_tarefas');
    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const buttonTodo = document.createElement('button');
    buttonTodo.classList.add('todo_check');
    buttonTodo.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(buttonTodo);

    const editTodo = document.createElement('button');
    editTodo.classList.add('todo_edit');
    editTodo.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editTodo);

    const removeTodo = document.createElement('button');
    removeTodo.classList.add('todo_remove');
    removeTodo.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeTodo);

    todoTarefasLista.appendChild(todo)

    inputForm.value =""
    inputForm.focus();
}

//função de abrir o editor de tarefas e sumir com a tela inicial e vice versa
function toggleForms() {
    todoEditForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoTarefasLista.classList.toggle('hide');
}

//função para salver o texto da tarefa salva e aparecer no editor
function updateTodo(texto){

    const todos = document.querySelectorAll(".todo_tarefas");

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector('h3');
       
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = texto;
        }
    })
}

/* Eventos */

//adicionar tarefas
todoForm.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const inputValue = inputForm.value

    if(inputValue){
        saveTodo(inputValue);
    }
})

//editar tarefas: Concluir, editar e remover
document.addEventListener('click',(e)=>
{
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;
    
    if(parentEl && parentEl.querySelector('h3'))
    {
        todoTitle = parentEl.querySelector('h3').innerText;
    }
    
    if(targetEl.classList.contains('todo_check')){
        parentEl.classList.toggle('done');
    }
    if(targetEl.classList.contains("todo_remove"))
    {
        parentEl.remove();  
    }   
    if(targetEl.classList.contains("todo_edit")){
        toggleForms()
        todoEditInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

buttonCancel.addEventListener('click',(e) =>
{
    e.preventDefault();
    toggleForms();
})

todoEditForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const editInputValue = todoEditInput.value;
    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
})