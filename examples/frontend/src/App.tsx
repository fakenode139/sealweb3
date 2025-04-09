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
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container size="3" px="4" py="4">
        {/* Header */}
        <Flex justify="between" align="center" mb="6">
          <Flex align="center" gap="4">
            <img
              src="/FakeAirdropX.png"
              alt="FakeAirdropX Logo"
              style={{ width: 120 }}
            />
            <Text size="6" weight="bold" color="gray">
              SealSui Testnet By FakeAirdropX
            </Text>
          </Flex>
          <Box>
            <ConnectButton />
          </Box>
        </Flex>

        {/* Info Box */}
        <Card style={{ backgroundColor: '#111', marginBottom: '2rem', color: '#fff' }}>
          <p>
            1. Code is available{' '}
            <a href="https://github.com/MystenLabs/seal/tree/main/examples" target="_blank" rel="noreferrer">
              here
            </a>.
          </p>
          <p>
            2. These examples are for Testnet only. Make sure your wallet is set to Testnet and has
            some balance (request from <a href="https://faucet.sui.io/" target="_blank" rel="noreferrer">faucet.sui.io</a>).
          </p>
          <p>
            3. Files are only stored on Walrus Testnet for 1 epoch. Older files may be unrecoverable.
          </p>
          <p>
            4. Currently only image files are supported. UI is minimal for demo purposes.
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
          <>
            <Text align="center" mt="6">
              Please connect your Sui wallet to continue
            </Text>
          </>
        )}

        {/* Footer - Social Links */}
        <Flex justify="center" gap="4" mt="8">
          <a href="https://t.me/FakeAirdropX" target="_blank" rel="noopener noreferrer">
            <img src="/telegram-icon.svg" alt="Telegram" width={40} />
          </a>
          <a href="https://x.com/FakeAirdropX" target="_blank" rel="noopener noreferrer">
            <img src="/x-icon.svg" alt="X" width={40} />
          </a>
        </Flex>
      </Container>
    </div>
  );
}

export default App;
