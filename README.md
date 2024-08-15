## AnonNotes: Receive Anonymous Messages and Notes

AnonNotes is a platform that allows users to create an account and receive anonymous messages, questions, or notes. 

### Features

* Users can create an account and receive anonymous messages.
* Senders remain completely anonymous, fostering open communication.
* Gemini API integration suggests prompts and messages to inspire senders.

### Technologies

* Frontend: Next.js, Tailwind CSS
* Backend: TypeScript, Zod
* Database: MongoDB
* Authentication: NextAuth.js
* Email Verification: Nodemailer

### Installation

**Prerequisites:**

* Node.js and npm (or yarn) installed on your system.

**1. Clone the repository**

```bash
git clone https://github.com/vishalpawar26/AnonNotes.git
```

**2. Install dependencies**

```bash
cd AnonNotes
npm install
```

**3. Environment Variables**

Create a `.env.local` file in the project root directory and add your environment variables.  A `.env.example` file is provided for reference.

**4. Start the development server**

```bash
npm run dev
```

This will start the development server at http://localhost:3000 by default.

### Usage

1. Visit http://localhost:3000 in your browser.
2. Create an account or sign in.
3. Users can then view any anonymous messages they have received.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
