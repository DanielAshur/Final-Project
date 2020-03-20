import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Todos from './Todos';
import Posts from './Posts'
import '../css/todosposts.css'

function TodosPosts(props) {

    //Navigate to addtodo page with user id
    function navToAddTodo(id) {
        props.history.push(`/addtodo/${id}`)
    }
    
    //Navigate to addpost page with user id
    function navToAddPost(id) {
        props.history.push(`/addPost/${id}`)
    }

    return (
        <Container className="todosPostsCtr">
            <div className="sticky-top">
                <Container className="todoCtr">
                    <Row>
                        <Col sm={10} className="todoTitle">
                            <h3>Todos </h3>
                        </Col>
                        <Col sm={2} className="addTodoBtn">
                            <Button onClick={() => navToAddTodo(props.match.params.id)}>Add</Button>
                        </Col>
                    </Row>
                    <Row className="todosRowCtr">
                        <Col>
                            {
                                props.data.todos.todos.map(todo => {
                                    if (todo.userId === props.match.params.id && todo.completed !== undefined) {
                                        return <Todos key={todo._id} userId={props.match.params.id} id={todo._id} title={todo.title} completed={todo.completed} />
                                    }
                                })
                            }
                        </Col>
                    </Row>
                </Container>
                <Container className="postsCtr">
                    <Row>
                        <Col sm={10} className="postTitle">
                            <h3>Posts </h3>
                        </Col>
                        <Col sm={2} className="addPostBtn">
                            <Button onClick={() => navToAddPost(props.match.params.id)}>Add</Button>
                        </Col>
                    </Row>
                    <Row className="todosRowCtr">
                        <Col>
                            {
                                props.data.posts.posts.map(post => {
                                    if (post.userId === props.match.params.id) {
                                        return <Posts key={post._id} userId={props.match.params.id} id={post._id} title={post.title} body={post.body} />
                                    }
                                })
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(TodosPosts);