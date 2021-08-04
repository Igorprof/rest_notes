import React from 'react'
import axios from 'axios'
// import logo from './logo.svg';
import './App.css'
import UserList from './components/Users.js'
import TodoList from './components/Todos.js'
import {HashRouter, Route, Link, Switch} from 'react-router-dom'

const NotFound404 = ({ location }) => {
    return (
      <div>
          <h1>Страница по адресу '{location.pathname}' не найдена</h1>
      </div>
    )
  }


class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos':[]
       }
   }

   componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data.results
                this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/')
        .then(response => {
            const todos = response.data.results
                this.setState(
                {
                    'todos': todos
                }
            )
        }).catch(error => console.log(error))
   }    

    render() {
        return (
            <div>
              <HashRouter>
              <nav>
                <ul>
                  <li>
                    <Link to='/'>Users</Link>
                  </li>
                  <li>
                    <Link to='/todos'>Todos</Link>
                  </li>
                </ul>
              </nav>
                <Switch>
                  <Route exact path='/' component={() => <UserList users={this.state.users} />}  />
                  <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />} />
                  <Route component={NotFound404} />
                </Switch>
              </HashRouter>
            </div>
        )
      }
}

export default App;
