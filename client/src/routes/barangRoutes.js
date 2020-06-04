import React from "react"

// components
const Dashboard = React.lazy(() => import('../components/dashboard'))
const stafBarangPage = React.lazy(() => import('../components/stafPages/stafBarang/stafBarangPage'))
const uploadLaporanPage = React.lazy(() => import('../components/stafPages/uploadLaporanPage'))

// routes
const routes = [
    {path: '/', exact: true, nama: 'Home'},
    {path: '/dashboard', exact: true, nama: 'Dashboard', component: Dashboard},
    {path: '/stok', exact: true, nama: 'Stok Barang', component: stafBarangPage},
    {path: '/upload', exact: true, nama: 'Upload Laporan', component: uploadLaporanPage}
]

export default routes