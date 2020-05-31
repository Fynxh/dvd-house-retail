import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getKeuangan } from "../../../actions/keuanganAction";
import { 
    Card,
    CardHeader,
    CardBody,
    Table
} from "reactstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel"

import AddKeuanganModal from "./addKeuanganModal"
import DeleteKeuanganModal from "./deleteKeuanganModal"
import UpdateKeuanganModal from "./updateKeuanganModal"

class stafKeuanganPage extends Component {
    static propTypes = {
        keuangan: PropTypes.object.isRequired,
        getKeuangan: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getKeuangan()
    }

    render() {
        const { keuangan } = this.props.keuangan
        return (
            <div>
                <Card>
                    <CardHeader className="d-flex justify-content-between">
                        <h4>Data Keuangan</h4>
                        <AddKeuanganModal />
                        <ReactHTMLTableToExcel 
                            className="btn btn-warning btn-pill"
                            table="tblKeuangan"
                            filename="Laporan Keuangan"
                            sheet="Laporan Keuangan"
                            buttonText="Export to XLS"
                        />
                    </CardHeader>
                    <CardBody>
                        <Table id="tblKeuangan" hover>
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Pemasukan</th>
                                    <th>Pengeluaran</th>
                                    <th>Jumlah</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keuangan.map(({id, tanggal, pemasukan, pengeluaran, jumlah}) => (
                                    <tr key={id}>
                                        <td>{tanggal}</td>
                                        <td>{pemasukan.toLocaleString()}</td>
                                        <td>{pengeluaran.toLocaleString()}</td>
                                        <td>{jumlah.toLocaleString()}</td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                <UpdateKeuanganModal idKeuangan={id} tanggal={tanggal} pemasukan={pemasukan} pengeluaran={pengeluaran} />
                                                <DeleteKeuanganModal idKeuangan={id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    keuangan: state.keuangan
})

export default connect( mapStateToProps, { getKeuangan } )(stafKeuanganPage)