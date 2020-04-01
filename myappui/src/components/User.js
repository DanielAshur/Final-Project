import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import '../css/user.css'
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import $ from 'jquery';
import utils from '../utils'


function User(props) {
    const [otherData, setData] = useState('hide')
    const [name, setName] = useState(props.name)
    const [email, setEmail] = useState(props.email)
    const [street, setStreet] = useState(props.address.street)
    const [city, setCity] = useState(props.address.city)
    const [zipcode, setZipCode] = useState(props.address.zipcode)
    const [userId, setId] = useState(0)
    const [delId, setIdToDelete] = useState(0)
    let border

    //Set background on selected user
    $(document).ready(function () {
        let allBoxes = $('.userCtr').parent().siblings().children();
        $('.boxId').on("click", function () {
            allBoxes.removeClass("orange")
            $(this).parents('.userCtr').addClass("orange")
        })
    })

    useEffect(() => {
        //Update user
        async function updateUser(id) {
            let obj = { name: name, email: email, address: { street: street, city: city, zipcode: zipcode } };
            let resp = await utils.updateUser(id,obj)
            props.dispatch({ type: 'UPDATE', payload: resp.data })
        }
        if (userId !== 0) {
            updateUser(userId)
        }
        //Delete user
        async function deleteUser(id) {
            let userResp = await utils.deleteUser(id)
            props.dispatch({ type: 'DELETE', payload: userResp.data })
        }
        //Delete todo
        async function deleteTodo(id) {
            let todoResp = await utils.deleteTodo(id)
            props.dispatch({ type: 'DELETE_TODO', payload: todoResp.data })
        }
        //Delete post
        async function deletePost(id) {
            let postResp = await utils.deletePost(id)
            props.dispatch({ type: 'DELETE_POST', payload: postResp.data })
        }

        if (delId !== 0) {
            deleteUser(delId)
            deleteTodo(delId)
            deletePost(delId)
            props.history.push("/")
        }

    }, [userId, delId])


    //Navigate to todos-posts with user id
    function navToTodosPosts(id) {
        props.history.push(`/todos-posts/${id}`)
    }



    return (< Container >
        {
            props.data.todos.todos.map(todo => {
                if (!todo.completed && todo.userId === props.userId) {
                    border = "redBorder"
                }
                if (todo.completed && todo.userId === props.userId) {
                    border = "greenBorder"
                }
            })
        }
        <Container className={`userCtr ${border}`} >
            <Row >
                <InputGroup className="mb-3" >
                    <InputGroup.Text className="boxId" id="basic-addon2" onClick={() => navToTodosPosts(props.userId)} > ID: {props.id} </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3" >
                    <InputGroup.Append >
                        <InputGroup.Text id="basic-addon2" > Name: </InputGroup.Text>
                    </InputGroup.Append>
                    < FormControl className="col-sm-8" placeholder="Name.." value={name} onChange={(e) => setName(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-3" >
                    <InputGroup.Append >
                        < InputGroup.Text id="basic-addon2" > Email: </InputGroup.Text> </InputGroup.Append>
                    <FormControl className="col-sm-8" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                </InputGroup>
                <Row className="btnCtr" >
                    <Col sm={5} >
                        <Button className="otherDataBtn" onMouseEnter={() => setData('show')} onClick={() => setData('hide')} > Other Data </Button>
                    </Col>
                    <Col sm={4} >
                        <Button onClick={() => setId(props.userId)} > Update </Button>
                    </Col>
                    <Col sm={3} >
                        <Button onClick={() => setIdToDelete(props.userId)} > Delete </Button>
                    </Col>
                </Row>
            </Row>
            <Row className={otherData} >
                <InputGroup className="mb-3" >
                    <InputGroup.Append >
                        <InputGroup.Text id="basic-addon2" > City:
                        </InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl className="col-sm-8" placeholder="City..." value={city} onChange={(e) => setCity(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-3" >
                    <InputGroup.Append >
                        <InputGroup.Text id="basic-addon2" > Street: </InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl className="col-sm-8" placeholder="Street..." value={street} onChange={(e) => setStreet(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-3" >
                    <InputGroup.Append >
                        <InputGroup.Text id="basic-addon2" > Zip Code: </InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl className="col-sm-8" placeholder="Zip Code..." value={zipcode} onChange={(e) => setZipCode(e.target.value)} />
                </InputGroup>
            </Row>
        </Container>
    </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(withRouter(User));