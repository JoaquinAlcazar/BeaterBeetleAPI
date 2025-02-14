module.exports = {
    has: (role) => {
        return (req,res,next) =>{
            const {
                user: {userId},
            } = req;

            UserModel.findUser({id: userId}).then((user) =>{

                if (!user){
                    return res.status(403).json({
                        status: false,
                        error: "Invalid access token provided, please login again.",
                    });
                }
            })
        }
    }
}