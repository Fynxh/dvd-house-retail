import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateBarang } from "../../../actions/barangAction";
import { clearError } from "../../../actions/errorAction";
import PropTypes from "prop-types";
import { 
    Modal, 
    ModalBody, 
    ModalHeader,
    ModalFooter, 
    Button,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText 
} from "reactstrap";

class updateBarangModal extends Component {
    constructor(props){
        super(props)

        this.state ={ 
            modal: false,
            nama: this.props.nama,
            jumlah: this.props.jumlah,
            msg: null,
            alert: null
        }

        this.toggle = this.toggle.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    static propTypes = {
        updateBarang: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props

        if(error !== prevProps.error) {
            // check for error
            if (error.id === 'UPDATE_BARANG_FAIL') {
                this.setState({ msg: error.msg.msg, alert: 'alert-danger' })
            } else {
                this.setState({ msg: null })
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            nama: this.props.nama,
            jumlah: this.props.jumlah
        })
        this.props.clearError()
    }

    onUpdate = e => {
        e.preventDefault()
        
        const { nama, jumlah } = this.state

        const updateBarang = {
            nama,
            jumlah
        }

        this.props.updateBarang(this.props.idBarang, updateBarang)
        this.setState({
            msg: 'Successfully updated',
            alert: 'alert-success'
        })
        
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle} className="btn btn-link">
                    <i className="icon-pencil" style={{ color: '#ffc107' }}></i>
                </button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-success">
                  <ModalHeader toggle={this.toggle}>Update Data</ModalHeader>
                    { this.state.msg ? (
                          <div className={`alert ${this.state.alert}`} role="alert">
                            {this.state.msg}
                          </div>
                    ) : null }
                  <ModalBody>
                    <Form onSubmit={this.onUpdate}>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="cil-user"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text"  placeholder={this.state.nama} name="nama" onChange={this.onChange} value={this.state.nama} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="cil-user"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="number"  placeholder={this.state.jumlah} name="jumlah" onChange={this.onChange} value={this.state.jumlah} />
                        </InputGroup>
                        <ModalFooter>
                            <Button color="success" >Update</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                  </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.error
})

export default connect( mapStateToProps, { updateBarang, clearError } )(updateBarangModal)