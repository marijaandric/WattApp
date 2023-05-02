using System.Drawing.Drawing2D;
using System.Drawing;
using System.Security.Policy;

namespace backend.Helpers
{
    public class EmailBody
    {
        public static string EmailBodyForResetPassword(string email, string emailToken)
        {
            return $@"<html>
            <head>
            <body style='font-family: Montserrat; margin:0;padding:0;'>
            <div>
            <h1>Reset your password</h1>
            <hr>
            <p>
            You are receiving this email because you requested a password reset for your  WattApp account.
            </p>
            <p>Please tap the button bellow to choose a new password</p>
            <a href='http://localhost:4200/reset?email={email}&code={emailToken}' target='_blank' style='border: none;padding: 5px 40px;
            border - radius: 32px;
            display: block;
            margin: auto;
            background: linear - gradient(45deg, #46c5f1 10%, #5245b7 100%);
            color: #fff;
            font - weight: bold; '> Reset password</a>
            <p>Kind Regards,</p>
            <br><br>CodeSpark Energy
            </div>
            </body>
            </head>
            </html>
            ";
        }
    }
}
