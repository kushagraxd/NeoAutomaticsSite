#!/usr/bin/env ts-node

import { generateEmbeddings } from '../lib/embeddings';

/**
 * Build embeddings script
 * Usage: npm run embeddings:build [--force]
 */
async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');

  try {
    console.log('Building product embeddings...');
    await generateEmbeddings(force);
    console.log('✓ Embeddings build completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Failed to build embeddings:', error);
    process.exit(1);
  }
}

main();