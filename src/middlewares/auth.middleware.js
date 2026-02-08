import { auth } from "../lib/auth"; // adjust path
export const requireAuth = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
            cookies: req.cookies, // 🔥 REQUIRED for cookie auth
        });
        console.log("Header is ");
        if (!session || !session.user) {
            return res
                .status(401)
                .json({ success: false, message: "Not authenticated" });
        }
        req.user = session.user; // 👈 attach user
        next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
};
