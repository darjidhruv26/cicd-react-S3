export const TopRecommendation = ({asset}) => {
  let topRecommendations = []
  asset?.exceptions?.map(exception => {
  return exception.recommendations.map(recommendation => recommendation && topRecommendations.push({...recommendation, total_critical: exception.total_critical}))
  })
  

  return (
    <div className="col-sm-12 col-md-6">
      <div className="top-boxes">
        <h6 className="d-flex align-items-center">
          <img className="mr-2" src={window.location.origin + "/images/recommendation-icon.svg"} alt="" />
          Top 3 Recommendations
        </h6>
        <div className="top-box d-flex justify-content-center justify-content-sm-between">
          
         { topRecommendations.slice(0, 3).map(recomandation => <div key={recomandation.id} className="top-box-info">
            <h5 className="orange d-flex align-items-center justify-content-center">
              {recomandation.total_critical}
            </h5>
            <p>{recomandation.title}</p>
          </div>
          )}

        </div>
      </div>
    </div>
  );
};
