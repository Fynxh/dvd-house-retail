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
import SupervisorNavigation from '../navigations/_supervisorNav';
import BarangNavigation from '../navigations/_barangNav'
import KeuanganNavigation from '../navigations/_keuanganNav'

// routes config
import SupervisorRoutes from '../routes/supervisorRoutes';
import KeuanganRoutes from '../routes/keuanganRoutes'
import BarangRoutes from '../routes/barangRoutes'

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props) {
    super(props)

    this.state ={
      navigation: null,
      level: null
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  componentDidMount(){
    const { user } = this.props.auth
    if(user.level === 'STAF-BARANG'){
      this.setState({ level: 'STAF-BARANG', navigation: 'STAF-BARANG' })
    }else if(user.level === 'STAF-KEUANGAN'){
      this.setState({ level: 'STAF-KEUANGAN', navigation: 'STAF-KEUANGAN' })
    }else if(user.level === 'SUPERVISOR'){
      this.setState({ level: 'SUPERVISOR', navigation: 'SUPERVISOR' })
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { isAuthenticated } = this.props.auth
    // const isAuthenticated = false

    const barangRoutes = (
      <React.Fragment>
        {BarangRoutes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.nama}
                render={props => (
                  <route.component {...props} />
              )} />
            ) : (null)
          })}
      </React.Fragment>
    )

    const keuanganRoutes = (
      <React.Fragment>
        {KeuanganRoutes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.nama}
                render={props => (
                  <route.component {...props} />
              )} />
            ) : (null)
          })}
      </React.Fragment>
    )

    const supervisorRoutes = (
      <React.Fragment>
        {SupervisorRoutes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.nama}
                render={props => (
                  <route.component {...props} />
              )} />
            ) : (null)
          })}
      </React.Fragment>
    )

    const barangNav = (
      // <React.Fragment>
        <AppSidebarNav navConfig={BarangNavigation} {...this.props} router={router}/>
      // </React.Fragment>
    )

    const keuanganNav = (
      // <React.Fragment>
        <AppSidebarNav navConfig={KeuanganNavigation} {...this.props} router={router}/>
      // </React.Fragment>
    )

    const supervisorNav = (
      // <React.Fragment>
        <AppSidebarNav navConfig={SupervisorNavigation} {...this.props} router={router}/>
      // </React.Fragment>
    )

    const authRoutes = (
      <React.Fragment>
        { 
          this.state.level === 'STAF-BARANG' ? barangRoutes : 
          this.state.level === 'STAF-KEUANGAN' ? keuanganRoutes :
          this.state.level === 'SUPERVISOR' ? supervisorRoutes : null
        }
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
            {
              this.state.navigation === 'STAF-BARANG' ? barangNav : 
              this.state.navigation === 'STAF-KEUANGAN' ? keuanganNav :
              this.state.navigation === 'SUPERVISOR' ? supervisorNav : null
            }
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
