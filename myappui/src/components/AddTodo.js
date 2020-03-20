import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import '../css/addtodo.css'
import { Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

function AddTodo(props) {
    const [todo, setNewTodo] = useState({ userId: props.match.params.id, title: "", completed: false })
    const [addNew, setAddNew] = useState(false)

    useEffect(() => {
        //Add new todo
        async function addNewTodo() {
            let resp = await axios.post("http://localhost:8000/api/todos/", todo)
            props.dispatch({ type: 'ADD_TODO', payload: resp.data })
        }

        if (addNew === true) {
            addNewTodo()
            props.history.push(`/todos-posts/${todo.userId}`)
            setAddNew(false)
        }

    }, [addNew])
    //Navigate back to todos-posts with user id
    function cancle() {
        props.history.push(`/todos-posts/${todo.userId}`)
    }

    return (
        <Container className="addTodoCtr">
            <div className="sticky-top">
                <Row>
                    <Col>
                        <h2>Add New Todo</h2>
                    </Col>
                </Row>
                <Row className="addTodoRow">
                    <InputGroup className="mb-3">
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2" >Title :</InputGroup.Text>
                        </InputGroup.Append>
                        <FormControl className="col-sm-8" placeholder="Title.." onChange={(e) => setNewTodo({ ...todo, title: e.target.value })} />
                    </InputGroup>
                    <Row className="addTodoBtnCtr">
                        <Col sm={10}>
                            <Button onClick={() => cancle()}>Cancel</Button>
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
export default connect()(AddTodo)