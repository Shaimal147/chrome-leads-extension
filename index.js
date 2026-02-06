let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")

resetInput()

inputBtn.addEventListener("click", () => {
    addLeads(inputEl.value)
    resetInput()
    for (let lead of myLeads) {
        console.log(lead)
    }
})

function addLeads(lead) {
    const value = lead.trim()
    if (!value) return
    myLeads.push(lead)
}

function resetInput() {
    inputEl.value = ""
}