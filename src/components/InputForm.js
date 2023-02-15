import React, { Fragment, useRef } from "react";
import { Form, Label, Input, Button, Col, Row } from "reactstrap";

const InputForm = (props) => {
  const nameRef = useRef();
  const qtyRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    let item = {
      item: nameRef.current.value,
      quantity: parseInt(qtyRef.current.value),
    };
    props.submitItem(item);
    console.log(item);
  };
  return (
    <Fragment>
      <Form onSubmit={submitHandler}>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Label for="item">Item</Label>
          <Col>
            <Input
              id="item"
              innerRef={nameRef}
              name="item"
              placeholder="Enter item"
              type="text"
            />
          </Col>
          <Label for="quantity">Quantity</Label>
          <Col>
            <Input
              id="quantity"
              innerRef={qtyRef}
              name="quantity"
              placeholder="Enter quantity"
              type="number"
            />
          </Col>
          <Col>
            <Button>Add</Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default InputForm;
