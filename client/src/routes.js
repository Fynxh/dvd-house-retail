import React from "react"

// components
const Dashboard = React.lazy(() => import('./components/dashboard'))
const stafBarangPage = React.lazy(() => import('./components/stafPages/stafBarangPage'))
const stafKeuanganPage = React.lazy(() => import('./components/stafPages/stafKeuanganPage'))
const supervisor = React.lazy(() => import('./components/stafPages/supervisor'))

// routes
const routes = [
    {path: '/', exact: true, nama: 'Home'},
    {path: '/dashboard', exact: true, nama: 'Dashboard', component: Dashboard},
    {path: '/stok', exact: true, nama: 'Stok Barang', component: stafBarangPage},
    {path: '/keuangan', exact: true, nama: 'Keuangan', component: stafKeuanganPage},
    {path: '/laporan', exact: true, nama: 'Laporan', component: supervisor}
]

export default routes