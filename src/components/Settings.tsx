import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Save, Server, AlertCircle, Key } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';
import { apiClient } from '../utils/api';

export function Settings() {
  const config = apiClient.getConfig();
  
  const [settings, setSettings] = useState({
    backendUrl: config.baseUrl,
    defaultTone: 'professional',
    defaultLength: 'medium',
    defaultNumImages: 3,
    imageWidth: 1024,
    imageHeight: 768,
    autoPublish: false,
    includePdfImages: true,
    includeDocxImages: true,
    maxAgents: 25,
    timeout: 120,
  });

  const [testingConnection, setTestingConnection] = useState(false);

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      apiClient.setBaseUrl(settings.backendUrl);
      const result = await apiClient.testConnection();
      
      if (result.success) {
        toast.success('✅ Backend connection successful!');
      } else {
        toast.error(`❌ Connection failed: ${result.message}`);
      }
    } catch (error) {
      toast.error('❌ Unable to connect to backend');
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to API client
    apiClient.setBaseUrl(settings.backendUrl);
    
    toast.success('✅ Settings saved successfully!');
  };

  return (
    <div>
      <Toaster />
      
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Settings</h2>
        <p className="text-gray-600 mt-1">Configure your blog creation system</p>
      </motion.div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Backend Configuration */}
          <motion.div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Server className="w-5 h-5 text-blue-600" />
              <h3>Backend Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="backend-url">Backend API Base URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="backend-url"
                    type="url"
                    placeholder="http://localhost:8000"
                    value={settings.backendUrl}
                    onChange={(e) => setSettings({ ...settings, backendUrl: e.target.value })}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={testingConnection}
                  >
                    {testingConnection ? 'Testing...' : 'Test'}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter your Python backend URL (e.g., http://localhost:8000 or https://your-api.com)
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="mb-2">
                      <strong>Backend Setup:</strong> Your Python backend should expose the following endpoints:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs ml-2">
                      <li><code>GET /api/health</code> - Health check</li>
                      <li><code>POST /api/blog/generate</code> - Generate blog content</li>
                      <li><code>POST /api/blog/export</code> - Export to PDF/DOCX/HTML</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* API Keys Info Section */}
          <motion.div 
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-start gap-3">
              <Key className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-green-900 mb-3">🔐 API Keys Configuration</h3>
                <div className="text-sm text-green-800 space-y-3">
                  <p>
                    <strong>API keys are now managed in your backend .env file!</strong> This is more secure and easier to manage.
                  </p>
                  <div className="bg-white/50 rounded-lg p-4 mt-3">
                    <p className="mb-2"><strong>To configure API keys:</strong></p>
                    <ol className="list-decimal list-inside space-y-2 text-xs ml-2">
                      <li>Create <code className="bg-green-100 px-2 py-0.5 rounded">/backend/.env</code> file</li>
                      <li>Add your API keys:
                        <pre className="bg-white rounded p-2 mt-2 text-xs overflow-x-auto">
{`GROQ_API_KEY=your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here
PEXELS_API_KEY=your_pexels_key_here`}
                        </pre>
                      </li>
                      <li>Restart backend: <code className="bg-green-100 px-2 py-0.5 rounded">python main.py</code></li>
                      <li>That's it! No need to enter keys here anymore 🎉</li>
                    </ol>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 mt-3">
                    <p className="text-xs">
                      <strong>Get your FREE API keys:</strong>
                    </p>
                    <ul className="text-xs space-y-1 mt-2">
                      <li>• <strong>Groq:</strong> <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">console.groq.com</a></li>
                      <li>• <strong>Gemini:</strong> <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">aistudio.google.com</a></li>
                      <li>• <strong>Pexels:</strong> <a href="https://www.pexels.com/api/" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">pexels.com/api</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-6">Default Blog Settings</h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="tone">Default Tone</Label>
                <Select value={settings.defaultTone} onValueChange={(value) => setSettings({ ...settings, defaultTone: value })}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="length">Default Length</Label>
                <Select value={settings.defaultLength} onValueChange={(value) => setSettings({ ...settings, defaultLength: value })}>
                  <SelectTrigger id="length">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ x: 4 }}
              >
                <Checkbox
                  id="auto-publish"
                  checked={settings.autoPublish}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoPublish: checked as boolean })}
                />
                <Label htmlFor="auto-publish" className="cursor-pointer">
                  Auto-publish approved blogs
                </Label>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h3 className="mb-6">Image Generation Settings</h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Default Number of AI Images</Label>
                  <motion.span 
                    className="text-sm text-gray-600"
                    key={settings.defaultNumImages}
                    initial={{ scale: 1.5, color: '#3b82f6' }}
                    animate={{ scale: 1, color: '#4b5563' }}
                  >
                    {settings.defaultNumImages}
                  </motion.span>
                </div>
                <Slider
                  value={[settings.defaultNumImages]}
                  onValueChange={([value]) => setSettings({ ...settings, defaultNumImages: value })}
                  min={1}
                  max={5}
                  step={1}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Image Width (pixels)</Label>
                  <motion.span 
                    className="text-sm text-gray-600"
                    key={settings.imageWidth}
                    initial={{ scale: 1.5, color: '#3b82f6' }}
                    animate={{ scale: 1, color: '#4b5563' }}
                  >
                    {settings.imageWidth}px
                  </motion.span>
                </div>
                <Slider
                  value={[settings.imageWidth]}
                  onValueChange={([value]) => setSettings({ ...settings, imageWidth: value })}
                  min={512}
                  max={1920}
                  step={128}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Image Height (pixels)</Label>
                  <motion.span 
                    className="text-sm text-gray-600"
                    key={settings.imageHeight}
                    initial={{ scale: 1.5, color: '#3b82f6' }}
                    animate={{ scale: 1, color: '#4b5563' }}
                  >
                    {settings.imageHeight}px
                  </motion.span>
                </div>
                <Slider
                  value={[settings.imageHeight]}
                  onValueChange={([value]) => setSettings({ ...settings, imageHeight: value })}
                  min={512}
                  max={1920}
                  step={128}
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-6">Export Settings</h3>

            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ x: 4 }}
              >
                <Checkbox
                  id="pdf-images"
                  checked={settings.includePdfImages}
                  onCheckedChange={(checked) => setSettings({ ...settings, includePdfImages: checked as boolean })}
                />
                <Label htmlFor="pdf-images" className="cursor-pointer">
                  Include images in PDF
                </Label>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ x: 4 }}
              >
                <Checkbox
                  id="docx-images"
                  checked={settings.includeDocxImages}
                  onCheckedChange={(checked) => setSettings({ ...settings, includeDocxImages: checked as boolean })}
                />
                <Label htmlFor="docx-images" className="cursor-pointer">
                  Include images in DOCX
                </Label>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h3 className="mb-6">Agent Configuration</h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Max Concurrent Agents</Label>
                  <motion.span 
                    className="text-sm text-gray-600"
                    key={settings.maxAgents}
                    initial={{ scale: 1.5, color: '#3b82f6' }}
                    animate={{ scale: 1, color: '#4b5563' }}
                  >
                    {settings.maxAgents}
                  </motion.span>
                </div>
                <Slider
                  value={[settings.maxAgents]}
                  onValueChange={([value]) => setSettings({ ...settings, maxAgents: value })}
                  min={5}
                  max={50}
                  step={5}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Controls how many AI agents can run simultaneously
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Agent Timeout (seconds)</Label>
                  <motion.span 
                    className="text-sm text-gray-600"
                    key={settings.timeout}
                    initial={{ scale: 1.5, color: '#3b82f6' }}
                    animate={{ scale: 1, color: '#4b5563' }}
                  >
                    {settings.timeout}s
                  </motion.span>
                </div>
                <Slider
                  value={[settings.timeout]}
                  onValueChange={([value]) => setSettings({ ...settings, timeout: value })}
                  min={30}
                  max={300}
                  step={30}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Maximum time an agent can run before timing out
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button type="submit" className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}