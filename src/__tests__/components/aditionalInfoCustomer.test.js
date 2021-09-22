import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import { render} from '@testing-library/react'
import AditionalInfoCustomer from '../../components/AditionalInfoCustomer';


describe('Test for AditionalInfoCustomer', () => {
  test('renders appropriately', () => {
    const {getByTestId} = render(<AditionalInfoCustomer />)
    expect(getByTestId('h2-aic')).toBeInTheDocument()
    expect(getByTestId('form-aic')).toBeInTheDocument()
    //se renderiza si hay info
    //expect(getByTestId('div1-aic')).toBeInTheDocument()
    expect(getByTestId('div2-aic')).toBeInTheDocument()
 })
})