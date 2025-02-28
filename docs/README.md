# Nos Echos Documentation

## Overview
Nos Echos is a platform dedicated to giving voice to survivors and witnesses of gender-based violence. The platform provides a safe, anonymous space for sharing testimonies while connecting users with support resources.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Technical Stack](#technical-stack)
5. [Development Guide](#development-guide)
6. [API Documentation](#api-documentation)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## Project Structure
```
nos-echos/
├── app/
│   ├── api/            # API routes
│   ├── components/     # React components
│   ├── lib/           # Utilities and API clients
│   ├── services/      # Business logic
│   └── styles/        # SCSS modules
├── docs/             # Documentation
├── public/           # Static assets
└── types/           # TypeScript type definitions
```

## Features

### Testimony Management
- Anonymous testimony submission
- Moderation system for testimonies
- Public viewing of approved testimonies
- Categorization by type (victim, survivor, witness)

### User Experience
- Responsive design
- Accessibility compliance
- Multi-language support (planned)
- Dark mode support (planned)

### Security
- Data encryption
- Anonymous submissions
- Moderation system
- Content filtering

## Technical Stack

### Frontend
- Next.js 14
- React
- TypeScript
- SCSS Modules
- Axios for API calls
- shadcn/ui components

### Backend
- Next.js API Routes
- TypeScript
- Database (planned)

### Development Tools
- ESLint
- Prettier
- TypeScript
- Git

## Development Guide

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use SCSS modules for styling
- Follow component-based architecture

### Component Structure
```typescript
// Example component structure
import styles from './Component.module.scss';

interface ComponentProps {
  // Props definition
}

export default function Component({ ...props }: ComponentProps) {
  return (
    // JSX
  );
}
```

### State Management
- Use React hooks for local state
- Context API for global state (when needed)
- Server state management with SWR/React Query (planned)

### API Integration
- Use Axios for API calls
- Centralized API client configuration
- Type-safe API responses
- Error handling middleware

### Testing (Planned)
- Jest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests

## API Documentation
See [API Documentation](./api.md) for detailed API endpoints documentation.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
[License details to be added] 