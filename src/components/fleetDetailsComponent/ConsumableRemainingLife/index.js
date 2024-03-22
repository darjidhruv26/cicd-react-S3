export const ConsumableRemainingLife = () => {
  return (
    <div className="top-boxes">
      <h6 className="d-flex align-items-center">Consumable Remaining Life</h6>
      <div className="top-box remaining-life d-flex justify-content-center justify-content-sm-between">
        <div className="top-box-info">
          <p>Air Filter 1</p>
          <img src={window.location.origin + "/images/airfilter.png"} alt="airfilter" />
          <span>72%</span>
        </div>
        <div className="top-box-info">
          <p>Air Filter 2</p>
          <img src={window.location.origin + "/images/airfilter.png"} alt="airfilter" />
          <span>67%</span>
        </div>
        <div className="top-box-info">
          <p>Air Filter 3</p>
          <img src={window.location.origin + "/images/airfilter.png"} alt="airfilter" />
          <span>78%</span>
        </div>
        <div className="top-box-info">
          <p>Air Filter 4</p>
          <img src={window.location.origin + "/images/airfilter.png"} alt="airfilter" />
          <span>70%</span>
        </div>
        <div className="top-box-info">
          <p>Engine Oil Filter</p>
          <img src={window.location.origin + "/images/airfilter.png"} alt="airfilter" />
          <span>54%</span>
        </div>
      </div>
    </div>
  );
};
