window.addEventListener("load", () => {
    console.log(localStorage.getItem("user"));
    if (!localStorage.getItem("user")) {
      window.location.replace("../Pages/login.html");
    }
  });



import { addDoc, collection, db, deleteDoc, doc, getDocs, updateDoc, getDoc } from "./firebase.js"

const todoCollection = collection(db, "todos")
const todoParent = document.querySelector(".parent")
console.log("todoParent", todoParent)


// ---------------------Create method-----------------------//

const addTodo = async () => {
        try {
          const todoInput = document.getElementById("input");
          console.log("todoInput", todoInput.value);
          if (todoInput.value.length < 3) {
            alert("Enter correct value");
            return;
          }
          const todoObj = {
            value: todoInput.value,
          };
      
          const res = await addDoc(todoCollection, todoObj);
          getTodos();     
          console.log("res", res.id);
        } catch (error) {
          console.log("error", error.message);
        }
      };

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

        
        // 2 way
        todoParent.innerHTML = ""
        querySnapshot.forEach((doc) => {
          const obj = {
            id: doc.id,
            ...doc.data()
          }
          todoArr.push(obj)
          // console.log("obj", obj)
          // todoParent.innerHTML += `<div class="card my-3 " style="width: 18rem;">
          //     <div class="card-body">
          //        <div> <h5 class="card-title"> ${obj.value} </h5></div>
          //         <div><button class="btn btn-info" id=${obj.id}  onclick="editTodo(this)">EDIT</button>
          //         <button class="btn btn-danger" id=${obj.id}  onclick="deleteTodo(this)" >delete</button></div>
          //     </div>
          // </div>`
        })
        
        for (let obj of todoArr) {
          todoParent.innerHTML += ` <li class="list my-2 d-flex justify-content-center align-items-center gap-2 flex-wrap">
                  <div><input type="text" class=" parent form-control col-auto fw-bold " id= "listinput" disabled value="${obj.value}" ></div>
                  <div><button class="btn btn-outline-success btnMS" id=${obj.id} onclick = "editTodo(this)">Edit</button>
                  <button class="btn btn-outline-danger btnMS" id=${obj.id} onclick ="deleteTodo(this)">Delete</button></div>
              </li>`
          // todoParent.innerHTML += list
      }

        } catch (error) {
            console.log("error", error.message)
            
        }

    }


//-------------profile--------//

window.addEventListener("load", async()=>{
  if(!localStorage.getItem("user")){
      window.location.href = "login.html";
  }

console.log(localStorage.getItem("user"))

// get user Data on firestore
const userID = localStorage.getItem("user");
const response = await getDoc(doc(db, "users", userID));
console.log("response", response.data());
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const gender = document.querySelector("#gender");
name.innerHTML = `${response.data().fullName  }`;
email.value = `${response.data().email}`;
gender.value = `${response.data().gender}`;
}); 

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

        // try{
        //     todoParent.innerHTML = ""
           
        //     }catch(error){
        //         console.log("error", error.message)
        //         }
        try {
          let querySnapshot = await getDocs(collection(db, "todos"));
          querySnapshot.forEach(async (doc) => {

                await deleteDoc(doc.ref);
              });
          getTodos()
          
      } catch (error) {
          alert(error.message)
      }
    }

    const logoutBtn = () => {
        localStorage.removeItem("user");
        localStorage.clear();
        window.location.replace("../Pages/login.html");
      };
      

window.addEventListener("load", getTodos)
window.addTodo = addTodo
window.editTodo = editTodo
window.deleteTodo = deleteTodo
window.deleteAllTodo = deleteAllTodo
window.logoutBtn = logoutBtn







// ---------------------------end--------------------


