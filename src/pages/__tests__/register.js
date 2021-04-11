import React from 'react'
import {render} from '@testing-library/react'
import {useStaticQuery} from 'gatsby'
import Register from '../register'

describe('<Layout />', () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          title: `title`,
          description: `description.`,
          lang: 'en',
          meta: '',
          keywords: [],
        },
      },
    })
  })
  test('renders', () => {
    const {asFragment} = render(<Register location={{}} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('register renders name and email', () => {
    const {getByLabelText} = render(<Register location={{pathname: ''}} />)
    expect(getByLabelText(/Email/i))
    expect(getByLabelText(/name/i))
  })
})
