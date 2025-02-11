import { useState } from 'react';
import Separator from '../Separator';
import { CoNET_Data } from '../../../../new-daemon/src/utils/globals';

export default function CopyAccountInfo({ wallet }: any) {
  const [copied, setCopied] = useState({
    address: "",
    info: "",
  });

  function handleCopy(value: string, info: string) {
    navigator.clipboard.writeText(value);
    setCopied({ address: value, info });

    setTimeout(() => setCopied({
      address: '',
      info: '',
    }), 3000);
  }

  return (
    <>
      <div className="copy-div">
        <p>Copy Wallet Address</p>
        <button onClick={() => handleCopy(wallet?.keyID, "address")}>
          {
            (copied.address === wallet?.keyID && copied.info === "address") ? (
              <img src="/assets/check.svg" alt="Copy icon" />
            ) : (
              <img src="/assets/copy-purple.svg" alt="Copy icon" />
            )
          }
        </button>
      </div>
      <Separator />
      <div className="copy-div">
        <p>Copy Private Key</p>
        <button onClick={() => handleCopy(wallet?.privateKeyArmor, "key")}>
          {
            (copied.address === wallet?.privateKeyArmor && copied.info === "key") ? (
              <img src="/assets/check.svg" alt="Copy icon" />
            ) : (
              <img src="/assets/copy-purple.svg" alt="Copy icon" />
            )
          }
        </button>
      </div>
      <Separator />
      <div className="copy-div">
        <p>Copy 12 words</p>
        <button onClick={() => handleCopy(CoNET_Data?.mnemonicPhrase || "", "words")}>
          {
            (copied.address === wallet?.keyID && copied.info === "words") ? (
              <img src="/assets/check.svg" alt="Copy icon" />
            ) : (
              <img src="/assets/copy-purple.svg" alt="Copy icon" />
            )
          }
        </button>
      </div>
    </>
  )
}