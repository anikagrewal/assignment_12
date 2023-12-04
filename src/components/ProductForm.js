import { useContext, useState } from "react";
import { InventoryContext } from "../data/InventoryContext";
import { nanoid } from "nanoid";
import { Button, TextField } from "@mui/material"

export default function ProductForm() {
  const { addProduct, setEditing, updateProduct, editing, products } =
    useContext(InventoryContext);

  let initialData = {
    name: "",
    inStock: false,
    time: "",
  };

  if (editing !== "new") {
    initialData = products.find(function (p) {
      return p.id === editing;
    });
  }
  const [product, setProduct] = useState(initialData);

  function handleSubmit(e) {
    // e.preventDefault();

    if (editing === "new") {
      addProduct({
        ...product,
        id: nanoid(),
        time: time,
        date: date,
      });
    } else {
      updateProduct(product);
    }
  }

  function handleInput(e, field) {
    setProduct({ ...product, [field]: e.target.value });
  }

  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const formattedTime = () => {
    const [hours, minutes, seconds] = time.split(":");
    const timeObj = new Date();
    timeObj.setHours(hours);
    timeObj.setMinutes(minutes);
    timeObj.setSeconds(seconds);

    const ampm = timeObj.getHours() >= 12 ? "PM" : "AM";
    let hours12 = timeObj.getHours() % 12;
    hours12 = hours12 ? hours12 : 12;

    let minutes60 = timeObj.getMinutes() % 60;
    minutes60 = minutes60 < 10 ? `0${minutes60}` : minutes60;

    let seconds60 = timeObj.getSeconds() % 60;
    seconds60 = seconds60 < 10 ? `0${seconds60}` : seconds60;

    setProduct({ time: `${hours12}:${minutes60}:${seconds60} ${ampm}` });
    return;
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="adding-task">
          <label>Task:</label>
          <div className="input-box">
            <TextField
            fullWidth
            id="fullWidth"
              value={product.name}
              onChange={(e) => handleInput(e, "name")}
            />
          </div>
        </div>
        <div className="form-btns">
          <div>
            <Button variant="contained"
            className="save-btn"
            onClick={() => handleSubmit()}>
              Save
            </Button>
          </div>
          <div>
            <Button variant="contained"
            className="cancel-btn"
            onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
