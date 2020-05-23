import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from "../components/loginPage"
import { connect } from "react-redux";
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from "prop-types"

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

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    const { isAuthenticated } = this.props.auth
    console.log(isAuthenticated)
    // const isAuthenticated = false

    const authRoutes = (
      <React.Fragment>
        {routes.map((route, idx) => {
          return route.component ? (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
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
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
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
            <Container fluid>
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

export default connect( mapStateToProps, {} )(DefaultLayout)
