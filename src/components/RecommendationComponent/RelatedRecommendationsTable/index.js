export const RelatedRecommendationsTable = () => {
  return (
    <div className="card drop-shadow-small border-0">
      <h6 className="card-header py-3 text-center">Related Recommendations</h6>
      <div className="card-body px-3">
        <div className="responsive-table related-recommendations">
          <table className="table res-table">
            <thead>
              <tr>
              <th>Recommendation</th>
              <th>Date </th>
              <th>Status</th>
              <th>Exceptions</th>
              <th></th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>Possible Plugged Air Cleaners/Filters</td>
              <td>25th Dec 2021</td>
              <td>In Progress</td>
              <td>
                <span className="red-color">140</span>
                <span className="orange-color">20</span>
              </td>
              <td>
                <a className="d-flex align-items-center">
                  <img
                    src={window.location.origin + "/images/arrow-right.svg"}
                    alt="arrow-right"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td>Electrical Issue</td>
              <td>25th Dec 2021</td>
              <td>Closed</td>
              <td>
                <span className="orange-color">20</span>
              </td>
              <td>
                <a className="d-flex align-items-center">
                  <img
                    src={window.location.origin + "/images/arrow-right.svg"}
                    alt="arrow-right"
                  />
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
