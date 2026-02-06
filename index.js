let myLeads = retrieveLocalStorageItems("myLeads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const leadsListEl = document.getElementById("leads-list-el")

resetInput()
renderLeadsList(myLeads, leadsListEl)

inputBtn.addEventListener("click", () => {
    const savedLead = addLeads(inputEl.value)
    resetInput()
    if (!savedLead) return
    saveItemToLocalStorage("myLeads", myLeads)
    renderLeadsList(myLeads, leadsListEl)
})

deleteBtn.addEventListener("click", () => {
    deleteLeads("myLeads", leadsListEl)
})

function deleteLeads(key, UIList) {
    localStorage.removeItem(key)
    myLeads = []
    renderLeadsList(myLeads, leadsListEl)
}

function addLeads(lead) {
    const value = lead.trim()
    if (!value) return
    myLeads.push(value)
    
    return value
}

function resetInput() {
    inputEl.value = ""
}

/*function renderLeadsList(lead, UIList) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.href = lead
    a.textContent = lead
    a.target = "_blank"
    li.appendChild(a)
    UIList.appendChild(li)
}*/

function renderLeadsList(leads, UIList) {
    UIList.innerHTML = ""
    const frag = document.createDocumentFragment()

    for (let lead of leads) {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.href = lead
        a.textContent = lead
        a.target = "_blank"
        li.appendChild(a)
        frag.appendChild(li)
    }

    UIList.appendChild(frag)
}

function retrieveLocalStorageItems(key) {
     return JSON.parse(localStorage.getItem(`${key}`)) || []
}

function saveItemToLocalStorage(key, value) {
    localStorage.setItem(`${key}`, JSON.stringify(value))
}