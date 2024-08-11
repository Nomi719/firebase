import { addDoc, collection, db, deleteDoc, doc, getDocs, updateDoc } from "./firebase.js"

const todoCollection = collection(db, "todos")
const todoParent = document.querySelector(".parent")
console.log("todoParent", todoParent)


// ---------------------Create method-----------------------//

const addTodo = async () =>{
    try {
        const todoInput = document.getElementById("input")
        console.log("todoInput", todoInput.value)

        const todoObj = {
            value : todoInput.value
        }

        const response = await addDoc(todoCollection, todoObj)
        getTodos()
        console.log("response", response.id)
        
    } catch (error) {
        console.log("error", error.message)
        
    }

}

//--------------------------Read method--------------------------//
    //get or load event

    const getTodos= async () =>{
        try {
            const querySnapshot = await getDocs(todoCollection)
            let todoArr = []
              // 1 way
        // querySnapshot.forEach((doc) => {
        //     const obj = {
        //         id: doc.id,
        //         ...doc.data()
        //     }
        //     todoArr.push(obj)

        // })

        // for (var obj of todoArr) {
        //     todoParent.innerHTML += `<div class="card my-3 " style="width: 18rem;">
        //         <div class="card-body">
        //             <h5 class="card-title"> ${obj.value} </h5>
        //             <button class="btn btn-info">EDIT</button>
        //             <button class="btn btn-danger">delete</button>
        //         </div>
        //     </div>`
        // }

        todoParent.innerHTML = ""
        querySnapshot.forEach((doc) => {
            const obj = {
                id: doc.id,
                ...doc.data()
                }
                todoArr.push(obj)
                todoParent.innerHTML += `<div class="card my-3 " style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title"> ${obj.value} </h5>
                    <button class="btn btn-info" id=${obj.id} onclick="editTodo(this)"> EDIT</button>
                    <button class="btn btn-danger" id=${obj.id} onclick="deleteTodo(this)">delete</button>
                </div>
            </div>`
                })




        } catch (error) {
            console.log("error", error.message)
            
        }

    }

    //-------------------Delete method------------------------//

    const deleteTodo = async (ele) => {
        console.log("deleteTodo", ele.id)
        try {
            await deleteDoc(doc(db, "todos", ele.id))
            getTodos()
        } catch (error) {
            console.log("error", error.message)
        }
    }

    //-----------------Edit or update method---------------------------------//

    const editTodo = async (ele) => {
        console.log("editTodo", ele.id)
        const todoId = ele.id
        const todoValue = prompt("Enter new todo value")
        try {
            await updateDoc(doc(db, "todos", todoId), {
                value: todoValue
                })
                getTodos()
                } catch (error) {
                    console.log("error", error.message)
                    }
                    }

     //---------------deleteAllTodo----------------------------//

    const deleteAllTodo = async () =>{

        try{
            
            todoParent.innerHTML = ""
           
            }catch(error){
                console.log("error", error.message)
                }
    }



window.addEventListener("load", getTodos)
window.addTodo = addTodo
window.editTodo = editTodo
window.deleteTodo = deleteTodo
window.deleteAllTodo = deleteAllTodo