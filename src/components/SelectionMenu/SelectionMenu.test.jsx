import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectionMenu from './SelectionMenu';

const columnsMock = [
  { id: 'name', label: 'Nome' },
  { id: 'age', label: 'Idade' },
];

describe('SelectionMenu Component', () => {
  test('should open menu on button click', () => {
    const { getByLabelText, queryByRole } = render(
      <SelectionMenu columns={columnsMock} orderBy="name" order="asc" onSort={() => {}} />
    );

    fireEvent.click(getByLabelText('Ordenar por'));
    expect(queryByRole('menu')).toBeInTheDocument();
  });

  test('should call onSort with correct property', () => {
    const onSortMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <SelectionMenu columns={columnsMock} orderBy="name" order="asc" onSort={onSortMock} />
    );

    fireEvent.click(getByLabelText('Ordenar por'));
    fireEvent.click(getByText('Idade'));
    expect(onSortMock).toHaveBeenCalledWith('age');
  });

  test('should render menu items correctly', () => {
    const { getByLabelText, getAllByRole } = render(
      <SelectionMenu columns={columnsMock} orderBy="name" order="asc" onSort={() => {}} />
    );

    fireEvent.click(getByLabelText('Ordenar por'));
    const menuItems = getAllByRole('menuitem');
    expect(menuItems.length).toBe(columnsMock.length);
  });

});
