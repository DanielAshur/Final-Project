import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import User from './User';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import '../css/users.css'
import utils from '../utils'

function Users(props) {
    const [search, setSearch] = useState("")
    //Navigate to adduser page
    function navToAddUser() {
        props.history.push('/addUser');
    }

    useEffect(() => {
        //Get all users
        async function getAllUsers() {
            let resp = await utils.getUsers()
            props.dispatch({ type: 'GET_ALL_USERS', payload: resp.data })
        }
        //Get all todos
        async function getAllTodos() {
            let resp = await utils.getTodos()
            props.dispatch({ type: 'GET_ALL_TODOS', payload: resp.data })
        }
        //Get all posts
        async function getAllPosts() {
            let resp = await utils.getPosts()
            props.dispatch({ type: 'GET_ALL_POSTS', payload: resp.data })
        }

        getAllUsers();
        getAllTodos();
        getAllPosts();

    }, [])

    return (
        <Container className="mainAppCtr">
            <Row className="searchAddCtr">
                <Col sm={8} >
                    <InputGroup className="mb-3">
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2" >Search</InputGroup.Text>
                        </InputGroup.Append>
                        <FormControl placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                    </InputGroup>
                </Col>
                <Col sm={4} className="navBtn">
                    <Button variant="primary" onClick={() => navToAddUser()}>Add</Button>
                </Col>
            </Row>
            <Row className="usersDisplayCtr">
                <Col>
                    {
                        props.data.users.users.map((user, index) => {
                            if (search !== "" && user.name.toLowerCase().indexOf(search) === -1 && user.email.toLowerCase().indexOf(search) === -1) {
                                return null
                            }
                            return <User key={user._id} color="white" userId={user._id} id={index + 1} name={user.name} email={user.email} address={{ street: user.address.street, city: user.address.city, zipcode: user.address.zipcode }} />
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(withRouter(Users));