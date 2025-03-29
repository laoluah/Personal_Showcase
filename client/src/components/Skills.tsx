import { useRef } from 'react';
import { 
  Code, 
  Layout, 
  Layers, 
  Mic, 
  Edit3,
  Zap,
  Server
} from 'lucide-react';
import { useInView } from '../lib/hooks';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-muted/30"
    >
      <div className="container px-4 mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          My <span className="text-primary">Skills</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <SkillCard 
            icon={<Layout className="h-10 w-10 text-primary" />}
            title="HTML"
            isVisible={isInView}
            delay={0}
          >
            Semantic markup, accessibility, and responsive layouts that 
            provide a solid foundation for any web project.
          </SkillCard>
          
          <SkillCard 
            icon={<Layers className="h-10 w-10 text-primary" />}
            title="CSS"
            isVisible={isInView}
            delay={150}
          >
            Modern styling with CSS Grid, Flexbox, animations, and 
            transitions to create engaging user interfaces.
          </SkillCard>
          
          <SkillCard 
            icon={<Code className="h-10 w-10 text-primary" />}
            title="JavaScript"
            isVisible={isInView}
            delay={300}
          >
            Vanilla JavaScript for interactivity, DOM manipulation, and
            creating dynamic user experiences without dependencies.
          </SkillCard>
          
          <SkillCard 
            icon={<Mic className="h-10 w-10 text-primary" />}
            title="Voiceover"
            isVisible={isInView}
            delay={450}
          >
            Professional voice acting for animations, commercials, documentaries,
            and character work with a versatile vocal range.
          </SkillCard>
          
          <SkillCard 
            icon={<Edit3 className="h-10 w-10 text-primary" />}
            title="Content Creation"
            isVisible={isInView}
            delay={600}
          >
            Crafting engaging content that tells stories and connects with
            audiences across different mediums.
          </SkillCard>
          
          <SkillCard 
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Performance"
            isVisible={isInView}
            delay={750}
          >
            Bringing scripts to life with authenticity and emotional
            resonance from my acting background.
          </SkillCard>
        </div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  delay: number;
}

function SkillCard({ icon, title, children, isVisible, delay }: SkillCardProps) {
  return (
    <div 
      className={`p-6 rounded-lg border border-border bg-card shadow-sm transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}
