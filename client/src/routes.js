import React from "react"

// components
const Dashboard = React.lazy(() => import('./components/dashboard'))

// routes
const routes = [
    {path: '/', exact: true, nama: 'Home'},
    {path: '/dashboard', exact: true, nama: 'Dashboard', component: Dashboard}
]

export default routes