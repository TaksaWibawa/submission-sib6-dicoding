import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { InputForm } from './InputForm';
import '@testing-library/jest-dom/vitest';

/* InputForm Test Scenario
  1. InputForm renders correctly
  2. InputForm handles input correctly
*/

describe('InputForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders input form correctly', () => {
    render(
      <InputForm
        name="email"
        type="email"
        placeholder="email"
        value=""
        setValue={() => {}}
      />
    );

    const emailInput = screen.getByLabelText('Email');

    expect(emailInput).toBeInTheDocument();
  });

  it('handles input correctly', () => {
    const targetValue = 'test@gmail.com';

    let value = '';
    const setValue = (e) => {
      value = e.target.value;
    };

    render(
      <InputForm
        name="email"
        type="email"
        placeholder="email"
        value={value}
        setValue={setValue}
      />
    );

    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(emailInput, { target: { value: targetValue } });

    expect(value).toBe(targetValue);
  });
});
