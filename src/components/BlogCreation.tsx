import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Rocket, Sparkles, FileDown, FileText, Globe, AlertCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';
import { apiClient } from '../utils/api';

export function BlogCreation() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    topic: '',
    category: 'Technology',
    niche: '',
    keywords: '',
    targetAudience: 'General Public',
    contentIntent: 'Informational',
    expertiseLevel: 'Intermediate',
    tone: 'Professional',
    length: 'Long (3500-4000 words)',
    writingStyle: 'How-to Guide',
    additionalContext: '',
    useAiImages: true,
    numAiImages: 3,
    usePexels: false,
    numPexelsImages: 2,
  });

  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    wordCount: 0,
    readingTime: '',
    images: [] as string[],
    imageDescriptions: [] as string[],
    seoScore: 'N/A',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setProgress(0);
    setShowPreview(false);
    setError(null);

    const phases = [
      'Ideation',
      'Research',
      'Content Generation',
      'Image Creation',
      'SEO Optimization',
      'Export Preparation',
    ];

    try {
      // Simulate progress through phases
      let currentPhaseIndex = 0;
      const progressInterval = setInterval(() => {
        if (currentPhaseIndex < phases.length) {
          setCurrentPhase(phases[currentPhaseIndex]);
          setProgress(((currentPhaseIndex + 1) / phases.length) * 100);
          currentPhaseIndex++;
        }
      }, 800);

      // Call backend API
      const response = await apiClient.generateBlog({
        topic: formData.topic,
        category: formData.category,
        niche: formData.niche,
        keywords: formData.keywords,
        targetAudience: formData.targetAudience,
        contentIntent: formData.contentIntent,
        expertiseLevel: formData.expertiseLevel,
        tone: formData.tone,
        length: formData.length,
        writingStyle: formData.writingStyle,
        additionalContext: formData.additionalContext,
        useAiImages: formData.useAiImages,
        numAiImages: formData.numAiImages,
        usePexels: formData.usePexels,
        numPexelsImages: formData.numPexelsImages,
      });

      clearInterval(progressInterval);
      
      if (response.success) {
        setBlogData({
          title: response.title,
          content: response.content,
          wordCount: response.wordCount,
          readingTime: response.readingTime,
          images: response.images,
          imageDescriptions: response.imageDescriptions,
          seoScore: response.seoScore || 'N/A',
        });
        
        setProgress(100);
        setShowPreview(true);
        toast.success('🎉 Blog created successfully!');
      } else {
        throw new Error(response.error || 'Failed to generate blog');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate blog';
      setError(errorMessage);
      toast.error(`❌ Error: ${errorMessage}`);
      console.error('Blog generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format: 'pdf' | 'docx' | 'html') => {
    try {
      toast.info(`⏳ Generating ${format.toUpperCase()}...`);
      
      const blob = await apiClient.exportBlog({
        title: blogData.title,
        content: blogData.content,
        format,
        images: blogData.images,
        imageDescriptions: blogData.imageDescriptions,
        metaInfo: {
          wordCount: blogData.wordCount.toString(),
          readingTime: blogData.readingTime,
          seoScore: blogData.seoScore,
        },
      });

      // Download file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${blogData.title.replace(/[^a-z0-9]/gi, '_')}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success(`✅ ${format.toUpperCase()} downloaded successfully!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Download failed';
      toast.error(`❌ ${errorMessage}`);
      console.error('Download error:', err);
    }
  };

  return (
    <div>
      <Toaster />
      
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Create New Blog</h2>
        <p className="text-gray-600 mt-1">Configure your blog with comprehensive options</p>
      </motion.div>

      {/* Error Alert */}
      {error && (
        <motion.div
          className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-900">Generation Failed</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <p className="text-xs text-red-600 mt-2">
                Make sure your backend is running and API keys are configured in Settings.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.form 
            onSubmit={handleSubmit} 
            className="bg-white rounded-lg border border-gray-200 p-6 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Core Topic Information */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4">🎯 Core Topic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="topic">Blog Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Artificial Intelligence in Healthcare"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Politics">Politics</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="niche">Specific Niche</Label>
                  <Input
                    id="niche"
                    placeholder="e.g., AI diagnostics, Telemedicine"
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Primary Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., AI healthcare, medical diagnosis"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>

            {/* Audience & Content Intent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mb-4">🎯 Audience & Content Intent</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={formData.targetAudience} onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}>
                    <SelectTrigger id="audience">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Public">General Public</SelectItem>
                      <SelectItem value="Industry Professionals">Industry Professionals</SelectItem>
                      <SelectItem value="Business Leaders">Business Leaders</SelectItem>
                      <SelectItem value="Technical Experts">Technical Experts</SelectItem>
                      <SelectItem value="Students">Students</SelectItem>
                      <SelectItem value="Researchers">Researchers</SelectItem>
                      <SelectItem value="Entrepreneurs">Entrepreneurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="intent">Content Intent</Label>
                  <Select value={formData.contentIntent} onValueChange={(value) => setFormData({ ...formData, contentIntent: value })}>
                    <SelectTrigger id="intent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Informational">Informational</SelectItem>
                      <SelectItem value="Educational">Educational</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Transactional">Transactional</SelectItem>
                      <SelectItem value="Problem-Solving">Problem-Solving</SelectItem>
                      <SelectItem value="Thought Leadership">Thought Leadership</SelectItem>
                      <SelectItem value="News & Updates">News & Updates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expertise">Expertise Level</Label>
                  <Select value={formData.expertiseLevel} onValueChange={(value) => setFormData({ ...formData, expertiseLevel: value })}>
                    <SelectTrigger id="expertise">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Writing Style & Format */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="mb-4">🎨 Writing Style & Format</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                    <SelectTrigger id="tone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Conversational">Conversational</SelectItem>
                      <SelectItem value="Authoritative">Authoritative</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Inspirational">Inspirational</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Persuasive">Persuasive</SelectItem>
                      <SelectItem value="Humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="length">Desired Length</Label>
                  <Select value={formData.length} onValueChange={(value) => setFormData({ ...formData, length: value })}>
                    <SelectTrigger id="length">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Short (800-1000 words)">Short (800-1000 words)</SelectItem>
                      <SelectItem value="Medium (2000-2500 words)">Medium (2000-2500 words)</SelectItem>
                      <SelectItem value="Long (3500-4000 words)">Long (3500-4000 words)</SelectItem>
                      <SelectItem value="Comprehensive (5000-6000 words)">Comprehensive (5000-6000 words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="style">Writing Style</Label>
                  <Select value={formData.writingStyle} onValueChange={(value) => setFormData({ ...formData, writingStyle: value })}>
                    <SelectTrigger id="style">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="How-to Guide">How-to Guide</SelectItem>
                      <SelectItem value="Listicle">Listicle</SelectItem>
                      <SelectItem value="Case Study">Case Study</SelectItem>
                      <SelectItem value="Opinion Piece">Opinion Piece</SelectItem>
                      <SelectItem value="News Article">News Article</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Comparison">Comparison</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Image Generation Options */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="mb-4">🖼️ Image Generation Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ai-images"
                      checked={formData.useAiImages}
                      onCheckedChange={(checked) => setFormData({ ...formData, useAiImages: checked as boolean })}
                    />
                    <Label htmlFor="ai-images" className="cursor-pointer">Generate AI Images (Gemini)</Label>
                  </div>

                  {formData.useAiImages && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Number of AI Images</Label>
                        <span className="text-sm text-gray-600">{formData.numAiImages}</span>
                      </div>
                      <Slider
                        value={[formData.numAiImages]}
                        onValueChange={([value]) => setFormData({ ...formData, numAiImages: value })}
                        min={1}
                        max={5}
                        step={1}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pexels"
                      checked={formData.usePexels}
                      onCheckedChange={(checked) => setFormData({ ...formData, usePexels: checked as boolean })}
                    />
                    <Label htmlFor="pexels" className="cursor-pointer">Also fetch from Pexels</Label>
                  </div>

                  {formData.usePexels && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Number of Pexels Images</Label>
                        <span className="text-sm text-gray-600">{formData.numPexelsImages}</span>
                      </div>
                      <Slider
                        value={[formData.numPexelsImages]}
                        onValueChange={([value]) => setFormData({ ...formData, numPexelsImages: value })}
                        min={1}
                        max={5}
                        step={1}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Additional Context */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="mb-4">💡 Additional Context & Instructions</h3>
              
              <Textarea
                placeholder="Provide any additional context, requirements, or specific points to cover..."
                value={formData.additionalContext}
                onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                rows={4}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" className="w-full" disabled={isGenerating}>
                <Rocket className="w-4 h-4 mr-2" />
                {isGenerating ? 'Creating Blog...' : '🚀 Create Blog with AI'}
              </Button>
            </motion.div>
          </motion.form>

          {/* Preview Section */}
          <AnimatePresence>
            {showPreview && (
              <motion.div 
                className="mt-6 space-y-6"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
              >
                {/* Success Message */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <motion.div 
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </motion.div>
                    <h3 className="text-green-600">✅ Blog Created Successfully!</h3>
                  </motion.div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <motion.div
                      className="p-4 bg-blue-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-sm text-gray-600">Word Count</div>
                      <div className="text-xl">{blogData.wordCount}</div>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-green-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-sm text-gray-600">Reading Time</div>
                      <div className="text-xl">{blogData.readingTime}</div>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-purple-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-sm text-gray-600">SEO Score</div>
                      <div className="text-xl">{blogData.seoScore}</div>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-orange-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="text-sm text-gray-600">Images</div>
                      <div className="text-xl">{blogData.images.length}</div>
                    </motion.div>
                  </div>

                  {/* Images */}
                  {blogData.images.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mb-6"
                    >
                      <h4 className="mb-3">🖼️ Generated Images</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {blogData.images.map((img, idx) => (
                          <motion.div 
                            key={idx}
                            className="rounded-lg overflow-hidden border border-gray-200"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img src={img} alt={blogData.imageDescriptions[idx]} className="w-full h-40 object-cover" />
                            <div className="p-2 bg-gray-50">
                              <p className="text-xs text-gray-600 text-center">
                                Figure {idx + 1}: {blogData.imageDescriptions[idx]}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Content Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h4 className="mb-3">📝 Content Preview</h4>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm">{blogData.content}</pre>
                    </div>
                  </motion.div>

                  {/* Export Options */}
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <h4 className="mb-3">💾 Export Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleDownload('pdf')}
                        >
                          <FileDown className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleDownload('docx')}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Download DOCX
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleDownload('html')}
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Download HTML
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <AnimatePresence>
            {isGenerating && (
              <motion.div 
                className="bg-white rounded-lg border border-gray-200 p-6"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
              >
                <h3 className="mb-4">Generation Progress</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <motion.span 
                        className="text-sm"
                        key={Math.round(progress)}
                        initial={{ scale: 1.5, color: '#3b82f6' }}
                        animate={{ scale: 1, color: '#000' }}
                      >
                        {Math.round(progress)}%
                      </motion.span>
                    </div>
                    <Progress value={progress} />
                  </div>

                  {currentPhase && (
                    <motion.div 
                      className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={currentPhase}
                    >
                      <p className="text-sm text-blue-900">
                        Executing: <span>{currentPhase}</span>
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-3">How It Works</h3>
            
            <div className="space-y-3 text-sm">
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ x: 4 }}
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">1</div>
                <p className="text-gray-700">Configure your blog settings and preferences</p>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ x: 4 }}
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">2</div>
                <p className="text-gray-700">AI agents work through specialized phases</p>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ x: 4 }}
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">3</div>
                <p className="text-gray-700">Review and download your optimized blog</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}