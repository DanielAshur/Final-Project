import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import '../css/addtodo.css'
import { Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import utils from '../utils';

function AddPost(props) {
    const [post, setNewPost] = useState({ userId: props.match.params.id, title: "", body: "" })
    const [addNew, setAddNew] = useState(false)


    useEffect(() => {
        //Add new post 
        async function addNewPost() {
            let resp = await utils.addNewPost(post)
            props.dispatch({ type: 'ADD_POST', payload: resp.data })
        }

        if (addNew === true) {
            addNewPost()
            props.history.push(`/todos-posts/${post.userId}`)
            setAddNew(false)
        }

    }, [addNew])

    //Navigate back to todos-posts with user id
    function cancle() {
        props.history.push(`/todos-posts/${post.userId}`)
    }

    return (
        <Container className="addTodoCtr">
            <div className="sticky-top">
                <Row>
                    <Col>
                        <h2>Add New Post</h2>
                    </Col>
                </Row>
                <Row className="addTodoRow">
                    <InputGroup className="mb-3">
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2" >Title :</InputGroup.Text>
                        </InputGroup.Append>
                        <FormControl className="col-sm-8" placeholder="Title.." onChange={(e) => setNewPost({ ...post, title: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2" >Body :</InputGroup.Text>
                        </InputGroup.Append>
                        <FormControl className="col-sm-8" placeholder="Body.." onChange={(e) => setNewPost({ ...post, body: e.target.value })} />
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
export default connect()(AddPost)