import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardHeader, Table, Button, Label } from "reactstrap";
import InputForm from "./InputForm";
import { inventoryContext } from "../store/inventory-context";

const Lists = () => {
  const inventoryCtx = useContext(inventoryContext);

  useEffect(() => {
    fetch(
      `https://inventory-67c05-default-rtdb.firebaseio.com/inventory/data.json`
    )
      .then((Response) => Response.json())
      .then((data) => {
        let updatedInv = [];
        for (let key in data) {
          updatedInv.push({
            item: data[key].item,
            quantity: data[key].quantity,
          });
        }
        inventoryCtx.updateInventory(updatedInv);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      `https://inventory-67c05-default-rtdb.firebaseio.com/inventory.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          data: inventoryCtx.inventory,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((Response) => Response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [inventoryCtx.inventory]);

  const submittedItemHandler = (item) => {
    inventoryCtx.addItem(item);
  };

  const removeRowData = (item, e) => {
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
            <InputForm submitItem={submittedItemHandler} />
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
                          Quantity: <Label>{item.quantity}</Label>
                        </td>
                        <td>
                          <Button onClick={(e) => removeRowData(item, e)}>
                            Delete
                          </Button>
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
