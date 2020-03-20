import React from 'react';
import Users from './Users';
import AddUser from './AddUser';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TodosPosts from './TodosPosts';
import AddTodo from './AddTodo';
import AddPost from './AddPost';

function MainPage() {

    return (
        <Container className="MainPage">
                <Users />
                <Switch>
                    <Route path="/addUser" component={AddUser} />
                    <Route path="/todos-posts/:id" component={TodosPosts} />
                    <Route path="/addtodo/:id" component={AddTodo} />
                    <Route path="/addpost/:id" component={AddPost} />
                </Switch>
        </Container>
    )
}

export default MainPage;