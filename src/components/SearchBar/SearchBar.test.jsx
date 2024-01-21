import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  test('it should call onFilterChange when text changes', () => {
    const handleFilterChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar filterText="" onFilterChange={handleFilterChange} />
    );

    const input = getByPlaceholderText('Pesquisar ID ou nome ou telefone...');
    fireEvent.change(input, { target: { value: 'novo texto' } });

    expect(handleFilterChange).toHaveBeenCalledTimes(1);
    expect(handleFilterChange).toHaveBeenCalledWith(expect.anything());
  });
});
