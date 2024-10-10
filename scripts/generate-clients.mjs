#!/usr/bin/env zx
import 'zx/globals';
import * as c from 'codama';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderVisitor as renderJavaScriptVisitor } from '@codama/renderers-js';
import { renderVisitor as renderRustVisitor } from '@codama/renderers-rust';
import { getAllProgramIdls } from './utils.mjs';

// Instanciate Codama.
const [idl, ...additionalIdls] = getAllProgramIdls().map((idl) =>
  rootNodeFromAnchor(require(idl))
);
const codama = c.createFromRoot(idl, additionalIdls);

// Update programs.
codama.update(
  c.updateProgramsVisitor({
    solanaProgramCounter: { name: 'counter' },
  })
);

// Update accounts.
codama.update(
  c.updateAccountsVisitor({
    counter: {
      seeds: [
        c.constantPdaSeedNodeFromString('utf8', 'counter'),
        c.variablePdaSeedNode(
          'authority',
          c.publicKeyTypeNode(),
          'The authority of the counter account'
        ),
      ],
    },
  })
);

// Update instructions.
codama.update(
  c.updateInstructionsVisitor({
    create: {
      byteDeltas: [c.instructionByteDeltaNode(c.accountLinkNode('counter'))],
      accounts: {
        counter: { defaultValue: c.pdaValueNode('counter') },
        payer: { defaultValue: c.accountValueNode('authority') },
      },
    },
    increment: {
      accounts: {
        counter: { defaultValue: c.pdaValueNode('counter') },
      },
      arguments: {
        amount: { defaultValue: c.noneValueNode() },
      },
    },
  })
);

// Set account discriminators.
const key = (name) => ({ field: 'key', value: c.enumValueNode('Key', name) });
codama.update(
  c.setAccountDiscriminatorFromFieldVisitor({
    counter: key('counter'),
  })
);

// Render JavaScript.
const jsClient = path.join(__dirname, '..', 'clients', 'js');
codama.accept(
  renderJavaScriptVisitor(path.join(jsClient, 'src', 'generated'), {
    prettierOptions: require(path.join(jsClient, '.prettierrc.json')),
  })
);

// Render Rust.
const rustClient = path.join(__dirname, '..', 'clients', 'rust');
codama.accept(
  renderRustVisitor(path.join(rustClient, 'src', 'generated'), {
    formatCode: true,
    crateFolder: rustClient,
  })
);
