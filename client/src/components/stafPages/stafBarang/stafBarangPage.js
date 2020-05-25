import React, { Component } from 'react';
import { connect } from "react-redux";
import { getBarang } from "../../../actions/barangAction";
import PropTypes from "prop-types"
import { Table, Card, CardBody, CardHeader } from "reactstrap";

import AddBarangModal from "./addBarangModal"

class stafBarangPage extends Component {

    static propTypes = {
        barang: PropTypes.object.isRequired,
        getBarang: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getBarang()
    }

    render() {
        const { barang } = this.props.barang

        return (
            <div>
                <Card>
                    <CardHeader className="d-flex justify-content-between">
                        <h4 className="d-inline">Stok Barang</h4>
                        <AddBarangModal />
                    </CardHeader>
                    <CardBody>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Nama Barang</th>
                                    <th>Jumlah</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {barang.map(({id, nama, jumlah }) => (
                                    <tr key={id}>
                                        <td>{nama}</td>
                                        <td>{jumlah}</td>
                                        <td className="d-flex justify-content-around">
                                            <i className="icon-pencil"></i>
                                            <i className="icon-trash"></i>
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
    barang: state.barang
})

export default connect( mapStateToProps, { getBarang } )(stafBarangPage)