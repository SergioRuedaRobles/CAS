import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render} from '@testing-library/react'
import AñadirToma from '../../components/AñadirToma';


describe('Test for alerta zona', () => {
    test('renders appropriately', () => {
        const {getByTestId} = render(<AñadirToma/>)
        expect(getByTestId('form-at')).toBeInTheDocument()
    })
})