import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ae129-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const imgEl = document.getElementById("img")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    inputFieldEl.value = ""
})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let item = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i=0; i<item.length; i++){
            appendItemtoShoppingListEl(item[i])
        }
        imgEl.src = "https://media2.giphy.com/media/m9roRRfd5XP6RHMDo7/giphy.gif?cid=6c09b952xxh9c2zeelyujd0czfm5j79ezrqrm9yydezd367b&ep=v1_stickers_related&rid=giphy.gif&ct=s"
    }
    else{
        clearShoppingListEl()
        imgEl.src = "https://pngfre.com/wp-content/uploads/cat-95-1024x985.png"
    }
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}


function appendItemtoShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("dblclick", function(){
        let itemLocation = ref(database, `shoppingList/${itemID}`)
        remove(itemLocation)
    })
    shoppingListEl.append(newEl)
}