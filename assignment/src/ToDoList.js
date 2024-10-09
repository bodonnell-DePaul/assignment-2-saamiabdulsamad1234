import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Tab, Form, Button } from "react-bootstrap";
import "./ToDoList.css"; // Import the CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';

const ToDoList = () => {
  // Static array of ToDo items
  const [todoItems, setTodoItems] = useState([
    {
      title: "Complete Assignment",
      description: "Finish the React ToDo List assignment",
      dueDate: "2024-10-15",
    },
    {
      title: "Study for Midterms",
      description: "Prepare notes and study for the exams",
      dueDate: "2024-10-10",
    },
    {
      title: "Buy Groceries",
      description: "Get veggies and fruits for the week",
      dueDate: "2024-10-09",
    },
  ]);

  // Function to determine color based on due date
  const getColorVariant = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffInDays = (due - now) / (1000 * 60 * 60 * 24);

    if (diffInDays < 2) return "danger";
    if (diffInDays < 4) return "warning";
    if (diffInDays < 7) return "success";
    return "primary";
  };

  // Render the ToDoList component
  return (
    <Container>
      <h1>Assignment 2: Saami Depaul Todo lists</h1>
      <Row>
        <Col sm={4}>
          <h2>Add New ToDo</h2>
          <Form className="todo-form">
            <Form.Control className="mb-2" type="text" placeholder="Title" />
            <Form.Control className="mb-2" type="date" />
            <Button variant="primary" type="submit">
              Add ToDo
            </Button>
          </Form>
        </Col>
        <Col sm={8}>
          <Tab.Container id="todo-list" defaultActiveKey="#link0">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todoItems.map((item, index) => (
                    <ListGroup.Item
                      action
                      href={`#link${index}`}
                      variant={getColorVariant(item.dueDate)}
                      key={index}
                    >
                      {item.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todoItems.map((item, index) => (
                    <Tab.Pane eventKey={`#link${index}`} key={index}>
                      <h4
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                      >
                        {item.description}
                      </h4>
                      <Form.Control
                        type="date"
                        defaultValue={item.dueDate}
                        onChange={(e) => {
                          const newItems = [...todoItems];
                          newItems[index].dueDate = e.target.value;
                          setTodoItems(newItems);
                        }}
                      />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ToDoList;
