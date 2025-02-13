import ClickableItem from '../../components/ClickableItem';
import Footer from '../../components/Footer';
import './index.css';

import languageIcon from "./assets/language.svg";
import applicationIcon from "./assets/applications.svg";
import themeIcon from "./assets/theme.svg";
import adsBlockIcon from "./assets/ads-block.svg";
import extraRewardIcon from "./assets/extra-reward.svg";
import splitTunnelingIcon from "./assets/split-tunneling.svg";
import lockIcon from "./assets/lock-icon.svg";

import Separator from '../../components/Separator';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type OptionGroup = {
  heading: string;
  items: {
    id: number;
    icon: string;
    title: string;
    childrenText?: string;
    action?: () => void;
    theme?: boolean;
  }[]
}

type OptionGroups = OptionGroup[];

export default function Settings() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  function handleChangeTheme() {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light')
  }

  const optionGroups = useMemo<OptionGroups>(() => ([
    {
      heading: "General",
      items: [
        {
          id: 1,
          icon: languageIcon,
          title: "Language",
          childrenText: "English",
          action: () => navigate("/languages")
        },
        /* {
          id: 2,
          icon: applicationIcon,
          title: "Applications",
          action: () => navigate("/applications")
        }, */
        {
          id: 3,
          icon: themeIcon,
          title: "Theme",
          action: handleChangeTheme,
          theme: true,
        }
      ]
    }, {
      heading: "Passcode",
      items: [
        {
          id: 1,
          icon: lockIcon,
          title: "Turn passcode on",
          action: () => navigate("/passcode/new"),
        },
        {
          id: 2,
          icon: lockIcon,
          title: "Change passcode",
          action: () => navigate("/passcode/change")
        }
      ]
    },
  ]), [navigate]);

  return (
    <div className="page-container">
      <h1>Settings</h1>
      <div className="nft-info">
        <div className="main-card">
          <div>
            <span>NFT</span>
            <p>1</p>
          </div>
          <div>
            <span>Expiration date</span>
            <p>∞</p>
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => navigate('/wallet')}>My Wallet</button>
          <button>Redeem the NFT</button>
        </div>
      </div>

      <div className="options">
        {
          optionGroups.map((optionGroup) => (
            <>
              <div className="option-group">
                <h3>{optionGroup.heading}</h3>
                <div>
                  {optionGroup.items.map((item, index) => (
                    <>
                      <ClickableItem title={item.title} icon={item.icon} action={item?.action} switchState={item?.theme ? theme === 'light' : false} switchComp={item?.theme} theme={item?.theme} chevron={!item?.theme}>{item.childrenText && <p>{item.childrenText}</p>}</ClickableItem>
                      {index < optionGroup.items.length - 1 && <Separator />}
                    </>
                  ))}
                </div>
              </div>
            </>
          ))
        }
      </div>

      <Footer />
    </div>
  )
}