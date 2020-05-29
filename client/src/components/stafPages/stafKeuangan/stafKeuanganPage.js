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
                    <CardHeader>
                        <h4>Data Keuangan</h4>
                    </CardHeader>
                    <CardBody>
                        <Table hover>
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
                                        <td>{pemasukan}</td>
                                        <td>{pengeluaran}</td>
                                        <td>{jumlah}</td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                <i className="icon-pencil"></i>
                                                <i className="icon-trash"></i>
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