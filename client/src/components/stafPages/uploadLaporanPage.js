import React, { Component } from 'react';
import PropTypes from "prop-types";
import { 
    Form,
    Input,
    Button
} from "reactstrap";
import { connect } from "react-redux";
import { addLaporan } from "../../actions/laporanAction";

class uploadLaporanPage extends Component {
    constructor(props) {
        super(props)

        const date = new Date()

        this.state = {
            laporan: null,
            tanggal: date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate() ,
            disabled: true
        }
    }

    onFile = e => {
        this.setState({
            laporan: e.target.files[0],
            disabled: false
        })
    }

    onUpload = e => {
        e.preventDefault()

        const data = new FormData()
        data.append('laporan', this.state.laporan)
        data.append('tanggal', this.state.tanggal)

        this.props.addLaporan(data)
    }

    static propTypes = {
        addLaporan: PropTypes.func.isRequired
    }
    render() {
        return (
            <div>
                <h1>Upload Laporan</h1>
                <Form onSubmit={this.onUpload}>
                    <Input type="file" onChange={this.onFile} name="laporan" />
                    <Input type="date" name="tanggal" defaultValue={this.state.tanggal} hidden />
                    <Button className="btn btn-pill btn-success" disabled={this.state.disabled}>
                        <i className="cil-cloud-upload" ></i> Upload
                    </Button>
                </Form>
            </div>
        );
    }
}

export default connect( null, { addLaporan } )(uploadLaporanPage)