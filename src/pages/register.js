import React from 'react'
import { navigateTo } from 'gatsby-link'
import { Header, Form, Input, Button, Segment } from 'semantic-ui-react'
import Helmet from 'react-helmet'
import AuthContext from '../components/Context/AuthContext'
import { register } from '../../lib/moltin'

export default class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    loading: false,
  }

  _handleSubmit = (e, context) => {
    e.preventDefault()

    const { name, email, password } = this.state

    this.setState({
      loading: true,
    })
    register({ name, email, password })
      .then(data => {
        const { id, token } = data
        localStorage.setItem('customerToken', token)
        localStorage.setItem('mcustomer', id)
        context.updateToken()
        navigateTo('/myaccount')
      })
      .catch(e => {
        console.log(e)
        this.setState({
          loading: false,
        })
      })
  }

  _handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  render() {
    const { loading } = this.state

    return (
      <AuthContext.Consumer>
        {context => (
          <React.Fragment>
            <Helmet title="Register" />
            <Header as="h1">Create an account</Header>

            <Form
              onSubmit={e => this._handleSubmit(e, context)}
              loading={loading}
            >
              <Segment>
                <Form.Field>
                  <label htmlFor="name">Name</label>
                  <Input
                    id="name"
                    fluid
                    name="name"
                    autoFocus
                    required
                    onChange={e => this._handleChange(e)}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    fluid
                    name="email"
                    type="email"
                    required
                    onChange={e => this._handleChange(e)}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    fluid
                    name="password"
                    type="password"
                    required
                    onChange={e => this._handleChange(e)}
                  />
                </Form.Field>

                <Button type="submit" color="orange">
                  Register
                </Button>
              </Segment>
            </Form>
          </React.Fragment>
        )}
      </AuthContext.Consumer>
    )
  }
}
