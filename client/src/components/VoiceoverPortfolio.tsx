import { useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import AudioPlayer from './AudioPlayer';
import { 
  AnimationIcon, 
  CharacterReelIcon, 
  TVIcon, 
  CommercialIcon, 
  DocumentaryIcon, 
  FullReelIcon 
} from './icons/VoiceoverIcons';
import { useInView } from '../lib/hooks';

// Sample audio data (using placeholder URLs)
const audioSamples = [
  {
    category: "animation",
    title: "Adventure Series Character",
    url: "https://example.com/audio-sample-placeholder-1.mp3",
    description: "An energetic, youthful character for an animated adventure series."
  },
  {
    category: "animation",
    title: "Educational Animation Narrator",
    url: "https://example.com/audio-sample-placeholder-2.mp3",
    description: "Clear, engaging narration for educational content."
  },
  {
    category: "character",
    title: "Fantasy Game Character",
    url: "https://example.com/audio-sample-placeholder-3.mp3",
    description: "Deep, authoritative voice for a fantasy game villain."
  },
  {
    category: "character",
    title: "Children's Book Character",
    url: "https://example.com/audio-sample-placeholder-4.mp3",
    description: "Warm, friendly character for a children's audiobook."
  },
  {
    category: "tv",
    title: "Documentary Segment",
    url: "https://example.com/audio-sample-placeholder-5.mp3",
    description: "Professional narration for a television documentary."
  },
  {
    category: "tv",
    title: "TV Promo",
    url: "https://example.com/audio-sample-placeholder-6.mp3",
    description: "Exciting promotional announcement for television series."
  },
  {
    category: "commercial",
    title: "Luxury Brand Commercial",
    url: "https://example.com/audio-sample-placeholder-7.mp3",
    description: "Sophisticated, smooth delivery for luxury product advertisement."
  },
  {
    category: "commercial",
    title: "Energetic Product Launch",
    url: "https://example.com/audio-sample-placeholder-8.mp3",
    description: "High-energy announcement for a new product launch."
  },
  {
    category: "documentary",
    title: "Historical Documentary",
    url: "https://example.com/audio-sample-placeholder-9.mp3",
    description: "Informative narration for a historical documentary piece."
  },
  {
    category: "documentary",
    title: "Nature Documentary",
    url: "https://example.com/audio-sample-placeholder-10.mp3",
    description: "Calming voice for a nature documentary segment."
  }
];

export default function VoiceoverPortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredSamples = activeTab === "all" 
    ? audioSamples 
    : audioSamples.filter(sample => sample.category === activeTab);
  
  return (
    <section 
      id="portfolio"
      ref={sectionRef}
      className="py-20 bg-background"
    >
      <div className="container px-4 mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Voiceover <span className="text-primary">Portfolio</span>
        </h2>
        
        <p className={`text-center text-muted-foreground max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Listen to samples of my voiceover work across different categories. Each sample demonstrates my versatility and ability to embody different characters and tones.
        </p>
        
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className={`w-full max-w-4xl mx-auto transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="all" className="flex flex-col items-center gap-2 py-3">
              <FullReelIcon className="h-5 w-5" />
              <span className="text-xs">All</span>
            </TabsTrigger>
            <TabsTrigger value="animation" className="flex flex-col items-center gap-2 py-3">
              <AnimationIcon className="h-5 w-5" />
              <span className="text-xs">Animation</span>
            </TabsTrigger>
            <TabsTrigger value="character" className="flex flex-col items-center gap-2 py-3">
              <CharacterReelIcon className="h-5 w-5" />
              <span className="text-xs">Character</span>
            </TabsTrigger>
            <TabsTrigger value="tv" className="flex flex-col items-center gap-2 py-3">
              <TVIcon className="h-5 w-5" />
              <span className="text-xs">TV</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex flex-col items-center gap-2 py-3">
              <CommercialIcon className="h-5 w-5" />
              <span className="text-xs">Commercial</span>
            </TabsTrigger>
            <TabsTrigger value="documentary" className="flex flex-col items-center gap-2 py-3">
              <DocumentaryIcon className="h-5 w-5" />
              <span className="text-xs">Documentary</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSamples.map((sample, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{sample.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{sample.description}</p>
                    <AudioPlayer title={sample.title} audioUrl={sample.url} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-muted-foreground">
            Want to hear more or discuss a potential project? <a href="#contact" className="text-primary underline hover:no-underline">Get in touch!</a>
          </p>
        </div>
      </div>
    </section>
  );
}
