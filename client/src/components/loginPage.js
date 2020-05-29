import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types"
import { login } from "../actions/authAction";
import { clearError } from "../actions/errorAction";
import { 
  Button, 
  Card, 
  CardBody, 
  CardGroup, 
  Col, 
  Container, 
  Form, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Row 
} from 'reactstrap';

class loginPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
      msg: null
    }
  }

  static propType = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props

    if(error !== prevProps.error) {
      // check for login error
      if(error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onLogin = e => {
    e.preventDefault()

    const { username, password } = this.state

    const user = {
      username,
      password
    }

    this.props.login(user)
  }

  render() {
    const { isAuthenticated } = this.props.auth

    return (
      <>
        {isAuthenticated ? (<Redirect to="/dashboard" />) : (
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="5">
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        { this.state.msg ? (
                          <div className="alert alert-danger" role="alert">
                            {this.state.msg}
                          </div>
                        ) : null }
                        <Form onSubmit={this.onLogin}>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="cil-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text"  placeholder="Username" name="username" onChange={this.onChange} />
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="cil-lock-locked"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" name="password" onChange={this.onChange} />
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <Button color="primary" className="px-4">Login</Button>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </>
    )  
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
})

export default connect( mapStateToProps, {login, clearError} )(loginPage)
