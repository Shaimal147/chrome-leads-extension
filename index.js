let myLeads = retrieveLocalStorageItems("myLeads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
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

deleteBtn.addEventListener("dblclick", () => {
    deleteLeads("myLeads", leadsListEl)
})

saveTabBtn.addEventListener("click", async () => {
    const url = await getCurrentTab()
    if (!url) return

    const savedLead = addLeads(url)
    if (!savedLead) return

    saveItemToLocalStorage("myLeads", myLeads)
    renderLeadsList(myLeads, leadsListEl)
})


function deleteLeads(key, UIList) {
    localStorage.removeItem(key)
    myLeads = []
    renderLeadsList(myLeads, UIList)
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
     return JSON.parse(localStorage.getItem(key)) || []
}

function saveItemToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

async function getCurrentTab() {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    return tabs[0]?.url || null
}