import React from 'react'
import {render, fireEvent, cleanup} from 'react-testing-library'
import Login from '../login'

afterEach(cleanup)

test('renders', () => {
  const {asFragment} = render(<Login location={{}} />)
  expect(asFragment()).toMatchSnapshot()
})

test('expect error messages if form is submitted with empty fields', () => {
  const {queryByText, getByLabelText, getByText} = render(
    <Login location={{}} />,
  )
  expect(getByLabelText(/Email/i).value).toBe('')
  expect(getByLabelText(/Password/i).value).toBe('')
  fireEvent.click(getByText(/Login/i))
  expect(queryByText('Email address is required')).not.toBeNull()
})
