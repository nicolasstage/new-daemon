import "./index.css";
import { mappedCountryCodes } from "../../utils/regions";
import { useEffect, useState } from "react";
import { useDaemonContext } from "../../providers/DaemonProvider";
import { getAllRegions } from "../../services/regions";
import BlobWrapper from '../../components/BlobWrapper';
import { maxNodes, currentScanNodeNumber } from '../../services/mining';
import { CoNET_Data } from '../../utils/globals';
import Header from "../../components/Header";
import CopyProxyInfo from "../../components/CopyProxyInfo";
import Footer from "../../components/Footer";
import RegionSelector from "../../components/RegionSelector";
import { useNavigate } from "react-router-dom";
import { getServerIpAddress, startSilentPass } from "../../api";

type Native_node = {
  country: string
  ip_addr: string
  region: string
  armoredPublicKey: string
  nftNumber: string
}

type Native_StartVPNObj = {
  entryNodes: Native_node[]
  privateKey: string
  exitNode: Native_node[]
}


interface RenderButtonProps {
  isConnectionLoading: boolean;
  power: boolean;
  handleTogglePower: () => void;
}

const RenderButton = ({ handleTogglePower, isConnectionLoading, power }: RenderButtonProps) => {
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

const Home = () => {
  const { sRegion, setSRegion, setAllRegions, allRegions, setIsRandom, getAllNodes, closestRegion } = useDaemonContext();
  const [serverIpAddress, setServerIpAddress] = useState<string>("");
  const [power, setPower] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isConnectionLoading, setIsConnectionLoading] = useState<boolean>(false)
  const [initPercentage, setInitPercentage] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const listenGetAllNodes = () => {
      const initpercentage = maxNodes ? currentScanNodeNumber * 100 / maxNodes : 0
      const status = Math.round(initpercentage)
      setInitPercentage(status)

      if (initpercentage < 90) {
        return setTimeout(() => {
          listenGetAllNodes()
        }, 1000)
      } else {
        setIsInitialLoading(false);
      }
    }

    listenGetAllNodes()
  }, [])

  useEffect(() => {
    const _getServerIpAddress = async () => {
      const response = await getServerIpAddress();
      const tmpIpAddress = response.data;

      setServerIpAddress(tmpIpAddress?.ip);
    };

    _getServerIpAddress();
  }, []);

  useEffect(() => {
    const _getAllRegions = async () => {
      const tmpRegions = await getAllRegions();

      const treatedRegions = Array.from(new Set(tmpRegions.map((region: string) => {
        const separatedRegion = region.split(".");
        const code = separatedRegion[1];
        const country = mappedCountryCodes[code];

        return JSON.stringify({ code, country }); // Convert the object to a string for Set comparison
      }))).map((regionStr: any) => JSON.parse(regionStr)); // Convert the string back to an object

      const unitedStatesIndex = treatedRegions.findIndex((region: any) => region.code === 'US')

      if (sRegion < 0) {
        setSRegion(unitedStatesIndex)
        setIsRandom(false);
      }

      setAllRegions(treatedRegions);
    };

    _getAllRegions()
  }, [allRegions]);

  const handleTogglePower = async () => {
    let selectedCountryIndex = -1

    if (power) {
      setPower(false);
      window?.webkit?.messageHandlers["stopVPN"].postMessage(null)
      return
    }
    const conetProfile = CoNET_Data?.profiles[0];
    const privateKey = conetProfile?.privateKeyArmor
    if (!privateKey) {
      return
    }

    setIsConnectionLoading(true)
    if (sRegion === -1) {
      selectedCountryIndex = Math.floor(Math.random() * allRegions.length)
      setSRegion(selectedCountryIndex);
    } else {
      selectedCountryIndex = sRegion
    }

    const allNodes = getAllNodes
    const exitRegion = allRegions[selectedCountryIndex].code
    const exitNodes = allNodes.filter((n: any) => n.country === exitRegion)

    //   const selectedCountryCode = allRegions[selectedCountryIndex].code

    const randomExitIndex = Math.floor(Math.random() * (exitNodes.length - 1));

    const _exitNode = [exitNodes[randomExitIndex]]

    let _entryNodes = closestRegion

    const entryNodes = _entryNodes.map(n => {
      return {
        country: n.country,
        ip_addr: n.ip_addr,
        region: n.region,
        armoredPublicKey: n.armoredPublicKey,
        nftNumber: n.nftNumber.toString()
      }
    })
    const exitNode = _exitNode.map(n => {
      return {
        country: n.country,
        ip_addr: n.ip_addr,
        region: n.region,
        armoredPublicKey: n.armoredPublicKey,
        nftNumber: n.nftNumber.toString()
      }
    })

    const startVPNMessageObject: Native_StartVPNObj = {
      entryNodes,
      exitNode,
      privateKey
    }

    await startSilentPass(startVPNMessageObject);

    setTimeout(() => {
      setIsConnectionLoading(false)
      setPower(true);
    }, 1000)

    return
  };

  return (
    <>
      <Header />
      <div className="home">
        {isInitialLoading ? (
          <>
            <button
              className="power"
            >
              <img className="loading-spinning" src="/assets/silent-pass-logo-grey.png" style={{ width: '85px', height: '85px' }} alt="" />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="not-connected">Welcome to Silent Pass</p>
              <p className="not-connected">{initPercentage}%</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <img src="/assets/header-title.svg"></img>
            </div>

            <RenderButton isConnectionLoading={isConnectionLoading} power={power} handleTogglePower={handleTogglePower} />

            {power && <CopyProxyInfo />}

            <RegionSelector
              title={allRegions?.[sRegion]?.country}
              regionCode={allRegions?.[sRegion]?.code}
              action={() => navigate("/regions")}
            />
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
