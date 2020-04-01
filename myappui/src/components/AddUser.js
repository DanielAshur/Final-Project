import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import '../css/adduser.css'
import { Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import $ from 'jquery'
import utils from '../utils'


function AddUser(props) {
    const [user, setUser] = useState({ name: "", email: "", address: { street: "", city: "", zipcode: "" } });
    const [addNew, setAddNew] = useState(false)
    
    //Navigate back to home page
    function cancel() {
        props.history.push("/")
    }

    useEffect(() => {
        //Add new user
        async function addNewUser() {
            let resp = await utils.addNewUser(user)
            props.dispatch({ type: 'ADD', payload: resp.data })
        }
        if (addNew === true) {
            addNewUser()
            setAddNew(false)
            $('.col-sm-8').val("")
        }

    }, [addNew])

    return (
        <Container className="addUserCtr">
            <div className="sticky-top">
                <Row>
                    <Col>
                        <h3>Add New User</h3>
                    </Col>
                </Row>
                <Row className="addUserRow">
                    <InputGroup className="mb-3">
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2" >Name :</InputGroup.Text>
                        </InputGroup.Append>
                        <FormControl className="col-sm-8" placeholder="Name.." onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2" >Email :</InputGroup.Text>
                        </InputGroup.Append>
                        <FormControl className="col-sm-8" placeholder="Email..." onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </InputGroup>
                    <Row className="addUserBtnCtr">
                        <Col sm={10}>
                            <Button onClick={() => cancel()}>Cancel</Button>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={() => setAddNew(true)}>Add</Button>
                        </Col>
                    </Row>
                </Row>
            </div>
        </Container>
    )
}
export default connect()(AddUser)