# Colby Club Hockey

A modern React-based web application built for the Colby Club Hockey organization. This project features a responsive layout, a persistent user contact form using React hooks integrated with a Netlify forms backend, and dynamic smooth scrolling.

## Features

* **Responsive Contact Form:** Fully integrated with Netlify forms for serverless submission tracking and management.
* **State Persistence:** Leverages local storage via custom React hooks (`useStorageState`) to preserve user input across page refreshes.
* **Smooth Navigation:** Implements custom viewport offset scrolling to maintain precise alignment with fixed header positioning.
* **Clean UI:** Modern, accessible styling utilizing Flexbox/Grid layouts and native CSS variables.

## Built With

* **Frontend:** React (JavaScript, CSS3)
* **Hosting & Backend Forms:** Netlify
* **Version Control:** Git & GitHub

## Getting Started

Follow these instructions to set up a local copy of the project for development and testing purposes.

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You can verify your installation by running:

```bash
node -v
npm -v
```

You'll also need the Netlify CLI:

```bash
npm install -g netlify-cli
```


### Installation

1. Clone the repository:

```bash
   git clone https://github.com/aduan48/Colby-Club-Hockey-V2026.git
```

2. Navigate into the project directory:

```bash
   cd Colby-Club-Hockey-V2026
```

3. Install the project dependencies:

```bash
   npm install
```

## Running Locally

To launch the local development server:

```bash
ntl dev
```


## Deployment

This project is configured for continuous deployment via Netlify, automatically building and deploying whenever changes are pushed to the `main` branch.

## Backend

This project uses Netlify Blobs and Netlify Functions to get JSON team data. 

### TOO ADD AND EDIT DATA

1. Edit or add JSON files in `data/`. Keep the naming pattern (`roster2027.json`, `schedule2027.json`) so the functions can find them.

2. Upload the data. This is what makes the changes live:

```bash
   ./scripts/upload-data.sh
```

3. When asked whether to overwrite the existing data, confirm for each file you edited.

4. Commit and push to save the history. This does not trigger a build:

```bash
   git add data/
   git commit -m "your message"
   git push
```

### Netlify Forms Configuration

The contact form utilizes a shadow HTML form located in `public/index.html`. This structure allows Netlify's build bots to detect and register the submission endpoint automatically, enabling serverless form handling without an external API.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
