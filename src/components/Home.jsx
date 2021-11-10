import { useEffect, useState } from "react"
import { Col, Container, Form, FormControl, Row, Button, ListGroup } from "react-bootstrap"
import { io } from "socket.io-client"

const ADDRESS = 'http://localhost:3030'
const socket = io(ADDRESS, {transports: ['websocket']})

const Home = () => {
   const [userName, setUserName] = useState('')
   const [message, setMessage] = useState('')
   const [loggedIn, setLoggedIn] = useState(false)
   const [onlineUsers, setOnlineUsers] = useState([])
   const [chatHistory, setChatHistory] = useState([])
   
        useEffect(() => {
            socket.on('connect', () => {
                console.log('connected with secket')
            })
            socket.on('loggedIn', () => {
                console.log('user is logged in :]')
                setLoggedIn(!loggedIn)
                // fetchOnlineUsers()
                socket.on('newConnection', () => {
                    console.log('a NEW user is logged in :]')
                // fetchOnlineUsers()
                })
            })
            socket.on('message', (newMessage) => {
               setChatHistory((updatedChatHistory) => [...updatedChatHistory, newMessage])
            })
        }, [])

        const fetchOnlineUsers = async () => {
            try {
                let response = await fetch(ADDRESS + '/online_users')
                if (response.ok){
                      let data = await response.json()
                      console.log("users", data)
                      let onlineUsers = data.onlineUsers
                      setOnlineUsers(onlineUsers)
                } else {
                      console.log('Something wrong with the fetch :[')
                }
            } catch (error) {
                console.log(error)
            }
        }

    return(
        <div>
      <Container fluid className="px-4">
        <Row className="my-3" style={{ height: '95vh' }}>
          <Col md={10} className="d-flex flex-column justify-content-between">
              <Form>
                  <FormControl/>
                  <Button variant="light" className="ml-2">Room</Button>
              </Form>

                 <ListGroup>
                     <ListGroup.Item>

                     </ListGroup.Item>
                 </ListGroup>

                 <Form>
                     <FormControl/>
                 </Form>
            </Col>
          

          <Col md={2} style={{ borderLeft: '1px solid black' }}>
              <div className="my-3">Connected Users:</div>
              <ListGroup></ListGroup>
          </Col>

        </Row>
      </Container>
        </div>
    )
}

export default Home