import { useState } from 'react';
import './index.css';
import Separator from '../Separator';
import CopyAccountInfo from './CopyAccountInfo';
import { wallets } from './walletsMock';
import { useDaemonContext } from '../../providers/DaemonProvider';

export default function AccountList() {
  const [openAccountList, setOpenAccountList] = useState<string[]>([]);
  const { profile } = useDaemonContext();


  function toggleAccount(accountAddress: string) {
    setOpenAccountList((prev) => (
      prev.includes(accountAddress) ? prev.filter((item) => item !== accountAddress) : [...prev, accountAddress]
    ))
  }

  return (
    <div className="account-list">
      <div className={`account-wrapper ${openAccountList.includes(profile?.KeyID) ? 'active' : ''}`}>
        <div className="account-main-card" onClick={() => toggleAccount(profile?.keyID)}>
          <div className="account-info">
            <p>{profile?.keyID}</p>
          </div>
          <h3>SilentPass Account</h3>
        </div>
        <div className="info-card">
          {
            profile?.tokens.map((token: any) => (
              <div className="info-wrapper">

                {token.name === "cCNTP" && (
                  <>
                    <p>{token?.network}</p>
                    <div>
                      <p>{token.name}</p>
                      <p>{token.balance}</p>
                    </div>
                  </>
                )
                }
              </div>
            ))
          }
          <Separator />
          <CopyAccountInfo wallet={profile} />
        </div>
      </div>
    </div>
  )
}