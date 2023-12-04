import Product from "./Product";
import { useContext, useState } from "react";
import { InventoryContext } from "../data/InventoryContext";
import { filter, sort } from "../utils/helpers";

export default function ProductList() {
  const { products } = useContext(InventoryContext);

  const [filterSelection, setFilterSelection] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [inStockFilter, setInStockFilter] = useState(false);

  let displayedProducts = sort(products, sortOrder);
  displayedProducts = filter(displayedProducts, filterSelection, inStockFilter);

  return (
    <div>
      <div className="products">
        {displayedProducts.map((p) => (
          <Product product={p} />
        ))}
      </div>
    </div>
  );
}
