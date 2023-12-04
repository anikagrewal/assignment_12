import { useContext } from "react";
import { InventoryContext } from "../data/InventoryContext";
import Button from "@mui/material/Button";

export default function Product({ product }) {
  const { deleteProduct, setEditing, updateProduct } =
    useContext(InventoryContext);

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

    return `${hours12}:${minutes60}:${seconds60} ${ampm}`;
  };

  function handleCheckbox() {
    if (!product.inStock) {
      updateProduct({
        ...product,
        inStock: true, //makes it the opposite. if it was in stock, then it will say not in stock when clicked
        completedTime: formattedTime(),
      });
    } else {
      updateProduct({
        ...product,
        inStock: false, //makes it the opposite. if it was in stock, then it will say not in stock when clicked
        completedTime: "",
      });
    }
  }

  return (
    <div className="product">
      <div className="product-completion">
        <h3>{product.name}</h3>
        <label className="instock-label">
          <input
            type="checkbox"
            checked={product.inStock}
            onChange={handleCheckbox}
          />
          {product.inStock ? "Task Completed" : "Task Not Completed"}
        </label>
        <div className="completionTime">
          <p>Task started at {product.time}</p>
          <p>Task completed on {product.completedTime}</p>
        </div>
      </div>
      <div className="buttons">
        <div>
          <Button
            variant="contained"
            className="edit-btn"
            onClick={() => setEditing(product.id)}
          >
            Edit
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            className="delete-btn"
            onClick={() => deleteProduct(product.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
