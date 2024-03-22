import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecommendationDetailsByException } from "../../../redux/recommendation/RecommendationThunks";

export const RecommendationsTable = ({ asset }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  let recommendations = []
  asset?.exceptions?.map(exception => {
    return exception.recommendations.map(recommendation => {
      return recommendation && recommendations.push({ ...recommendation, total_critical: exception.total_critical, total_minor: exception.total_minor, total_major: exception.total_major })
    })
  })

  return (
    <div className="related-recommendations">
      <div className="exception-popup-heading d-flex justify-content-between">
        <h6 className="d-flex align-items-center">
          <img src={window.location.origin + "/images/Recommendation-icon.svg"} alt="Recommendations" />
          Recommendations
        </h6>
      </div>
      <div className="responsive-table ">
        <table className="table res-table">
          <tbody>
          <tr>
            <th>Recommendation</th>
            <th>Date </th>
            <th>Status</th>
            <th>Exceptions</th>
            <th></th>
          </tr>


          {recommendations?.map(recommendation => <tr key={recommendation.id}>
              <td>{recommendation.title}</td>
              <td><Moment format="YYYY/MM/DD h:mm a">{recommendation.created_at}</Moment></td>
              <td>Closed</td>
              <td>
                <span className="red-color">{recommendation.total_critical}</span>
                <span className="orange-color">{recommendation.total_major}</span>
                <span className="yellow-color">{recommendation.total_minor}</span>
              </td>
              <td>
                <a className="d-flex align-items-center" onClick={() => {
                    dispatch(fetchRecommendationDetailsByException({exception_id: recommendation.exception_id}));
                    navigate("/recommendation", { state: {exception_id: recommendation.exception_id}});
                  }}>
                  <img src={window.location.origin + "/images/arrow-right.svg"} alt="arrow-right" />
                </a>
              </td>
            </tr>)}
            </tbody>

        </table>
      </div>
    </div>
  );
};
