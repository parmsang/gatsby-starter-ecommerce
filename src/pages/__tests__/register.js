import React from 'react'
import {render} from 'react-testing-library'
import Register from '../register'

const props = {location: {pathname: ''}}

test('register renders name and email', () => {
  const {getByLabelText} = render(<Register {...props} />)
  expect(getByLabelText(/Email/i))
  expect(getByLabelText(/name/i))
})
