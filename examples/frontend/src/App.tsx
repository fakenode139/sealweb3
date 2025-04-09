import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  ConnectButton,
  useCurrentAccount,
} from '@mysten/dapp-kit';

import { Box, Container } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">TRY Allowlist</h2>
        <ol className="list-decimal text-sm text-left mb-4 space-y-1 pl-5">
          <li>Click "Try it"</li>
          <li>Create Your Name Allow List</li>
          <li>Add New Wallets</li>
          <li>Select Values service</li>
          <li>Upload file</li>
          <li>Click "First stage Encrypt and upload to Walrus"</li>
          <li>Click "Second stage: Associate file to Sui object"</li>
          <li>Done</li>
        </ol>
        <Link to="/allowlist-example">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Try it</button>
        </Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">TRY Subscription</h2>
        <ol className="list-decimal text-sm text-left mb-4 space-y-1 pl-5">
          <li>Click "Try it"</li>
          <li>Enter Price in MIST</li>
          <li>Subscription duration in minutes</li>
          <li>Name of the Service</li>
          <li>Click Create Service</li>
          <li>Click "Link this file"</li>
          <li>Click and Download Decrypt</li>
          <li>Done</li>
        </ol>
        <Link to="/subscription-example">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Try it</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Container>
        <header className="flex flex-col items-center py-6">
          <img src="/logo.png" alt="Logo" className="w-20 h-20 mb-2" />
          <h1 className="text-3xl font-bold text-center mb-2">Fakenode Seal Testnet</h1>
          <div className="flex space-x-4 mt-2">
            <a href="https://twitter.com">
              <img src="/twitter-icon.svg" className="w-6 h-6" alt="Twitter" />
            </a>
            <a href="https://t.me">
              <img src="/telegram-icon.svg" className="w-6 h-6" alt="Telegram" />
            </a>
            <a href="https://youtube.com">
              <img src="/youtube-icon.svg" className="w-6 h-6" alt="YouTube" />
            </a>
          </div>
          <div className="mt-4">
            <ConnectButton />
          </div>
        </header>

        <main className="px-4 pb-10">
          {currentAccount ? (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/allowlist-example/*"
                  element={
                    <Routes>
                      <Route path="/" element={<CreateAllowlist />} />
                      <Route
                        path="/admin/allowlist/:id"
                        element={
                          <div>
                            <Allowlist
                              setRecipientAllowlist={setRecipientAllowlist}
                              setCapId={setCapId}
                            />
                            <WalrusUpload
                              policyObject={recipientAllowlist}
                              cap_id={capId}
                              moduleName="allowlist"
                            />
                          </div>
                        }
                      />
                      <Route path="/admin/allowlists" element={<AllAllowlist />} />
                      <Route
                        path="/view/allowlist/:id"
                        element={<Feeds suiAddress={currentAccount.address} />}
                      />
                    </Routes>
                  }
                />
                <Route
                  path="/subscription-example/*"
                  element={
                    <Routes>
                      <Route path="/" element={<CreateService />} />
                      <Route
                        path="/admin/service/:id"
                        element={
                          <div>
                            <Service
                              setRecipientAllowlist={setRecipientAllowlist}
                              setCapId={setCapId}
                            />
                            <WalrusUpload
                              policyObject={recipientAllowlist}
                              cap_id={capId}
                              moduleName="subscription"
                            />
                          </div>
                        }
                      />
                      <Route path="/admin/services" element={<AllServices />} />
                      <Route
                        path="/view/service/:id"
                        element={
                          <FeedsToSubscribe suiAddress={currentAccount.address} />
                        }
                      />
                    </Routes>
                  }
                />
              </Routes>
            </BrowserRouter>
          ) : (
            <p className="text-center">Please connect your wallet to continue</p>
          )}
        </main>
      </Container>
    </div>
  );
}

export default App;
