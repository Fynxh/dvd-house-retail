import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getLaporan } from "../../../actions/laporanAction";
import { 
    Card,
    CardHeader,
    CardBody,
    Table
} from "reactstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel"

class supervisor extends Component {
    static propTypes = {
        laporan: PropTypes.object.isRequired,
        getLaporan: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getLaporan()
    }

    render() {
        const { laporan } = this.props.laporan
        return (
            <div>
                <Card>
                    <CardHeader className="d-flex justify-content-between">
                        <h4>Daftar Laporan Staf</h4>
                        {/* <AddKeuanganModal /> */}
                        <ReactHTMLTableToExcel 
                            className="btn btn-warning btn-pill"
                            table="tblLaporan"
                            filename="Laporan Keuangan"
                            sheet="Laporan Keuangan"
                            buttonText="Export to XLS"
                        />
                    </CardHeader>
                    <CardBody>
                        <Table id="tblLaporan" hover>
                            <thead>
                                <tr>
                                    <th>File</th>
                                    <th>Tanggal</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laporan.map(({id, tanggal, file}) => (
                                    <tr key={id}>
                                        <td>{file}</td>
                                        <td>{tanggal}</td>
                                        <td>
                                            <div className="d-flex justify-content-center">
                                                <a href={`../../tmp/file/${file}`} download>
                                                    <i className="cil-cloud-download"></i>
                                                </a>
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
    laporan: state.laporan
})

export default connect( mapStateToProps, { getLaporan } )(supervisor)