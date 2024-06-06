import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://endorsement-3b728-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "publications")

onValue(endorsementInDB, function(snapshot) {
  if (snapshot.exists()) {
    let itemArr = Object.entries(snapshot.val())
    cleanEndorsementWrap()
    for (let i = 0; i < itemArr.length; i++) {
      let currentItem = itemArr[i]
      renderEndorsement(currentItem)
    }
  } else {
    endorsementWrap.innerHTML = `No endorsement yet.`
  }
})


const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")

const endorsementWrap = document.getElementById("endorsement-wrap")

publishBtn.addEventListener("click", function() {
  let inputValue = inputEl.value
  push(endorsementInDB, inputValue)
  cleanInput()
})

function renderEndorsement(item) {
  let itemID = item[0]
  let itemValue = item[1]

  const LI = document.createElement("LI")
  LI.classList.add("endorsement__item")
  LI.textContent = itemValue

  LI.addEventListener("click", function() {
    let exactLocationInDB = ref(database, `publications/${itemID}`)
    remove(exactLocationInDB)
  })

  endorsementWrap.append(LI)
}
function cleanEndorsementWrap() {
  endorsementWrap.innerHTML = ""
}
function cleanInput() {
  inputEl.value = ""
}