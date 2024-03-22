import { ChangeSelectedEquipment } from "../ChangeSelectedEquipment";

export const SideFilterTab = ({
  setShowEquipmentSelect,
  showEquipmentSelect,
}) => {
  const handleFilterClick = () => {
    setShowEquipmentSelect(true);
  };
  return (
    <>
      <a className="filter-btn" onClick={handleFilterClick}>
        <img src={window.location.origin + "/images/filter.svg"} alt="filter" />
      </a>
      {showEquipmentSelect ? <ChangeSelectedEquipment /> : null}
    </>
  );
};
