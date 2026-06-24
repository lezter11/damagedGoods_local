import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../Footer';

describe('Footer Component', () => {
  it('renders the 3D CTA Panel with correct text', () => {
    render(<Footer />);
    // Check for the "LET'S BUILD YOUR VISION" text
    expect(screen.getByText(/LET'S BUILD/i)).toBeInTheDocument();
    expect(screen.getByText(/YOUR VISION/i)).toBeInTheDocument();
  });

  it('renders the newsletter subscription input', () => {
    render(<Footer />);
    // Check if the input field is present
    const emailInput = screen.getByPlaceholderText(/your@email.com/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('renders the copyright information', () => {
    render(<Footer />);
    // Check for copyright text
    expect(screen.getByText(/© 2026 DAMAGED GOODS./i)).toBeInTheDocument();
    expect(screen.getByText(/ALL RIGHTS RESERVED./i)).toBeInTheDocument();
  });

  it('renders support links', () => {
    render(<Footer />);
    // Verify a link from the "SUPPORT" section is present
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Shipping & Returns')).toBeInTheDocument();
  });
});
