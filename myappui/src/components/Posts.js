import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/todos.css'

function Posts(props) {
    const title = props.title
    const body = props.body




    return (
        <Container className="todosCtr">
            <Row className="todosRowCtr">
                <Col sm={12}>
                    Title : {title}
                </Col>
                <Col sm={6}>
                    Body : {body}
                </Col>
            </Row>
        </Container>
    )
}


export default connect()(Posts);