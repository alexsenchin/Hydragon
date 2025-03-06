
# Hydragon Password Gen

## Project Description
Hydragon Password Gen is a web application designed to practice using the Hydra tool. It provides an authentication form with the option to select the password complexity, which can then be attacked using Hydra.

## Tech Stack
- **Backend:** Node.js (Express)
- **Frontend:** HTML, JavaScript (minimal)
- **Passwords:** Dynamically generated using `crypto`

## Installation and Setup
### Requirements
- Node.js (>=16.x)
- npm (installed along with Node.js)

### Installing Dependencies
```sh
npm install
```

### Running the Server
```sh
node server.js
```
After running, the server will be available at `http://localhost:3000`.

## Functionality
1. **Home Page (`/`)**
   - Allows selecting password complexity (`easy`, `medium`, `hard`).
   - The "Hydra Help" button opens a page with instructions on using Hydra.

2. **Password Generation**
   - Passwords are dynamically generated using the `crypto` module.
   - Different password lengths based on complexity:
     - Easy: 6 characters
     - Medium: 10 characters
     - Hard: 16 characters

3. **Login Form (`/login`)**
   - Displays a field for entering the password.
   - Inserts the generated password into a hidden `selectedPassword` field.

4. **Authentication (`/authenticate`)**
   - Verifies if the entered password matches the generated one.
   - If correct, displays a successful login message.
   - In case of an error, displays an appropriate message.

5. **Hydra Help Page (`/hydra-help`)**
   - Contains examples of commands to attack HTTP, FTP, and SSH services.
   - Provides examples of using the `crunch` utility to create wordlists.

## File Structure
```
/project-root
│── server.js         # Main server file
│── index.html        # Home page
│── login.html        # Login form
│── hydra_help.html   # Hydra help instructions
│── package.json      # List of dependencies
```

## Using Hydra for Attacks
Example commands for attacking services:
```sh
# HTTP login form attack
hydra -l admin -P /path/to/wordlist.txt http-post-form://localhost:3000/login

# FTP attack
hydra -l admin -P /path/to/wordlist.txt ftp://localhost

# SSH attack with multiple logins
hydra -L /path/to/userlist.txt -P /path/to/wordlist.txt ssh://localhost
```

## Possible Improvements
- Add logging of login attempts.
- Implement brute-force protection (limit number of attempts).
- Integrate a database for storing users.
- Develop an API for interacting with Hydra.


