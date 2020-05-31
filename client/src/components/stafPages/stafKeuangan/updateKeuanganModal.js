import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateKeuangan } from "../../../actions/keuanganAction";
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

class updateKeuanganModal extends Component {
    constructor(props){
        super(props)

        this.state ={ 
            modal: false,
            tanggal: this.props.tanggal,
            pemasukan: this.props.pemasukan,
            pengeluaran: this.props.pengeluaran,
            msg: null,
            alert: null
        }

        this.toggle = this.toggle.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    static propTypes = {
        updateKeuangan: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props

        if(error !== prevProps.error) {
            // check for error
            if (error.id === 'UPDATE_KEUANGAN_FAIL') {
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
            tanggal: this.props.tanggal,
            pemasukan: this.props.pemasukan,
            pengeluaran: this.props.pengeluaran
        })
        this.props.clearError()
    }

    onUpdate = e => {
        e.preventDefault()
        
        const { tanggal, pemasukan, pengeluaran} = this.state

        const updateKeuangan = {
            tanggal,
            pemasukan,
            pengeluaran
        }

        this.props.updateKeuangan(this.props.idKeuangan, updateKeuangan)
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
                                <i className="cil-calendar"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="date"  placeholder={this.state.tanggal} name="tanggal" onChange={this.onChange} value={this.state.tanggal} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="cil-dollar"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="number"  placeholder={this.state.pemasukan} name="pemasukan" onChange={this.onChange} value={this.state.pemasukan} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="cil-dollar"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="number"  placeholder={this.state.pengeluaran} name="pengeluaran" onChange={this.onChange} value={this.state.pengeluaran} />
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

export default connect( mapStateToProps, { updateKeuangan, clearError } )(updateKeuanganModal)