# Next.js Countries Explorer

A modern web application built with Next.js that allows users to explore countries and their details using the REST Countries API.

## Features

- 🌍 Browse all countries with their flags and basic information
- 🔍 Search countries by name
- 🏷️ Filter countries by region
- 📱 Fully responsive design
- 🔄 Real-time updates with client-side filtering
- 🌐 Detailed country information including:
  - Native name
  - Population
  - Region and sub-region
  - Capital
  - Top level domain
  - Currencies
  - Languages
  - Border countries with quick navigation

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Data Fetching:** REST Countries API
- **Routing:** Next.js App Router
- **Component Architecture:** Client & Server Components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/NextJsCountriey.git
cd NextJsCountriey
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
NextJsCountriey/
├── src/
│   ├── app/
│   │   ├── context/
│   │   │   └── CountriesContext.jsx    # Global state management
│   │   ├── ui/
│   │   │   ├── Cards.jsx              # Country cards grid
│   │   │   ├── CountryPage.jsx        # Detailed country view
│   │   │   ├── Filter.jsx             # Region filter component
│   │   │   └── Search.jsx             # Search component
│   │   ├── Home.jsx                   # Main page component
│   │   └── layout.js                  # Root layout
├── public/
│   └── assets/                        # Static assets
└── package.json
```

## Features in Detail

### Home Page
- Search functionality with real-time filtering
- Region-based filtering
- Grid layout of country cards
- Responsive design for all screen sizes

### Country Details Page
- Comprehensive country information
- Interactive border countries navigation
- Back button for easy navigation
- Optimized image loading with Next.js Image component

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [REST Countries API](https://restcountries.com/) for providing the country data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
