import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from "prop-types"

import { logout } from "../actions/authAction";

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../_nav';
// routes config
import routes from '../routes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props) {
    super(props)

    this.state ={
      navigation: null
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    // const isAuthenticated = false
    const level = user ? user.level : null

    const authRoutes = (
      <React.Fragment>
        {routes.map((route, idx) => {
          return route.component ? (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.nama}
              render={props => (
                <route.component {...props} />
            )} />
          ) : (null);
        })}
        <Redirect from="/" to="/dashboard" />
      </React.Fragment>
    )

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container className="py-3" fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  { isAuthenticated ? authRoutes : (<Redirect to="/login" />) }
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect( mapStateToProps, {logout} )(DefaultLayout)
