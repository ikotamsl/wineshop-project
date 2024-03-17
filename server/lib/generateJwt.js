const jwt= require("jsonwebtoken");

module.exports = (insObj) => {
    return jwt.sign(
        {id: insObj.id, login: insObj.login, role: insObj.role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}