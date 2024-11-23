import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { TrackerJetton } from '../wrappers/TrackerJetton';
import '@ton/test-utils';

describe('TrackerJetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let starQJetton: SandboxContract<TrackerJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        starQJetton = blockchain.openContract(await TrackerJetton.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await starQJetton.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: starQJetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and starQJetton are ready to use
    });
});