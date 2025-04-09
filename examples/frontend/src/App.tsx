// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

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
          <div style={{ textAlign: 'center', color: '#000' }}>
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
          <div style={{ textAlign: 'center', color: '#000' }}>
            <h2>Subscription Example</h2>
            <p>
              Shows how a creator can define a subscription based access to its published files. The
              creator defines subscription fee and how long a subscription is valid for. The creator
              can then associate encrypted files to the service. Only users who have purchased a
              subscription (NFT) have access to decrypt the files, along with the condition that the
              subscription must not have expired.
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
    <Container style={{ backgroundColor: '#fff', color: '#000', minHeight: '100vh' }}>
      <Flex position="sticky" px="4" py="2" justify="between">
        <h1 className="text-4xl font-bold m-4 mb-8">SealSui Testnet By FakeAirdropX</h1>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      <Card style={{ marginBottom: '2rem', textAlign: 'center', backgroundColor: '#fff', color: '#000' }}>
        <img
          src="/FakeAirdropX.png"
          alt="Logo"
          style={{ maxWidth: '250px', height: 'auto', margin: '0 auto 1rem' }}
        />
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
          Community Team
        </h2>
        <Flex justify="center" gap="4" mb="4">
          <a href="https://t.me/FakeAirdropX" target="_blank" rel="noopener noreferrer">
            <img src="/telegram-icon.svg" alt="Telegram" style={{ width: '36px' }} />
          </a>
          <a href="https://x.com/FakeAirdropX" target="_blank" rel="noopener noreferrer">
            <img src="/x-icon.svg" alt="X" style={{ width: '36px' }} />
          </a>
        </Flex>
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
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Please connect your wallet to continue</p>
      )}
    </Container>
  );
}

export default App;
