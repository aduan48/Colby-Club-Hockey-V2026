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

### Installation

1. Clone the repository:
```bash
   git clone [https://github.com/aduan48/East-Coast-Dragons.git](https://github.com/aduan48/East-Coast-Dragons.git)

2. Navigate into the project directory:
```bash
   cd East-Coast-Dragons

3. Install the project dependencies:
```bash
   npm install

## Running Locally

To launch the local development server:
```bash
   ntl dev


## Deployment

This project is configured for continuous deployment via Netlify, automatically building and deploying whenever changes are pushed to the `main` branch.

### Netlify Forms Configuration

The contact form utilizes a shadow HTML form located in `public/index.html`. This structure allows Netlify's build bots to detect and register the submission endpoint automatically, enabling serverless form handling without an external API.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
