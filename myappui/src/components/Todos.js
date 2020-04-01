import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../css/todos.css'
import utils from '../utils'

function Todos(props) {
    const title = props.title
    const [todoId, setTodoId] = useState(0)
    const userId = props.userId
    const [completed, setCompleted] = useState(props.completed);
    const todo = { _id: todoId, userId: userId, title: title, completed: completed }
    const [markCompletedBtn, setMark] = useState('showTodo')

    useEffect(() => {

        //Update todo
        async function updateTodo(id) {
            let obj = { ...todo, completed: true };
            let resp = await utils.updateTodo(id, obj)
            props.dispatch({ type: 'UPDATE_TODO', payload: resp.data })
        }
        if (todoId !== 0) {
            updateTodo(todoId)
        }
        if (completed === true) {
            setMark("hideTodo")
        }
    }, [todoId, completed])



    return (
        <Container className="todosCtr">
            <Row className="todosRowCtr">
                <Col sm={12}>
                    Title : {title}
                </Col>
                <Col sm={6}>
                    Completed : {completed.toString()}
                </Col>
                <Col className="todoBtn" sm={6}>
                    <Button className={markCompletedBtn} onClick={() => { setTodoId(props.id); setCompleted(true) }} size="sm">Mark Completed</Button>
                </Col>
            </Row>
        </Container>
    )
}


export default connect()(Todos);