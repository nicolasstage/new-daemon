import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import redeemNftIcon from './assets/redeem-nft.svg';
import './index.css';
import AccountList from '../../components/AccountList';

export default function Wallet() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>My wallet</h1>

      <AccountList />

      <div className="cta-buttons">
        <div className="highlight-1">
          <button>
            <p>Transfer Silent Pass Passport</p>
          </button>
        </div>
        <div className="highlight-2">
          <button>
            <img src="/assets/conet-outline.svg" alt="Platform" />
            <p>Purchase Silent Pass Passport</p>
          </button>
        </div>
        <div>
          <button>
            <img src="/assets/conet-white.svg" alt="Platform" />
            <p>Open CONET Platform</p>
          </button>
          <p>*Open CoNET Platform - Redeem Silent Pass passport and transfer Silent Pass passport to Silent Pass Account (public wallet address) if user has guardian NFT or CoNETian NFT.</p>
        </div>
        <div>
          <button>
            <img src="/assets/conet-white.svg" alt="Platform" />
            <p>Get Silent Pass Passport</p>
          </button>
          <p>**Open CoNET Website - Fill in the purchase form of Subscribe Standard Plan or Premium Plan and finish the payment with $SP token), get the silent pass passport in Silent Pass Account (public wallet address).</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}