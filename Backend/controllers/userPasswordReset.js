const User = require("../models/User");
const nodemailer = require("nodemailer");

// Generate a random reset token
const generateResetToken = () => {
    return Math.random().toString(36).slice(2);
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate a reset token and update user's resetToken field
        const resetToken = generateResetToken();
        user.resetToken = resetToken;
        await user.save();

        // Send reset link to the user's email
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4b74af648c9573",
              pass: "087d61614831cd"
            }
          });

        const mailOptions = {
            from: "reset@urbannest.com",
            to: email,
            subject: "Password Reset",
            text: `Click the following link to reset your password: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending reset email:", error);
                return res
                    .status(500)
                    .json({ error: "Error sending reset email" });
            }

            console.log("Reset email sent:", info.response);
            res.status(200).json({ message: "Reset email sent successfully" });
        });
    } catch (error) {
        console.error("Error during forgot password:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { forgotPassword };
