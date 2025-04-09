import React, { useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid } from '@radix-ui/themes';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

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
    <Grid columns="2" gap="4">
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Allowlist Example</h2>
            <p>
              Shows how a creator can define an allowlist based access. The creator first creates an
              allowlist and can add or remove users in the list. The creator can then associate
              encrypted files to the allowlist. Only users in the allowlist have access to decrypt
              the files.
            </p>
          </div>
          <Link to="/allowlist-example">
            <Button size="3">Try it</Button>
          </Link>
        </Flex>
      </Card>
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Subscription Example</h2>
            <p>
              Shows how a creator can define a subscription based access to its published files.
              Only users who have purchased a subscription (NFT) have access to decrypt the files,
              and the subscription must not have expired.
            </p>
          </div>
          <Link to="/subscription-example">
            <Button size="3">Try it</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  return (
    <Container>
      {/* Branding Header */}
      <Flex justify="between" align="center" py="4" style={{ borderBottom: '1px solid #ccc' }}>
        <Flex align="center" gap="3">
          <img src="/FakeAirdropX.png" alt="FakeAirdropX Logo" style={{ width: 60 }} />
          <h2 style={{ margin: 0 }}>SealSui Testnet By FakeAirdropX</h2>
        </Flex>
        <ConnectButton />
      </Flex>

      <Card style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <p>
          1. Code is available{' '}
          <a href="https://github.com/MystenLabs/seal/tree/main/examples">here</a>.
        </p>
        <p>
          2. These examples are for Testnet only. Make sure your wallet is set to Testnet and has
          some balance (can request from <a href="https://faucet.sui.io/">faucet.sui.io</a>).
        </p>
        <p>
          3. Blobs are only stored on Walrus Testnet for 1 epoch by default.
        </p>
        <p>
          4. Currently only image files are supported, and the UI is minimal, designed for demo
          purposes only!
        </p>
      </Card>

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
                    element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <p>Please connect your wallet to continue</p>
      )}

      {/* Branding Footer */}
      <Flex justify="center" gap="4" mt="6" mb="4">
        <a href="https://t.me/FakeAirdropX" target="_blank" rel="noopener noreferrer">
          <img src="/telegram-icon.svg" alt="Telegram" width={40} />
        </a>
        <a href="https://x.com/FakeAirdropX" target="_blank" rel="noopener noreferrer">
          <img src="/x-icon.svg" alt="X" width={40} />
        </a>
      </Flex>
    </Container>
  );
}

export default App;
