/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  ProgramDerivedAddress,
  getAddressEncoder,
  getProgramDerivedAddress,
} from '@solana/addresses';
import { getStringEncoder } from '@solana/codecs-strings';

export type CounterSeeds = {
  /** The authority of the counter account */
  authority: Address;
};

export async function findCounterPda(
  seeds: CounterSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'A8zRQrpEmXSGiSjgcTyKfGirQDJ429RPfS4Hrqc1pavB' as Address<'A8zRQrpEmXSGiSjgcTyKfGirQDJ429RPfS4Hrqc1pavB'>,
  } = config;
  return getProgramDerivedAddress({
    programAddress,
    seeds: [
      getStringEncoder({ size: 'variable' }).encode('counter'),
      getAddressEncoder().encode(seeds.authority),
    ],
  });
}
