const Complaint = require("../model/complaint")

const ComplainDataSource = (complainant,message,target) => {
    let complaint = new Complaint({complainant,message,target})
    return complaint.save()
}

module.exports = {ComplainDataSource}