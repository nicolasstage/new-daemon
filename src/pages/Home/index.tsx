import "./index.css";
import { mappedCountryCodes } from "../../utils/regions";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import { useDaemonContext } from "../../providers/DaemonProvider";
import { getAllRegions, getServerIpAddress, startSilentPass } from "../../api";
import Header from "../../components/Header";
import BlobWrapper from "../../components/BlobWrapper";
import CopyProxyInfo from "../../components/CopyProxyInfo";
import Footer from "../../components/Footer";
import ClickableItem from "../../components/ClickableItem";
import RegionSelector from "../../components/RegionSelector";

const Home = () => {
  const { sRegion, setSRegion, setAllRegions, allRegions } = useDaemonContext();
  const [serverIpAddress, setServerIpAddress] = useState<string>("");
  const [power, setPower] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isConnectionLoading, setIsConnectionLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    const _getAllRegions = async () => {
      const response = await getAllRegions();
      const tmpRegions = response.data;

      const treatedRegions = Array.from(
        new Set(
          tmpRegions.map((region: string) => {
            const separatedRegion = region.split(".");
            const code = separatedRegion[1];
            const country = mappedCountryCodes[code];

            return JSON.stringify({ code, country }); // Convert the object to a string for Set comparison
          })
        )
      ).map((regionStr: any) => JSON.parse(regionStr)); // Convert the string back to an object

      setAllRegions(treatedRegions);
    };

    const _getServerIpAddress = async () => {
      const response = await getServerIpAddress();
      const tmpIpAddress = response.data;

      setServerIpAddress(tmpIpAddress?.ip);
    };

    _getAllRegions();
    _getServerIpAddress();
  }, []);

  const handleTogglePower = async () => {
    let selectedCountryIndex = -1;

    if (power) {
      setPower(false);
      return;
    }

    try {
      if (sRegion === -1) {
        selectedCountryIndex = Math.floor(Math.random() * allRegions.length);
        setSRegion(selectedCountryIndex);
      } else {
        selectedCountryIndex = sRegion;
      }

      const selectedCountryCode = allRegions[selectedCountryIndex].code;

      console.log(selectedCountryCode);

      await startSilentPass(selectedCountryCode);
      setPower(true);
      return;
    } catch (error) {
      setPower(false);
    }
  };


  const RenderButton = () => {
    if (isConnectionLoading)
      return (
        <div className="button-wrapper">
          <BlobWrapper>
            <button
              className="power"
            >
              <img src="/assets/loading-ring.png" className="loading-spinning power-icon" alt="" />
            </button>
          </BlobWrapper>

          <p className="connected">Loading...</p>
        </div>
      )

    if (power)
      return (
        <div className="button-wrapper">
          <BlobWrapper>
            <button
              className="power"
              onClick={handleTogglePower}
            >
              <img src="/assets/power.png" className="power-icon" alt="" />
            </button>
          </BlobWrapper>

          <div className="current-mined">
            <strong>Total time used</strong>
            <p>01:01:59</p>
          </div>
        </div>
      )

    return (
      <div className="button-wrapper">
        <BlobWrapper>
          <button
            className="power"
            onClick={handleTogglePower}
          >
            <img src="/assets/not-power.png" className="power-icon" alt="" />
          </button>
        </BlobWrapper>

        <div className="current-mined">
          <strong>Total time used</strong>
          <p>01:01:59</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="home">
        {!isInitialLoading ? (
          <>
            <button
              className="power"
            >
              <img className="loading-spinning" src="/assets/silent-pass-logo-grey.png" width={85} height={85} alt="" />
            </button>

            <p className="not-connected">Welcome to Silent Pass</p>
          </>
        ) : (
          <>
            <div>
              <img src="/assets/header-title.svg"></img>
            </div>

            <RenderButton />

            <CopyProxyInfo />

            <RegionSelector title={allRegions?.[sRegion]?.country} regionCode={allRegions?.[sRegion]?.code} action={() => navigate("/regions")} />
          </>
        )}

        {/* <button className="vip-button" onClick={() => navigate("/vip")}>
          VIP Service
        </button> */}
      </div>

      <Footer />
    </>
  );
};

export default Home;
