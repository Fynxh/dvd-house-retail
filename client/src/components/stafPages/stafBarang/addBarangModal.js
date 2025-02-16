import React, { Component } from 'react';
import { connect } from "react-redux";
import { addBarang } from "../../../actions/barangAction";
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

class addBarangModal extends Component {
    constructor(props){
        super(props)

        this.state ={ 
            modal: false,
            nama: '',
            jumlah: '',
            msg: null
        }

        this.toggle = this.toggle.bind(this)
    }

    static propTypes = {
        addBarang: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props

        if(error !== prevProps.error) {
            // check for error
            if (error.id === 'ADD_BARANG_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
        this.props.clearError()
    }

    onAdd = e => {
        e.preventDefault()

        const { nama, jumlah } = this.state

        const newBarang = {
            nama,
            jumlah
        }

        this.props.addBarang(newBarang)
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} className="btn btn-success btn-pill">
                    <span className="icon-plus"></span> Add New Data
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-success">
                  <ModalHeader toggle={this.toggle}>Add New Data</ModalHeader>
                    { this.state.msg ? (
                          <div className="alert alert-danger" role="alert">
                            {this.state.msg}
                          </div>
                    ) : null }
                  <ModalBody>
                    <Form onSubmit={this.onAdd}>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="cil-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text"  placeholder="Nama Barang" name="nama" onChange={this.onChange} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="cil-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="number"  placeholder="Jumlah" name="jumlah" onChange={this.onChange} />
                        </InputGroup>
                        <ModalFooter>
                            <Button color="success" >Add</Button>
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

export default connect( mapStateToProps, { addBarang, clearError } )(addBarangModal)