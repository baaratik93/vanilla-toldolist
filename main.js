import './style.css'
let SingleTodo ;
const div = document.querySelector('ul')
const todo = [{
  name:'Développer le header',
  status: 'loading'

},
{
  name:'Design du html',
  status: 'completed'
}];
const input = document.querySelector('input')
const btn = document.querySelector('button')
const dialog = document.querySelector('dialog')
const dialogInput = document.querySelector('dialog > input')
const dialogBtn = document.querySelector('dialog > button')

btn.disabled = true
const Edit = (id) => {
  dialogInput.value = todo[id].name
  dialogInput.placeholder = id
  dialog.showModal()
  Initialiser()
}


const CleanTableau = () => {
  div.textContent=''
}


const submitDialog = (e) => {
  e.preventDefault()
  // Chercher le single todo
  const single = todo[dialogInput.placeholder]
  single.name = dialogInput.value
  todo[dialogInput] = single
  Initialiser()
  dialog.close()
}
const listerTableau = () => {
  CleanTableau()
  todo.map((t,i) => {
  div.innerHTML += `
    <li style="${t.status=='completed' && 'text-decoration: line-through; background: tomato;'}">
      <span>
      <div class='list'>
        ${t.name}
      </div>
        <button class='btn' value=${i}>❌</button>
        <button class='btne' value=${i}>✏</button>
        <input class='check' value=${i} ${t.status=='completed' && 'checked'} type="checkbox">
      </span> 
    </li>
    `
})
}
listerTableau()

      
const Initialiser = () => {
  CleanTableau()
  listerTableau()
  HandledTodos()
  HandledTodosEdit()
  HandledTodosChecked()
  
}
const Suppr = (id) => {
  todo.splice(id,1)
  Initialiser()
}
const HandledTodos = () => {
  document.querySelectorAll('.wrapper ul li  span .btn')
.forEach(b => { 
      b.addEventListener('click', e => {
        e.preventDefault()
        Suppr(e.target.value)
        Initialiser()
      })
    })
}

const HandledTodosEdit = () => {
  document.querySelectorAll('.wrapper ul li  span .btne')
.forEach(b => { 
      b.addEventListener('click', e => {
        e.preventDefault()
        Edit(e.target.value)
        Initialiser()
      })
    })
}

const HandledTodosChecked = () => {
  document.querySelectorAll('.wrapper ul li  span .check')
.forEach(b => {
      b.addEventListener('change', e => {
        e.preventDefault()
        todo[e.target.value].status = e.target.checked ?  'completed' : 'loading'
        Initialiser()
      })
      
    })
}

const HandleClick = e => {
    e.preventDefault();
    todo.unshift({
      name: SingleTodo,
      status: 'loading'
    })
    input.value =''
    btn.disabled = true
    Initialiser()
    HandledTodosChecked()
  }

const HandleInput = (e) => {
        e.preventDefault();
        btn.disabled = false
        SingleTodo = e.target.value
      }
  document.querySelectorAll('.wrapper ul li').forEach(f => {
    console.log(f)
  })
  Initialiser()
  input.addEventListener('change', HandleInput)
  btn.addEventListener('click', HandleClick)
  dialogBtn.addEventListener('click', submitDialog)
