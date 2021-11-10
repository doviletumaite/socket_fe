import { Col, Container, Form, FormControl, Row, Button, ListGroup } from "react-bootstrap"
import { io } from "socket.io-client"

const ADDRESS = 'http://localhost:3030'
const socket = io(ADDRESS, {transports: ['websocket']})
const Home = () => {

    return(
        <div>
      <Container fluid className="px-4">
        <Row className="my-3" style={{ height: '95vh' }}>
          <Col md={10} className="d-flex flex-column justify-content-between">
              <Form>
                  <FormControl/>
                  <Button varaint="primary" className="ml-2">Room</Button>
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