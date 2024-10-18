import "./index.css";
import { mappedCountryCodes } from "../../utils/regions";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import { useDaemonContext } from "../../providers/DaemonProvider";
import { getAllRegions, startSilentPass } from "../../api";

const Home = () => {
  const { sRegion, setSRegion, setAllRegions, allRegions } = useDaemonContext();
  const [power, setPower] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const _getAllRegions = async () => {
      const response = await getAllRegions();
      const tmpRegions = response.data;

      const treatedRegions = Array.from(new Set(tmpRegions.map((region: string) => {
        const separatedRegion = region.split(".");
        const code = separatedRegion[1];
        const country = mappedCountryCodes[code];

        return JSON.stringify({ code, country }); // Convert the object to a string for Set comparison
      }))).map((regionStr: any) => JSON.parse(regionStr)); // Convert the string back to an object

      setAllRegions(treatedRegions);
    };

    _getAllRegions()
  }, []);

  const handleTogglePower = async () => {
    let selectedCountryIndex = -1

    try {
      if (sRegion === -1) {
        selectedCountryIndex = Math.floor(Math.random() * allRegions.length)
        setSRegion(selectedCountryIndex);
      } else {
        selectedCountryIndex = sRegion
      }

      const selectedCountryCode = allRegions[selectedCountryIndex].code

      console.log(selectedCountryCode)

      await startSilentPass(selectedCountryCode)
      setPower(true);
      return
    } catch (error) {
      if (power) setPower(false);
    }
  };

  return (
    <div className="home">
      <h1 className="title">
        Silent Pass <span>Proxy</span>
      </h1>
      {power ? (
        <p className="connection">
          Your connection is <span>protected!</span>
        </p>
      ) : (
        <p className="connection">Your connection is not protected!</p>
      )}
      <button
        className="power"
        onClick={handleTogglePower}
      >
        {power ? (
          <img src="/assets/power.png" width={83} height={85} alt="" />
        ) : (
          <img src="/assets/not-power.png" width={83} height={85} alt="" />
        )}
      </button>
      {power ? (
        <p className="connected">Connected</p>
      ) : (
        <p className="not-connected">Not Connected</p>
      )}
      {!power && (
        <div>
          <button
            className="auto-btn"
            onClick={() => {
              if (sRegion === -1)
                setSRegion(Math.floor(Math.random() * allRegions.length));
            }}
          >
            {sRegion === -1 ? (
              <>
                <img src="/assets/auto.png" width={24} height={24} alt="" />
                Auto Select
              </>
            ) : (
              <>
                <ReactCountryFlag
                  countryCode={allRegions[sRegion].code}
                  svg
                  aria-label="United States"
                  style={{
                    fontSize: "2em",
                    lineHeight: "2em",
                  }}
                />
                {allRegions[sRegion].country}
              </>
            )}
          </button>
          <p className="home-location">Selected Location</p>
        </div>
      )}
      {power ? (
        <div>
          <ReactCountryFlag
            countryCode={allRegions[sRegion].code}
            svg
            aria-label="United States"
            style={{
              fontSize: "2em",
              lineHeight: "2em",
              marginRight: ".5em",
            }}
          />
          {allRegions[sRegion].country}
        </div>
      ) : (
        <button className="region-btn" onClick={() => navigate("/regions")}>
          <div>
            <img src="/assets/global.png" width={22} height={22} alt="" />
            <p>Select Region</p>
          </div>
          <img src="/assets/right.png" width={4} height={8} alt="" />
        </button>
      )}
    </div>
  );
};

export default Home;
