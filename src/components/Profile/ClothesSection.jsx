import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({handleItemClick}) {
    return <div><ul className="main__items">
    {defaultClothingItems
      .map((item) => (
        <ItemCard
          key={item._id}
          card={item}
          onItemClick={handleItemClick}
        />
      ))}
  </ul></div>
}

export default ClothesSection;