const { GetUserProfileRepositary } =  require("../repositary/get_user_profile_repositary")
const GetUserProfileAPI = (req,res) =>{
    let {userid} = req.query
    GetUserProfileRepositary(userid).then(response=>{
        console.log(response)
        res.send(response)
    })
}

module.exports = {GetUserProfileAPI}