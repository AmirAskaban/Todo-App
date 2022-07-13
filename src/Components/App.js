import React, { useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import AsyncComponent from '../AsyncComponent';
import loadable from '@loadable/component';

// Import Components
import Header from './Layouts/Header';

// impor Contexts
import TodosContext from './../Contexts/todos';
import AuthContext from './../Contexts/auth';

// import Reducers
import AppReducer from './../Reducers/appReducer';

const Home = loadable(() => import('../Routes/Home'))
const About = loadable(() => import('../Routes/About'))
const Contact = loadable(() => import('../Routes/Contact'))
const Todo = loadable(() => import('../Routes/Todo'))
const NotFound = loadable(() => import('../Routes/NotFound'))


// const Home = AsyncComponent(() => import('../Routes/Home').then(module => module.default))
// const About = AsyncComponent(() => import('../Routes/About').then(module => module.default))
// const Contact = AsyncComponent(() => import('../Routes/Contact').then(module => module.default))
// const Todo = AsyncComponent(() => import('../Routes/Todo').then(module => module.default))
// const NotFound = AsyncComponent(() => import('../Routes/NotFound').then(module => module.default))
function App() {

    const [state, dispatch] = useReducer(AppReducer, {
        todos: [],
        authenticated: false
    })

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{
                authenticated: state.authenticated,
                dispatch
            }}>
                <TodosContext.Provider value={{
                    todos: state.todos,
                    dispatch
                }}>
                    <div className="App" >
                        <Header />
                        <main >
                            <Routes>
                                <Route path="/" element={< Home />} />
                                <Route path="/todos/:todo" element={<Todo />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/404" element={<NotFound />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                    </div>
                </TodosContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter >
    )
}

export default App;
