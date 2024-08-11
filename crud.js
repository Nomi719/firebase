

import {db, app, collection,addDoc, doc, getDocs, updateDoc} from "./firebase.js"

 async function formSubmit(){
    console.log("formSubmit()")
    const obj={
        userName : "Noman"
    }
    // //----normal way 
    //  const userCollection = collection(db, "users")
    //  // addDoc take collection and object
    // addDoc(
    //     userCollection, obj
    // )

    //----we use try catch method 

    try {
        const docRef = await addDoc(collection(db, "users"), obj);
        console.log("docRef", docRef);
    } catch (error) {
        console.log("error", error.message)
        
    }
    
}

const editForm = async ()=>{
    try {
        //doc takes 3 values 'db, db name, id'
        const userCollection = doc(db, "users", "5sDrrpfzLF5B0UBaZXGd")
        await updateDoc (userCollection, {
            userName : "Noman khan"
        })

        
    } catch (error) {
        console.log("error,", error.message)
        
    }
}

//Read Data
//jb jb page reload hoga function work krta rhega--------//
window.addEventListener("load", async ()=>{
    try {
        const querySnapshot = await getDocs(collection(db, "users"))
        querySnapshot.forEach((doc) => {
            console.log("doc", doc.data())

            
        });

        
    } catch (error) {
        console.log("error")
        
    }
})

// using instead of event listner and get element by id or calling events
window.editForm = editForm
window.formSubmit = formSubmit