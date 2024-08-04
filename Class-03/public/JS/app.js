window.addEventListener("load", () => {
    console.log(localStorage.getItem("user"));
    if (!localStorage.getItem("user")) {
      window.location.replace("../index.html");
    }
  });



import { addDoc, collection, db, deleteDoc, doc, getDocs, updateDoc, getDoc,storage, ref, uploadBytesResumable, getDownloadURL } from "./firebase.js"

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
      window.location.href = "../index.html";
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
      window.location.replace("../index.html");
    };
    
    //-------------profile upload--------------//


      const uploadProfilePic = async (e) => {
        try {
          const storageRef = ref(storage,`images/${localStorage.getItem("user")}`)

            // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
  };

  // Upload the file and metadata
  let uploadTask = await uploadBytes(storageRef, e.target.files[0], metadata)

  window.location.reload()
      
        } catch (error) {
          alert(error.message)
          
        }
        }


        const getProfileImg = async () => {
          try {
              const profileImage1 = document.querySelector("#profileImage1");
              const storageRef = ref(storage, `images/${localStorage.getItem("user")}`);
              const url = await getDownloadURL(storageRef)
              profileImage1.src = `${url}`
      
      
          } catch (error) {
              profileImage1.classList.add("d-none")
              profileImage1.parentNode.style.background = "green"
              
          }
      }

      const inputInvoke = () => {
        const fileInput = document.querySelector("#fileInput")
        fileInput.click()
    }
      //---------------imageupload through storage======//

      const inputImg = async (element) => {
        console.log("inputImg", element.files[0]);
        const file = element.files[0];

          // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

   // Upload file and metadata to the object 'images/mountains.jpg'
   const storageRef = ref(storage, "images/" + file.name);
   const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("error", error);
      },
      () => {
         // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        // user updatez`
      });
    }
  );
};







window.addEventListener("load", getTodos)
window.addTodo = addTodo
window.editTodo = editTodo
window.deleteTodo = deleteTodo
window.deleteAllTodo = deleteAllTodo
window.logoutBtn = logoutBtn
window.inputImg = inputImg
window.uploadProfilePic = uploadProfilePic
window.getProfileImg = getProfileImg







// ---------------------------end--------------------


