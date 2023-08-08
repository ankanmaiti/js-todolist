const todoInput = document.querySelector('[data-input]')
const todos = document.querySelector('[data-todos]')
const todoElements = document.querySelectorAll(`[data-todo-id]`)

let todoList = []


const addTodoElement = ({ todo, id }) => {
    const todoElement = document.createElement('li')
    todoElement.textContent = todo
    todoElement.setAttribute('data-todo-id', id)

    todoElement.addEventListener('dblclick', () => {
        deleteTodo(id)
        removeTodoElement(id)
    })
    todos.insertAdjacentElement('afterbegin', todoElement)
}

const removeTodoElement = (id) => {
    const delTask = document.querySelector(`[data-todo-id='${id}']`)
    delTask.remove()
}

// pending
// done
const createTodo = (input) => {
    const todo = {
        id: todoList.length + 1,
        todo: input,
        status: 'pending'
    }

    todoList = [...todoList, todo]
    return todo
}

const getTodos = (status = 'pending') => {
    return todoList.filter(todo => todo.status === status)
}

const deleteTodo = (todoId) => {
    todoList = todoList.filter(({ id }) => todoId !== id)
    return todoList
}


const validateInput = (input = '') => {
    const todoRegex = /^[a-zA-Z0-9\s]*$/

    if (todoRegex.test(input)) {
        todoInput.style.setProperty('border', '1px solid white')
        return true
    }
    else {
        todoInput.style.setProperty('border', '1px solid red')
        return false
    }
}


todoInput.addEventListener('keydown', ({ target, key }) => {
    switch (key) {

        case 'Enter':
            if (validateInput(target.value)) {
                const todo = createTodo(target.value)
                addTodoElement(todo)
                todoInput.value = ''
            }
            break

        default:
            validateInput(target.value)
            break
    }
})