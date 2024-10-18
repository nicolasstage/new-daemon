import ReactCountryFlag from "react-country-flag";
import { Regions } from "../../utils/regions";
import "./index.css";
import { useDaemonContext } from "../../providers/DaemonProvider";
import { useNavigate } from "react-router-dom";

const Region = () => {
  const { setSRegion } = useDaemonContext();
  const navigate = useNavigate();

  const auto = () => {
    setSRegion(Math.floor(Math.random() * Regions.length));
    navigate("/");
  };

  const handleRegion = (code: number) => {
    setSRegion(code);
    navigate("/");
  };

  return (
    <div className="regions">
      <h1>Select Region</h1>
      <div className="board">
        <div className="areas">
          <button className="auto" onClick={auto}>
            <div>
              <img src="/assets/auto.png" />
              Auto Select
            </div>
          </button>
          <div style={{ display: "flex", flexDirection: 'column', gap: '12px', width: '100%' }}>
            <p className="location">Locations</p>
            <div style={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
              {Regions.map((region, index) => {
                return (
                  <button style={{ margin: 0 }} onClick={() => handleRegion(index)}>
                    <div>
                      <ReactCountryFlag
                        countryCode={region.code}
                        svg
                        aria-label="United States"
                        style={{
                          fontSize: "2em",
                          lineHeight: "2em",
                        }}
                      />
                      <div className="region">
                        <p>{region.country}</p>
                        <p style={{ fontSize: "12px" }}>{region.area}</p>
                      </div>
                    </div>
                    <p className="status">
                      <span></span>
                      <span></span>
                      <span></span>
                    </p>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </div>
      <button className="back" onClick={() => navigate("/")}>
        <img src="/assets/left.png" />
      </button>
    </div>
  );
};

export default Region;
