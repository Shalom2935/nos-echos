# Components Documentation

## Overview
This document provides detailed information about the components used in the Nos Echos application.

## Core Components

### Layout Components

#### `RootLayout`
The main layout component that wraps all pages.

```typescript
import RootLayout from '@/app/components/layout/RootLayout';

// Usage
<RootLayout>
  <Component />
</RootLayout>
```

### Page Components

#### `Hero`
Hero section component used on the home page.

```typescript
import Hero from '@/app/components/home/Hero';

// Props
interface HeroProps {
  title?: string;
  subtitle?: string;
}
```

#### `TestimonialHero`
Hero section for the testimonials page.

```typescript
import TestimonialHero from '@/app/components/testimonials/TestimonialHero';

// Props
interface TestimonialHeroProps {
  onShare: () => void;
}
```

### Form Components

#### `TestimonyForm`
Form component for submitting testimonies.

```typescript
import { TestimonyForm } from '@/app/components/testimonials/TestimonyForm';

// Props
interface TestimonyFormProps {
  onSubmit: (data: CreateTestimonyDTO) => Promise<void>;
  isLoading?: boolean;
}
```

### Card Components

#### `TestimonialCard`
Card component for displaying testimonies.

```typescript
import TestimonialCard from '@/app/components/testimonials/TestimonialCard';

// Props
interface TestimonialCardProps {
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  stats: {
    likes: number;
    comments: number;
  };
  comments: Comment[];
  showComments: boolean;
  onToggleComments: () => void;
}
```

## UI Components

### Buttons

#### Primary Button
```typescript
import { Button } from '@/components/ui/button';

// Usage
<Button variant="default">Click me</Button>
```

### Form Elements

#### Select
```typescript
import { Select } from '@/components/ui/select';

// Usage
<Select
  value={value}
  onValueChange={setValue}
>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

#### Textarea
```typescript
import { Textarea } from '@/components/ui/textarea';

// Usage
<Textarea
  value={value}
  onChange={handleChange}
  placeholder="Enter text..."
/>
```

## Styling

Components use SCSS modules for styling. Each component has its own `.module.scss` file:

```scss
// Example Component.module.scss
.container {
  // styles
}

.title {
  // styles
}
```

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use composition over inheritance
   - Follow the Single Responsibility Principle

2. **Props**
   - Use TypeScript interfaces for prop definitions
   - Provide default props when appropriate
   - Document required vs optional props

3. **Styling**
   - Use SCSS modules for component-specific styles
   - Follow BEM-like naming in SCSS modules
   - Use CSS variables for theming

4. **Performance**
   - Memoize callbacks with useCallback
   - Memoize expensive computations with useMemo
   - Use proper key props in lists

5. **Accessibility**
   - Include proper ARIA attributes
   - Ensure keyboard navigation
   - Maintain proper heading hierarchy

## Testing

Components should be tested using React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
``` 