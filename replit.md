# Overview

Neo Automatics is a precision manufacturing website built with Next.js 14, showcasing a family-run ISO 9001:2015 certified manufacturer specializing in precision machined components for OEMs and Tier-1 suppliers. The website features a modern glassmorphism design, comprehensive SEO optimization, and a full-stack architecture supporting both marketing content and business operations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses Next.js 14 with the App Router pattern, providing server-side rendering and optimal performance. The frontend is built with TypeScript for type safety and uses Tailwind CSS for styling with custom glassmorphism components and animations powered by Framer Motion.

Key architectural decisions:
- **Next.js 14 App Router**: Chosen for modern React patterns, built-in SEO optimization, and server-side rendering capabilities
- **TypeScript**: Ensures type safety across the application and better development experience
- **Tailwind CSS**: Utility-first CSS framework allowing rapid UI development with consistent design patterns
- **Framer Motion**: Provides smooth animations and micro-interactions for enhanced user experience
- **Component Architecture**: Modular component structure with reusable UI components, sections, and layouts

## Backend Architecture
The application follows a hybrid approach with both Next.js API routes and a separate Express server setup:

- **Next.js API Routes**: Handle form submissions (RFQ forms) with built-in serverless functions
- **Express Server**: Configured for more complex backend operations with middleware support
- **Email Integration**: Uses Nodemailer for SMTP email delivery with Formspree as fallback
- **File Upload Support**: Handles technical drawing uploads up to 10MB for RFQ submissions

## Data Storage Solutions
The application uses a flexible data architecture:

- **Static JSON Data**: Company information, product details, and content stored in JSON files for fast access and easy updates
- **Database Integration**: Configured with Drizzle ORM and PostgreSQL for future dynamic content and user management
- **Schema Management**: Type-safe database schemas with Zod validation for data integrity

## Authentication and Authorization
Currently implements a basic user schema with plans for future authentication:
- **User Management**: Basic user table structure with username/password fields
- **Session Management**: Configured for connect-pg-simple session storage
- **Security**: Prepared for future implementation of authentication middleware

## Performance Optimizations
- **Image Optimization**: Next.js Image component with configured domains for external images
- **Bundle Optimization**: Configured for optimized package imports (Framer Motion, Lucide React)
- **Lighthouse Targets**: Architected to achieve ≥95 scores across Performance, Accessibility, Best Practices, and SEO
- **Static Generation**: Utilizes Next.js static generation where appropriate for optimal loading times

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Database connection for PostgreSQL via Neon
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives for forms, dialogs, navigation
- **tailwindcss**: Utility-first CSS framework
- **framer-motion**: Animation library for React
- **lucide-react**: Icon library providing consistent iconography

## Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration with Zod for form validation
- **zod**: TypeScript-first schema validation library

## Email Services
- **nodemailer**: Email sending library for SMTP integration
- **Formspree**: Backup email service for form submissions (configured via environment variables)

## Development and Build Tools
- **vite**: Build tool and development server
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for development

## External Integrations
- **Google Fonts**: Inter and Space Grotesk fonts for typography
- **Unsplash/Pixabay**: Image CDNs for product and marketing imagery (configured in next.config.js)
- **Email SMTP Services**: Configurable SMTP settings for production email delivery

## Database Services
The application is configured to work with PostgreSQL databases, specifically optimized for Neon Database with serverless capabilities. The database configuration supports connection pooling and is environment-driven for different deployment scenarios.