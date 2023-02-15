import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { inventoryContext } from "../store/inventory-context";

const Home = () => {
  const inventoryCtx = useContext(inventoryContext);
  const navigate = useNavigate();

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

  const editListHandler = () => {
    navigate("/lists");
  };

  return (
    <div>
      <h2 className="App-header">Inventory List</h2>
      <div className="d-flex justify-content-center">
        <Table striped className="w-50">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventoryCtx.inventory.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Button onClick={editListHandler}>Edit List</Button>
    </div>
  );
};
export { Home };
