import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

class addBarangModal extends Component {
    constructor(props){
        super(props)

        this.state ={ 
            modal: false
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} className="btn btn-success btn-pill">
                    <span className="icon-plus"></span> Add New Data
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-success">
                  <ModalHeader toggle={this.toggle}>Add New Data</ModalHeader>
                  <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default addBarangModal;