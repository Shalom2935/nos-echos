# Style Guide

## Design System

### Colors

```scss
// Primary Colors
$primary-color: #4CAF50;
$primary-dark: #388E3C;
$primary-light: #81C784;

// Text Colors
$text-color: #2C2C2C;
$text-light: rgba(44, 44, 44, 0.8);

// Background Colors
$background-color: #F8F9FA;
$surface-color: #FFFFFF;

// Status Colors
$success-color: #4CAF50;
$warning-color: #FFC107;
$error-color: #F44336;
$info-color: #2196F3;
```

### Typography

```scss
// Font Families
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-secondary: 'Poppins', sans-serif;

// Font Sizes
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
```

### Spacing

```scss
// Spacing Scale
$spacing-1: 0.25rem;   // 4px
$spacing-2: 0.5rem;    // 8px
$spacing-3: 0.75rem;   // 12px
$spacing-4: 1rem;      // 16px
$spacing-6: 1.5rem;    // 24px
$spacing-8: 2rem;      // 32px
$spacing-12: 3rem;     // 48px
$spacing-16: 4rem;     // 64px
```

### Breakpoints

```scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;
```

## CSS Architecture

### BEM Naming Convention

```scss
.block {
  // Block styles

  &__element {
    // Element styles
  }

  &--modifier {
    // Modifier styles
  }
}
```

### Example Usage

```scss
.card {
  background: $surface-color;
  padding: $spacing-4;

  &__title {
    font-size: $font-size-xl;
    color: $text-color;
  }

  &__content {
    margin-top: $spacing-4;
    color: $text-light;
  }

  &--highlighted {
    border: 2px solid $primary-color;
  }
}
```

### Responsive Design

```scss
.component {
  width: 100%;

  @media (min-width: $breakpoint-md) {
    width: 50%;
  }

  @media (min-width: $breakpoint-lg) {
    width: 33.333%;
  }
}
```

### Grid System

```scss
.grid {
  display: grid;
  gap: $spacing-4;

  &--cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  &--cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}
```

## Animation

### Transitions

```scss
// Default transition
$transition-default: all 0.2s ease;

// Specific transitions
$transition-transform: transform 0.2s ease;
$transition-opacity: opacity 0.2s ease;
```

### Hover Effects

```scss
.button {
  transition: $transition-default;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
}
```

## Best Practices

1. **Mobile First**
   - Start with mobile styles
   - Add complexity with media queries
   - Use relative units (rem, em)

2. **Performance**
   - Minimize nesting (max 3 levels)
   - Use CSS Grid and Flexbox
   - Avoid expensive properties

3. **Maintainability**
   - Use variables for repeated values
   - Follow BEM naming convention
   - Comment complex code

4. **Accessibility**
   - Maintain color contrast (WCAG 2.1)
   - Support reduced motion
   - Use semantic HTML

## Examples

### Form Elements

```scss
.form {
  &__field {
    margin-bottom: $spacing-4;
  }

  &__label {
    display: block;
    margin-bottom: $spacing-2;
    color: $text-color;
    font-weight: 500;
  }

  &__input {
    width: 100%;
    padding: $spacing-3;
    border: 1px solid rgba($text-color, 0.2);
    border-radius: 8px;
    transition: $transition-default;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
    }
  }
}
```

### Cards

```scss
.card {
  background: $surface-color;
  border-radius: 12px;
  padding: $spacing-6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: $transition-default;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
}
``` 