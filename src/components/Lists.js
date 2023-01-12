import React, { useCallback, useContext } from "react";
import { Card, CardBody, CardHeader, Table, Button } from "reactstrap";
import Form from "./Form";
import { inventoryContext } from "../store/inventory-context";

const Lists = (props) => {
  const inventoryCtx = useContext(inventoryContext);

  const submittedItemHandler = (item) => {
    inventoryCtx.addItem(item);
  };
  const removeRowData = (item, e) => {
    console.log(item);
    inventoryCtx.removeItem(item);
  };
  const clearInventoryHandler = () => {
    inventoryCtx.clearInventory();
  };
  return (
    <div>
      <h2 className="App-header">Edit List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardHeader>
            <Form submitItem={submittedItemHandler} />
          </CardHeader>
          <CardBody>
            <h2 className="App-header">Inventory List</h2>
            <div className="d-flex justify-content-center">
              <Table striped className="w-100">
                <tbody>
                  {inventoryCtx.inventory.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.item}</td>
                        <td>
                          Quantity:{" "}
                          <input type="number" defaultValue={item.quantity} />
                        </td>
                        <td>
                          <button onClick={(e) => removeRowData(item, e)}>
                            X
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <Button onClick={clearInventoryHandler}>Clear All</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export { Lists };
