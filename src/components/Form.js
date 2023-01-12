import React, { Fragment, useRef, useState } from "react";

const Form = (props) => {
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
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Item Name *</label>
          <input ref={nameRef} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="quantity">Quantity *</label>
          <input ref={qtyRef} type='number' id="quantity" min="0" max='10' step='1'></input>
          <button>Add</button>
        </div>
      </form>
    </Fragment>
  );
};

export default React.memo(Form);
