# Valentine's Day Interactive Card

A beautiful, interactive digital Valentine's Day card built with Next.js, Framer Motion, and Tailwind CSS. Features a 3D envelope opening animation and a heartfelt letter reveal.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/valentine.git
    cd valentine
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open in your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see your card!

## How to Customize the Message

To personalize the letter content, follow these steps:

1.  Open the file `components/LetterCard.tsx` in your code editor.
2.  Scroll down to the **Line ~42** (inside the `return` statement).
3.  Edit the text inside the `<h2>` tag for the greeting:
    ```tsx
    <h2 className="...">Dear [Name],</h2>
    ```
4.  Edit the paragraphs inside the `<div className="prose ...">` block to write your own message:
    ```tsx
    <p>Your custom message goes here...</p>
    ```
5.  Edit the signature at the bottom:
    ```tsx
    <span className="...">Your Name</span>
    ```
6.  Save the file, and the changes will instantly reflect in your browser!

## How to Open the Card

The card features a fun, interactive opening sequence:

1.  **Click the Heart Lock**: On the envelope flap, you'll see a pulsing heart icon. Click it to "unlock" the envelope.
2.  **Swipe Up / Drag**: Once unlocked, click and drag the envelope flap upwards (or just wait for the animation) to open it.
3.  **Watch the Magic**: The card will slide out of the envelope and expand to the center of the screen for you to read.

