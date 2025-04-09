// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid, Text } from '@radix-ui/themes';
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
    <Grid columns={{ initial: '1', md: '2' }} gap="4">
      <Card size="3">
        <Flex direction="column" gap="4" align="center" justify="between">
          <div style={{ textAlign: 'center' }}>
            <h2>Allowlist Example</h2>
            <p>
              Creators define an allowlist-based access to encrypted files. Only users in the list
              can decrypt them.
            </p>
          </div>
          <Link to="/allowlist-example">
            <Button size="3">Try it</Button>
          </Link>
        </Flex>
      </Card>
      <Card size="3">
        <Flex direction="column" gap="4" align="center" justify="between">
          <div style={{ textAlign: 'center' }}>
            <h2>Subscription Example</h2>
            <p>
              Define a subscription-based access with TTL. Users with valid subscriptions can decrypt
              the files.
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
    <Container size="3" px="4" py="4">
      <Flex justify="between" align="center" mb="5">
        <Flex align="center" gap="3">
          <img src="/FakeAirdropX.png" alt="FakeAirdropX Logo" style={{ height: 48 }} />
          <Text size="5" weight="bold" color="gray">
            SealSui Testnet By FakeAirdropX
          </Text>
        </Flex>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      <Card mb="4" size="2">
        <Text size="2">
          This app demonstrates Seal Sui features. Make sure you're on Testnet and funded from
          <a href="https://faucet.sui.io/" target="_blank" rel="noopener noreferrer"> faucet.sui.io</a>.
        </Text>
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
                        <Allowlist setRecipientAllowlist={setRecipientAllowlist} setCapId={setCapId} />
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
                        <Service setRecipientAllowlist={setRecipientAllowlist} setCapId={setCapId} />
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
        <Text align="center" mt="6">Please connect your wallet to continue</Text>
      )}

      <Flex mt="8" justify="center" gap="4">
        <a href="https://t.me/FakeAirdropX" target="_blank" rel="noopener noreferrer">
          <img src="/telegram-icon.svg" alt="Telegram" style={{ height: 28 }} />
        </a>
        <a href="https://x.com/FakeAirdropX" target="_blank" rel="noopener noreferrer">
          <img src="/x-icon.svg" alt="X" style={{ height: 24 }} />
        </a>
      </Flex>
    </Container>
  );
}

export default App;
