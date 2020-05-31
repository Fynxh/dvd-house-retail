import React, { Component } from 'react';
import { connect } from "react-redux";
import { addKeuangan } from "../../../actions/keuanganAction";
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

class addKeuanganModal extends Component {
    constructor(props){
        super(props)

        this.state ={ 
            modal: false,
            tanggal: null,
            pemasukan: 0,
            pengeluaran: 0,
            msg: null
        }

        this.toggle = this.toggle.bind(this)
    }

    static propTypes = {
        addKeuangan: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props

        if(error !== prevProps.error) {
            // check for error
            if (error.id === 'ADD_KEUANGAN_FAIL') {
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

        const { tanggal, pemasukan, pengeluaran } = this.state

        const newKeuangan = {
           tanggal,
           pemasukan,
           pengeluaran
        }

        this.props.addKeuangan(newKeuangan)
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
                                <i className="cil-calendar"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="date"  placeholder="Tanggal" name="tanggal" onChange={this.onChange} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="cil-dollar"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="number"  placeholder="Pemasukan" name="pemasukan" onChange={this.onChange} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="cil-dollar"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="number"  placeholder="Pengeluaran" name="pengeluaran" onChange={this.onChange} />
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

export default connect( mapStateToProps, { addKeuangan, clearError } )(addKeuanganModal)