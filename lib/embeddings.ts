import { getProducts } from './company';
import { getClient } from './openai';
import fs from 'fs/promises';
import path from 'path';
import MiniSearch from 'minisearch';

export interface ProductEmbedding {
  product: string;
  description: string;
  embedding: number[];
}

export interface EmbeddingCache {
  products: ProductEmbedding[];
  created: string;
  version: string;
}

const CACHE_FILE = '.cache/embeddings.json';

/**
 * Cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if (normA === 0 || normB === 0) return 0;
  
  return dotProduct / (normA * normB);
}

/**
 * Load embeddings from cache
 */
async function loadEmbeddingsCache(): Promise<EmbeddingCache | null> {
  try {
    const cacheData = await fs.readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(cacheData);
  } catch {
    return null;
  }
}

/**
 * Save embeddings to cache
 */
async function saveEmbeddingsCache(cache: EmbeddingCache): Promise<void> {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

/**
 * Generate embeddings for all products
 */
export async function generateEmbeddings(force: boolean = false): Promise<void> {
  // Check if cache exists and force is not set
  if (!force) {
    const existing = await loadEmbeddingsCache();
    if (existing) {
      console.log('Embeddings cache already exists. Use --force to regenerate.');
      return;
    }
  }

  const products = getProducts();
  const productEmbeddings: ProductEmbedding[] = [];

  console.log(`Generating embeddings for ${products.length} products...`);

  // Generate embeddings for each product
  for (const product of products) {
    try {
      const response = await getClient().embeddings.create({
        model: 'text-embedding-3-small',
        input: `${product} precision machined automotive component`,
      });

      productEmbeddings.push({
        product,
        description: `${product} precision machined automotive component`,
        embedding: response.data[0].embedding,
      });

      console.log(`✓ Generated embedding for: ${product}`);
    } catch (error) {
      console.error(`✗ Failed to generate embedding for ${product}:`, error);
    }
  }

  // Save to cache
  const cache: EmbeddingCache = {
    products: productEmbeddings,
    created: new Date().toISOString(),
    version: '1.0.0',
  };

  await saveEmbeddingsCache(cache);
  console.log(`✓ Saved ${productEmbeddings.length} embeddings to cache`);
}

/**
 * Find nearest products using semantic search
 */
export async function nearestProducts(query: string, k: number = 5): Promise<Array<{
  product: string;
  description: string;
  score: number;
}>> {
  // Try to load embeddings cache
  const cache = await loadEmbeddingsCache();
  
  if (!cache || !cache.products.length) {
    console.warn('No embeddings cache found, falling back to keyword search');
    return fallbackKeywordSearch(query, k);
  }

  try {
    // Generate embedding for query
    const response = await getClient().embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });

    const queryEmbedding = response.data[0].embedding;

    // Calculate similarities
    const similarities = cache.products.map(item => ({
      product: item.product,
      description: item.description,
      score: cosineSimilarity(queryEmbedding, item.embedding),
    }));

    // Sort by similarity and return top k
    return similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, k);

  } catch (error) {
    console.error('Semantic search failed, falling back to keyword search:', error);
    return fallbackKeywordSearch(query, k);
  }
}

/**
 * Fallback keyword search using MiniSearch
 */
function fallbackKeywordSearch(query: string, k: number = 5): Array<{
  product: string;
  description: string;
  score: number;
}> {
  const products = getProducts();
  
  // Create search index
  const miniSearch = new MiniSearch({
    fields: ['product', 'description'],
    storeFields: ['product', 'description'],
  });

  // Prepare documents
  const documents = products.map((product, index) => ({
    id: index,
    product,
    description: `${product} precision machined automotive component`,
  }));

  miniSearch.addAll(documents);

  // Search
  const results = miniSearch.search(query, {
    fuzzy: 0.2,
    prefix: true,
  });

  return results.slice(0, k).map(result => ({
    product: result.product as string,
    description: result.description as string,
    score: result.score,
  }));
}