/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Address } from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  mapEncoder,
} from '@solana/codecs-core';
import {
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import {
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
} from '@solana/codecs-numbers';
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlySignerAccount,
  WritableAccount,
} from '@solana/instructions';
import {
  Option,
  OptionOrNullable,
  getOptionDecoder,
  getOptionEncoder,
  none,
} from '@solana/options';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import { findCounterPda } from '../pdas';
import {
  ResolvedAccount,
  accountMetaWithDefault,
  expectAddress,
  getAccountMetasWithSigners,
} from '../shared';

export type IncrementInstruction<
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1',
  TAccountCounter extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountCounter extends string
        ? WritableAccount<TAccountCounter>
        : TAccountCounter,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts
    ]
  >;

export type IncrementInstructionWithSigners<
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1',
  TAccountCounter extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountCounter extends string
        ? WritableAccount<TAccountCounter>
        : TAccountCounter,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts
    ]
  >;

export type IncrementInstructionData = {
  discriminator: number;
  amount: Option<number>;
};

export type IncrementInstructionDataArgs = {
  amount?: OptionOrNullable<number>;
};

export function getIncrementInstructionDataEncoder(): Encoder<IncrementInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['amount', getOptionEncoder(getU32Encoder())],
    ]),
    (value) => ({ ...value, discriminator: 1, amount: value.amount ?? none() })
  );
}

export function getIncrementInstructionDataDecoder(): Decoder<IncrementInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['amount', getOptionDecoder(getU32Decoder())],
  ]);
}

export function getIncrementInstructionDataCodec(): Codec<
  IncrementInstructionDataArgs,
  IncrementInstructionData
> {
  return combineCodec(
    getIncrementInstructionDataEncoder(),
    getIncrementInstructionDataDecoder()
  );
}

export type IncrementAsyncInput<
  TAccountCounter extends string,
  TAccountAuthority extends string
> = {
  /** The program derived address of the counter account to increment (seeds: ['counter', authority]) */
  counter?: Address<TAccountCounter>;
  /** The authority of the counter */
  authority: Address<TAccountAuthority>;
  amount?: IncrementInstructionDataArgs['amount'];
};

export type IncrementAsyncInputWithSigners<
  TAccountCounter extends string,
  TAccountAuthority extends string
> = {
  /** The program derived address of the counter account to increment (seeds: ['counter', authority]) */
  counter?: Address<TAccountCounter>;
  /** The authority of the counter */
  authority: TransactionSigner<TAccountAuthority>;
  amount?: IncrementInstructionDataArgs['amount'];
};

export async function getIncrementInstructionAsync<
  TAccountCounter extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1'
>(
  input: IncrementAsyncInputWithSigners<TAccountCounter, TAccountAuthority>
): Promise<
  IncrementInstructionWithSigners<TProgram, TAccountCounter, TAccountAuthority>
>;
export async function getIncrementInstructionAsync<
  TAccountCounter extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1'
>(
  input: IncrementAsyncInput<TAccountCounter, TAccountAuthority>
): Promise<IncrementInstruction<TProgram, TAccountCounter, TAccountAuthority>>;
export async function getIncrementInstructionAsync<
  TAccountCounter extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1'
>(
  input: IncrementAsyncInput<TAccountCounter, TAccountAuthority>
): Promise<IInstruction> {
  // Program address.
  const programAddress =
    'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1' as Address<'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getIncrementInstructionRaw<
      TProgram,
      TAccountCounter,
      TAccountAuthority
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    counter: { value: input.counter ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
  };

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.counter.value) {
    accounts.counter.value = await findCounterPda({
      authority: expectAddress(accounts.authority.value),
    });
  }

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getIncrementInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    args as IncrementInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export type IncrementInput<
  TAccountCounter extends string,
  TAccountAuthority extends string
> = {
  /** The program derived address of the counter account to increment (seeds: ['counter', authority]) */
  counter: Address<TAccountCounter>;
  /** The authority of the counter */
  authority: Address<TAccountAuthority>;
  amount?: IncrementInstructionDataArgs['amount'];
};

export type IncrementInputWithSigners<
  TAccountCounter extends string,
  TAccountAuthority extends string
> = {
  /** The program derived address of the counter account to increment (seeds: ['counter', authority]) */
  counter: Address<TAccountCounter>;
  /** The authority of the counter */
  authority: TransactionSigner<TAccountAuthority>;
  amount?: IncrementInstructionDataArgs['amount'];
};

export function getIncrementInstruction<
  TAccountCounter extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1'
>(
  input: IncrementInputWithSigners<TAccountCounter, TAccountAuthority>
): IncrementInstructionWithSigners<
  TProgram,
  TAccountCounter,
  TAccountAuthority
>;
export function getIncrementInstruction<
  TAccountCounter extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1'
>(
  input: IncrementInput<TAccountCounter, TAccountAuthority>
): IncrementInstruction<TProgram, TAccountCounter, TAccountAuthority>;
export function getIncrementInstruction<
  TAccountCounter extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1'
>(input: IncrementInput<TAccountCounter, TAccountAuthority>): IInstruction {
  // Program address.
  const programAddress =
    'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1' as Address<'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getIncrementInstructionRaw<
      TProgram,
      TAccountCounter,
      TAccountAuthority
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    counter: { value: input.counter ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
  };

  // Original args.
  const args = { ...input };

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getIncrementInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    args as IncrementInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export function getIncrementInstructionRaw<
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1',
  TAccountCounter extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    counter: TAccountCounter extends string
      ? Address<TAccountCounter>
      : TAccountCounter;
    authority: TAccountAuthority extends string
      ? Address<TAccountAuthority>
      : TAccountAuthority;
  },
  args: IncrementInstructionDataArgs,
  programAddress: Address<TProgram> = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.counter, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.authority, AccountRole.READONLY_SIGNER),
      ...(remainingAccounts ?? []),
    ],
    data: getIncrementInstructionDataEncoder().encode(args),
    programAddress,
  } as IncrementInstruction<
    TProgram,
    TAccountCounter,
    TAccountAuthority,
    TRemainingAccounts
  >;
}

export type ParsedIncrementInstruction<
  TProgram extends string = 'DedZsfsH9NkuANu83KcjcLzmpyREUY9ZLoXa4ea1NwM1',
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The program derived address of the counter account to increment (seeds: ['counter', authority]) */
    counter: TAccountMetas[0];
    /** The authority of the counter */
    authority: TAccountMetas[1];
  };
  data: IncrementInstructionData;
};

export function parseIncrementInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[]
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedIncrementInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      counter: getNextAccount(),
      authority: getNextAccount(),
    },
    data: getIncrementInstructionDataDecoder().decode(instruction.data),
  };
}
