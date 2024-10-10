/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  containsBytes,
  getU8Encoder,
  type Address,
  type ReadonlyUint8Array,
} from '@solana/web3.js';
import {
  type ParsedCreateInstruction,
  type ParsedIncrementInstruction,
} from '../instructions';
import { Key, getKeyEncoder } from '../types';

export const COUNTER_PROGRAM_ADDRESS =
  'CounterProgram111111111111111111111111111111' as Address<'CounterProgram111111111111111111111111111111'>;

export enum CounterAccount {
  Counter,
}

export function identifyCounterAccount(
  account: { data: ReadonlyUint8Array } | ReadonlyUint8Array
): CounterAccount {
  const data = 'data' in account ? account.data : account;
  if (containsBytes(data, getKeyEncoder().encode(Key.Counter), 0)) {
    return CounterAccount.Counter;
  }
  throw new Error(
    'The provided account could not be identified as a counter account.'
  );
}

export enum CounterInstruction {
  Create,
  Increment,
}

export function identifyCounterInstruction(
  instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array
): CounterInstruction {
  const data = 'data' in instruction ? instruction.data : instruction;
  if (containsBytes(data, getU8Encoder().encode(0), 0)) {
    return CounterInstruction.Create;
  }
  if (containsBytes(data, getU8Encoder().encode(1), 0)) {
    return CounterInstruction.Increment;
  }
  throw new Error(
    'The provided instruction could not be identified as a counter instruction.'
  );
}

export type ParsedCounterInstruction<
  TProgram extends string = 'CounterProgram111111111111111111111111111111',
> =
  | ({
      instructionType: CounterInstruction.Create;
    } & ParsedCreateInstruction<TProgram>)
  | ({
      instructionType: CounterInstruction.Increment;
    } & ParsedIncrementInstruction<TProgram>);
