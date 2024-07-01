type User = {
    email: string;
    username: string;
    hashedPassword: string;
    passwordSalt: string;
};

export const users: User[] = [];

export function getVerficationHtml(verificationUrl: string): string {
    return (`        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #2c3e50;">Welcome to MatchaApp!</h2>
                <p style="font-size: 16px;">Hi there,</p>
                <p style="font-size: 16px;">Thank you for registering with Matcha. So you're here to find your perfect, please click the link below to continue:</p>
                <p style="text-align: center;">
                    <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #3498db; text-decoration: none; border-radius: 5px;">Continue</a>
                </p>
                <p style="font-size: 14px; color: #777;">If you did not create an account, please ignore this email.</p>
                <p style="font-size: 14px; color: #777;">Best regards,<br>MatchaApp Team</p>
            </div>
        </body>
        </html>`)
}