import { useState } from 'react';
import Separator from '../Separator';
import { CoNET_Data } from '../../utils/globals';
import Skeleton from '../Skeleton';

let copyTimeoutId: NodeJS.Timeout;

export default function CopyAccountInfo({ wallet }: any) {
  const [copied, setCopied] = useState({
    address: "",
    info: "",
  });

  function handleCopy(info: string) {

    let value = '';

    if (info === 'address')
      value = wallet.keyID
    else if (info === 'key')
      value = wallet.privateKeyArmor
    else if (info === 'words')
      value = CoNET_Data?.mnemonicPhrase || ''

    navigator.clipboard.writeText(value);
    setCopied({ address: value, info });

    if (copyTimeoutId)
      clearTimeout(copyTimeoutId)

    copyTimeoutId = setTimeout(() => setCopied({
      address: '',
      info: '',
    }), 3000);
  }

  return (
    <>
      <div className="copy-div">
        {wallet?.keyID ?
          <>
            <p>Copy Wallet Address</p>
            <button onClick={() => handleCopy("address")}>
              {
                (copied.address === wallet?.keyID && copied.info === "address") ? (
                  <img src="/assets/check.svg" alt="Copy icon" />
                ) : (
                  <img src="/assets/copy-purple.svg" alt="Copy icon" />
                )
              }
            </button>
          </>
          : <Skeleton width='100%' height='20px' />
        }
      </div>
      <Separator />
      <div className="copy-div">
        {wallet?.privateKeyArmor ?
          <>
            <p>Copy Private Key</p>
            <button onClick={() => handleCopy("key")}>
              {
                (copied.address === wallet?.privateKeyArmor && copied.info === "key") ? (
                  <img src="/assets/check.svg" alt="Copy icon" />
                ) : (
                  <img src="/assets/copy-purple.svg" alt="Copy icon" />
                )
              }
            </button>
          </>
          : <Skeleton width='100%' height='20px' />
        }
      </div>
      <Separator />
      <div className="copy-div">
        {CoNET_Data?.mnemonicPhrase ?
          <>
            <p>Copy 12 words</p>
            <button onClick={() => handleCopy("words")}>
              {
                (copied.address === CoNET_Data?.mnemonicPhrase && copied.info === "words") ? (
                  <img src="/assets/check.svg" alt="Copy icon" />
                ) : (
                  <img src="/assets/copy-purple.svg" alt="Copy icon" />
                )
              }
            </button>
          </>
          : <Skeleton width='20px' height='20px' />
        }
      </div>
    </>
  )
}