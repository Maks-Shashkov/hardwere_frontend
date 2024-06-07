import React, {useContext, useState} from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Button } from 'react-bootstrap';
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6'>
                <Col>
                    <Card className="bg-light">
                        <CardBody>
                            <h1 className="text-center mb-4">{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Введите email</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                           value={email}
                                           onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Введите пароль</label>
                                    <input type="password" className="form-control" id="password"
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 d-flex justify-content-between align-items-center">
                                    {
                                        isLogin ?
                                        <div>Нет аккаунта?
                                            <NavLink to={REGISTRATION_ROUTE} className="text-primary">Зарегистрируйся</NavLink>
                                        </div>
                                        :
                                        <div>Есть аккаунт?
                                            <NavLink to={LOGIN_ROUTE} className="text-primary">Войдите</NavLink>
                                        </div>
                                    }
                                    
                                    <Button
                                        variant={"outline-success"}
                                        onClick={click}
                                    >
                                        {isLogin ? 'Войти' : 'Регистрация'}
                                    </Button>


                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default Auth;

// import React, {useContext, useState} from 'react';
// import {Container, Form} from "react-bootstrap";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import {NavLink, useLocation, useNavigate} from "react-router-dom";
// import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
// import {login, registration} from "../http/userAPI";
// import {observer} from "mobx-react-lite";
// import {Context} from "../index";
//
// const Auth = observer(() => {
//     const {user} = useContext(Context)
//     const location = useLocation()
//     const history = useNavigate()
//     const isLogin = location.pathname === LOGIN_ROUTE
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//
//     const click = async () => {
//         try {
//             let data;
//             if (isLogin) {
//                 data = await login(email, password);
//             } else {
//                 data = await registration(email, password);
//             }
//             user.setUser(user)
//             user.setIsAuth(true)
//             history(SHOP_ROUTE)
//         } catch (e) {
//             alert(e.response.data.message)
//         }
//
//     }
//
//     return (
//         <Container
//             className="d-flex justify-content-center align-items-center"
//             style={{height: window.innerHeight - 54}}
//         >
//             <Card style={{width: 600}} className="p-5">
//                 <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
//                 <Form className="d-flex flex-column">
//                     <Form.Control
//                         className="mt-3"
//                         placeholder="Введите ваш email..."
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                     />
//                     <Form.Control
//                         className="mt-3"
//                         placeholder="Введите ваш пароль..."
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                         type="password"
//                     />
//                     <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
//                         {isLogin ?
//                             <div>
//                                 Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
//                             </div>
//                             :
//                             <div>
//                                 Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
//                             </div>
//                         }
//                         <Button
//                             variant={"outline-success"}
//                             onClick={click}
//                         >
//                             {isLogin ? 'Войти' : 'Регистрация'}
//                         </Button>
//                     </Row>
//
//                 </Form>
//             </Card>
//         </Container>
//     );
// });
//
// export default Auth;