import React from "react"

// components
const Dashboard = React.lazy(() => import('../components/dashboard'))
const supervisor = React.lazy(() => import('../components/stafPages/supervisor/supervisor'))

// routes
const routes = [
    {path: '/', exact: true, nama: 'Home'},
    {path: '/dashboard', exact: true, nama: 'Dashboard', component: Dashboard},
    {path: '/laporan', exact: true, nama: 'Laporan', component: supervisor}
]

export default routes