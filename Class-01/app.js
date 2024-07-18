
//  Firease Imp URLs

// https://firebase.google.com/docs/web/setup

// https://firebase.google.com/docs/auth/web/start

import { app, db, collection, getDocs, addDoc } from "./firebase.js";

const submitbtn = document.getElementById("submitbtn")

submitbtn.addEventListener("click", async() =>{
    console.log("formsubmit")

    const todoObj = {
                todo: "HELLO WORLD"
            }

            // collection(kaha create karo , kis name sy)
    // First we create Firestore collection
    const todoCollection = collection(db, "todo")
    // then we add document to collection

    // add doc on firestore
    // addDoc(collection, obj)
    const response = await addDoc(todoCollection, todoObj)
        console.log(response, "response")
})

window.addEventListener("load", async () => {
    const querySnapshot = await getDocs(collection(db, "todo"))
    querySnapshot.forEach((doc) => {
        console.log("doc", doc.data(), doc.id) 
    })
})

// const formSubmit = document.getElementById("formSubmit")
// formSubmit.addEventListener("click", async() => {
//     console.log("formsubmit")
//     const name = document.getElementById("name")
//     const email = document.getElementById("email")
//     const password = document.getElementById("password")

//     console.log(name.value, email.value, password.value)
//     const userObj = {
//         name: name.value,
//         email: email.value,
//         password: password.value,
//     }
//     const usercollection = collection(db, "user")
//            const response = await addDoc(usercollection, userObj)

//            console.log(response, "response")


// })


