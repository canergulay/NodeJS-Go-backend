const {ComplainRepositary} = require("../repositary/complain_repositary")


const ComplaintAPI = (req,res) => {

    const {complaint} = req.body
    complaint.complainant = req.userid

    ComplainRepositary(complaint).then(response=>{
        res.send(response)
    })

}


module.exports = {ComplaintAPI}