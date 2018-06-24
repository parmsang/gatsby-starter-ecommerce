import React from 'react'
import { navigateTo } from 'gatsby-link'
import {
  Header,
  Form,
  Input,
  Button,
  Segment,
  Message,
} from 'semantic-ui-react'
import Helmet from 'react-helmet'
import { login } from '../../lib/moltin'
import AuthContext from '../components/Context/AuthContext'

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    errors: null,
  }

  _handleSubmit = (e, context) => {
    e.preventDefault()

    const { email, password } = this.state

    this.setState({
      loading: true,
      errors: null,
    })

    login({ email, password })
      .then(({ id, token }) => {
        localStorage.setItem('customerToken', token)
        localStorage.setItem('mcustomer', id)
        context.updateToken()
        navigateTo('/myaccount/')
      })
      .catch(e => {
        console.log(e.message)
        this.setState({
          loading: false,
          errors: e.errors || e,
        })
      })
  }

  _handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  handleErrors = errors => {
    if (!Array.isArray(errors) && !errors.length > 0) {
      return (
        <Message
          error
          header="Sorry"
          content="Please check your login details and try again."
        />
      )
    }
    return errors.map((error, i) => (
      <Message error header={error.title} content={error.detail} key={i} />
    ))
  }

  render() {
    const { loading, errors } = this.state

    return (
      <AuthContext.Consumer>
        {context => (
          <React.Fragment>
            <Helmet title="Login" />
            <Header as="h1">Log in to your account</Header>

            <Form
              onSubmit={e => this._handleSubmit(e, context)}
              loading={loading}
              error={!!errors}
            >
              {errors ? this.handleErrors(errors) : null}
              <Segment>
                <Form.Field>
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    fluid
                    name="email"
                    type="email"
                    autoFocus
                    onChange={e => this._handleChange(e)}
                    required
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
                  Login
                </Button>
              </Segment>
            </Form>
          </React.Fragment>
        )}
      </AuthContext.Consumer>
    )
  }
}
