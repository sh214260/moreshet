# Moreshet - Equipment Rental Management System

**Moreshet is a React-based client-side application for an equipment rental business.
It provides a user-friendly interface for managing rentals, viewing customer information, and browsing products.
The application is built with responsive MUI components to ensure an optimal user experience across various devices.**

## Features

- **Intuitive navigation:** The application features a well-structured navigation menu that allows users to easily access different functionalities.
- **Responsive design:** The application is built with responsive MUI components, ensuring a seamless user experience.
- **Seamless rental management:** Users can effortlessly create, edit, and cancel rental bookings, view rental schedules, and track rental history.
- **Comprehensive customer management:** Administrators can easily add, edit, and view customer information, including contact details and rental history.
- **Browseable product catalog:** Users can browse through a comprehensive product catalog, filtering by category and viewing detailed product information.

## Prerequisites

- Node.js 18.16.1 and npm installed
- Azure account with an active subscription
- Azure CLI (optional, for command-line deployment)

## Local Development

1. **Install dependencies:**

```powershell
npm install
```

2. **Start the development server:**

```powershell
npm start
```

3. **Build for production:**

```powershell
npm run build
```

## Azure Static Web Apps Deployment

Since you already have static storage configured, here are the relevant steps for deployment:

### Step 1: Build Your React Application

Create an optimized production build:

```powershell
npm run build
```

This command creates a `build/` folder with:

- Optimized HTML, CSS, and JavaScript files
- Static assets and media files
- Asset manifest for resource loading
- All necessary files for deployment

### Step 2: Configure Build and Deployment

Deploy your built application to your existing Azure static storage:

1. **Login to Azure:**

```powershell
az login
```

2. **Deploy your build folder to Azure Storage:**

```powershell
az storage blob upload-batch `
  --account-name <yourStorageAccountName> `
  --destination '$web' `
  --source build
```

Replace `<yourStorageAccountName>` with your actual Azure Storage account name.

## Configuration Notes

### Static Website Settings

Ensure your Azure Storage static website is configured with:

- **Index document name:** `index.html`
- **Error document path:** `index.html` (for React Router support)

### Environment Variables

For production deployment, configure environment variables in Azure Portal:

1. Go to your Static Web App resource
2. Navigate to "Configuration"
3. Add application settings as needed

## Project Structure

- `src/admin/` - Admin dashboard components
- `src/client/` - Client-side features
- `src/common/` - Shared components
- `src/pictures/` - Static images
- `public/` - Public assets
- `build/` - Production build output

## Troubleshooting

**Common issues:**

- **Build failures:** Verify all dependencies are installed with `npm install`
- **Routing issues:** Ensure error document is set to `index.html` for SPA routing
- **Asset loading:** Check that relative paths are correct in build output
- **Hebrew text issues:** Ensure proper UTF-8 encoding in Azure Storage

**PowerShell specific notes:**

- Use backticks (`) for line continuation in PowerShell commands
- Ensure execution policy allows running scripts if needed

## Support Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Storage Static Website Documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)
- [Create React App Deployment Guide](https://create-react-app.dev/docs/deployment/)
