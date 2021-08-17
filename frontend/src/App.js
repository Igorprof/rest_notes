import React from 'react'
import axios from 'axios'
// import logo from './logo.svg';
import './App.css'
import UserList from './components/Users.js'
import TodoList from './components/Todos.js'
import ProjectList from './components/Projects.js'
import LoginForm from './components/LoginForm.js'
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

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
           'todos':[],
           'token': ''
       }
   }   

   is_auth() {
     return !!this.state.token
   }

   get_data() {
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            const users = response.data.results
                this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => {
          console.log(error)
          this.setState(
            {
                'users': []
            })
        })

    axios.get('http://127.0.0.1:8000/api/todos/', {headers})
        .then(response => {
            const todos = response.data.results
                this.setState(
                {
                    'todos': todos
                }
            )
        }).catch(error => {
          console.log(error)
          this.setState(
            {
                'todos': []
            })
        })
    
    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data.results
                this.setState(
                {
                    'projects': projects
                }
            )
        }).catch(error => {
          console.log(error)
          this.setState(
            {
                'projects': []
            })
        })
   }

   componentDidMount() {   
    this.get_token_from_storage()
   }   
   
   get_headers() {
     let headers = {
       'Content-Type': 'application/json'
     } 

     headers['Authorization'] = 'Token ' + localStorage.getItem('token')

     return headers
   }

  //  set_token(token) {
  //   localStorage.setItem('token', token)
  //   this.setState({'token': token})
  // }

   get_token_from_storage() {
    this.setState({'token': localStorage.getItem('token')}, this.get_data)
  }

   get_token(login, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', 
      {
        "username": login, 
        "password": password
      })
        .then(response => {
            localStorage.setItem('token', response.data.token)
            this.setState({'token': response.data.token}, this.get_data)
        }).catch(error => console.log(error))
   }

   logout() {
     localStorage.setItem('token', '')
     this.setState({'token': ''}, this.get_data)
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
                  <li>
                    <Link to='/projects'>Projects</Link>
                  </li>
                  <li>
                    {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>} 
                  </li>
                </ul>
              </nav>
                <Switch>
                  <Route exact path='/' component={() => <UserList users={this.state.users} />}  />
                  <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />} />
                  <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />   
                  <Route exact path='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)} />} />                */}
                  <Redirect from='/users' to='/' />    
                  <Route component={NotFound404} />
                </Switch>
              </HashRouter>
            </div>
        )
      }
}

export default App;
