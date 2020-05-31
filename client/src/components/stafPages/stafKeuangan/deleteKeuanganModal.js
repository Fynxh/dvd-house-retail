import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteKeuangan } from "../../../actions/keuanganAction";
import PropTypes from "prop-types";
import { 
    Modal, 
    ModalBody, 
    ModalHeader,
    ModalFooter, 
    Button
} from "reactstrap";

class deleteKeuanganModal extends Component {
    constructor(props){
        super(props)

        this.state ={ 
            modal: false,
        }

        this.toggle = this.toggle.bind(this)
    }

    static propTypes = {
        deleteKeuangan: PropTypes.func.isRequired
    }


    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    onDelete = id => {
        this.props.deleteKeuangan(id)
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle} type="button" className="btn btn-link, py-0">
                    <i className="icon-trash" style={{ color: '#f86c6b' }}></i>
                </button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-danger">
                  <ModalHeader toggle={this.toggle}>Delete Data</ModalHeader>
                  <ModalBody className="justify-content-center">
                    <h3>Are you sure ?</h3>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.onDelete.bind(this, this.props.idKeuangan)} >Delete</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect( null, { deleteKeuangan } )(deleteKeuanganModal)