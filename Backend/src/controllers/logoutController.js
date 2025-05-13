const logoutController ={};
logoutController.logout = (req, res) => {

    //borrar la cookie
    res.clearCookie('authToken');

    res.json({message: "Logged out"})
    
};

export default logoutController;