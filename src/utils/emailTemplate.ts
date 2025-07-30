export const getActivationHtml = (activationLink: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Activate Your Profile</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }

      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .btn {
        display: inline-block;
        padding: 12px 20px;
        background-color: #1e88e5;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 20px;
      }

      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #888888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Activate Your Profile</h2>
      <p>Hello,</p>
      <p>
        Thank you for signing up with <strong>2EasyRent</strong>! Please click the button below to activate your profile.
      </p>
      <a href="${activationLink}" class="btn">Activate Profile</a>
      <p>
        If the button doesn't work, copy and paste this link into your browser:<br/>
        <a href="${activationLink}">${activationLink}</a>
      </p>
      <p>– The 2EasyRent Team</p>
      <div class="footer">
        © 2025 2EasyRent. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
