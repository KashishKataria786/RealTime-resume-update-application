import jwt from 'jsonwebtoken'

export const protect = async(req, res, next) => {
    let token;

    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = decoded;

            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token has expired" });
            }
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    }else{
        return res.status(400).send({message:"Login to Access Data"});
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
}