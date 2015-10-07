# iPredict_webapp
The iPredict web application is the NZ’s First real money online prediction market in which users can trade on their predictions on a broad range of future political and business events and refunded real money if their prediction comes true. To be able to do these a person should sing up first. This part of documentation is going to explain about Login/Sign up section.

### The process
To sign up into the site, a person should provide a password and an unique username. After signing up the user will get the "An email has been sent to your email for confirmation" and will be taken to Predictions page where he will be able to see list of predictions. When user logins the login function will give hime the "Login Successful" alert and will take him to Portfolio page. The Log out button will be shown at the bottom of the side bar menu after user login. If the user has forgotten the password. If the password is forgotten the user should go to "forgot password" link and enter his email. 

### Describing Login.html based on MVC sections
The view of the website is included in the Login.html which includes both the Login, Sign up and Forgot password section. By clicking on sign up botton the login div which is class is called "main_div" will be hidden and the sign up div which has the same class with the same name will be appeared. The same thing goes with the forgot password section.
There is a css file assigned with the login.html which is called login.css and contorls the the way the page should look.

The model section is the loginService.js file which includes the functionings of buttons. In this file the chosen username and and password, the confirmation password match will be checked before signing the user up based on the policies. The policies are the textboxes should not be null and emails should include an "@" and a "." and usernames should be unique and more than six character. Passwords should be between six and fifteen characters and it should include at least one of "A-Z" letters and 0-9 numbers. 

The control section is the loginCtrl.js which includes rules for logging in which are checking if the user has already logged in and if the username valid and the entered password is right. The invalidness of different secions are checked in a part and then if any of them is incorrect the invalid.length will be more than zero and the part which is not based on the rules will be pushed to the invalid array so that later in the test section the error part will be recognised and the appropriate message will be shown.
The register section has the same approach but it the rules are that it checks if the accept terms checkbox is checked and if the username and password and email are valid and the password and its confirmation are the same. 
The forgot_password section just checks the email validity and gives the alert of "Please enter a valid email" if the email is not valid all in the retrievePassword function.

The relationship between model and control layers is where it is checking username, password and email validities. The functions which checks the validities for both register and login, are in loginService.js as described before and they will be called when needed from the control layer. Controling hiding and showing the login/sign up/forgot password sections onthe action of button click and changing is in loginCtrl.js but changing states happens in loginService.js.

By changing the state the Title of the side bar menu changes to a suitable one by using delegation of the ionic side bar menu class in loginCtrl.js.