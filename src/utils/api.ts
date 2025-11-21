// API utility for backend communication

export interface BlogGenerationRequest {
  topic: string;
  category: string;
  niche: string;
  keywords: string;
  targetAudience: string;
  contentIntent: string;
  expertiseLevel: string;
  tone: string;
  length: string;
  writingStyle: string;
  additionalContext: string;
  useAiImages: boolean;
  numAiImages: number;
  usePexels: boolean;
  numPexelsImages: number;
}

export interface BlogGenerationResponse {
  success: boolean;
  title: string;
  content: string;
  wordCount: number;
  readingTime: string;
  images: string[];
  imageDescriptions: string[];
  seoScore?: string;
  error?: string;
}

export interface ExportRequest {
  title: string;
  content: string;
  format: 'pdf' | 'docx' | 'html';
  images?: string[];
  imageDescriptions?: string[];
  metaInfo?: {
    wordCount: string;
    readingTime: string;
    seoScore?: string;
  };
}

class APIClient {
  private baseUrl: string;
  private groqApiKey: string;
  private geminiApiKey: string;
  private pexelsApiKey: string;

  constructor() {
    // Load from localStorage or use default
    this.baseUrl = this.getStoredValue('api_base_url', 'https://blog-creation-backend-1.onrender.com');
    this.groqApiKey = this.getStoredValue('groq_api_key', '');
    this.geminiApiKey = this.getStoredValue('gemini_api_key', '');
    this.pexelsApiKey = this.getStoredValue('pexels_api_key', '');
  }

  private getStoredValue(key: string, defaultValue: string): string {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
    try {
      localStorage.setItem('api_base_url', url);
    } catch (e) {
      console.error('Failed to save base URL:', e);
    }
  }

  setGroqApiKey(key: string) {
    this.groqApiKey = key;
    try {
      localStorage.setItem('groq_api_key', key);
    } catch (e) {
      console.error('Failed to save Groq API key:', e);
    }
  }

  setGeminiApiKey(key: string) {
    this.geminiApiKey = key;
    try {
      localStorage.setItem('gemini_api_key', key);
    } catch (e) {
      console.error('Failed to save Gemini API key:', e);
    }
  }

  setPexelsApiKey(key: string) {
    this.pexelsApiKey = key;
    try {
      localStorage.setItem('pexels_api_key', key);
    } catch (e) {
      console.error('Failed to save Pexels API key:', e);
    }
  }

  getConfig() {
    return {
      baseUrl: this.baseUrl,
      groqApiKey: this.groqApiKey,
      geminiApiKey: this.geminiApiKey,
      pexelsApiKey: this.pexelsApiKey,
    };
  }

  async generateBlog(data: BlogGenerationRequest): Promise<BlogGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/blog/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Groq-API-Key': this.groqApiKey,
          'X-Gemini-API-Key': this.geminiApiKey,
          'X-Pexels-API-Key': this.pexelsApiKey,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Blog generation error:', error);
      throw error;
    }
  }

  async exportBlog(data: ExportRequest): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/api/blog/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Export failed! status: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return {
          success: false,
          message: `Connection failed: ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        message: data.message || 'Connected successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }
}

// Export singleton instance
export const apiClient = new APIClient();
