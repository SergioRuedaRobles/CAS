import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import { render} from '@testing-library/react'
import Cuidador from '../../components/Cuidador'


describe('Test for alerta zona', () => {
    test('renders appropriately', () => {
        const {getByTestId} = render(<Cuidador/>)
    })
})