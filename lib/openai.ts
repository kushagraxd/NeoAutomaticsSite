import OpenAI from 'openai';

let client: OpenAI | null = null;

/**
 * Get singleton OpenAI client
 * Throws if OPENAI_API_KEY environment variable is missing
 */
export function getClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    
    client = new OpenAI({
      apiKey,
    });
  }
  
  return client;
}

/**
 * Moderate text content using OpenAI's moderation API
 * Throws error if content is flagged
 */
export async function moderate(text: string): Promise<void> {
  if (!text || text.trim().length === 0) {
    return;
  }

  try {
    const response = await getClient().moderations.create({
      input: text,
    });
    
    const result = response.results[0];
    if (result.flagged) {
      const categories = Object.entries(result.categories)
        .filter(([_, flagged]) => flagged)
        .map(([category]) => category);
      
      throw new Error(`Content flagged for: ${categories.join(', ')}`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Content flagged')) {
      throw error;
    }
    // Log moderation errors but don't block the request
    console.error('Moderation API error:', error);
  }
}

/**
 * Trim text to approximate token count by character limit
 * Rough estimate: 1 token ≈ 4 characters
 */
export function trimTokens(str: string, maxChars: number = 12000): string {
  if (str.length <= maxChars) {
    return str;
  }
  
  return str.substring(0, maxChars) + '...';
}

/**
 * Estimate token count from character length
 * Rough estimate: 1 token ≈ 4 characters
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}