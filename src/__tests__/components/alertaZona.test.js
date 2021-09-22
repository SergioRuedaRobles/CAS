import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render} from '@testing-library/react'
import AlertaZona from '../../components/AlertaZona';


describe('Test for alerta zona', () => {
    test('renders appropriately', () => {
        const {getByTestId} = render(<AlertaZona/>)
        expect(getByTestId('div1')).toBeInTheDocument()
    })
})