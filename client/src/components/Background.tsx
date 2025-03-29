import { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useInView } from '../lib/hooks';

export default function Background() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="background"
      ref={sectionRef} 
      className="py-20 bg-background"
    >
      <div className="container px-4 mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          My <span className="text-primary">Journey</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <TimelineCard 
            title="Legal Background" 
            year="2010-2015"
            delay={0}
            isVisible={isInView}
          >
            Started my professional journey in law, building analytical thinking
            and attention to detail that would later become valuable in web development.
          </TimelineCard>
          
          <TimelineCard 
            title="Acting Career" 
            year="2015-2020"
            delay={300}
            isVisible={isInView}
          >
            Explored my creative side through acting, developing communication skills
            and the ability to connect with audiences through voice and performance.
          </TimelineCard>
          
          <TimelineCard 
            title="Web Development" 
            year="2020-Present"
            delay={600}
            isVisible={isInView}
          >
            Combined my analytical and creative backgrounds, leveraging my unique
            perspective to build engaging web experiences while continuing to use
            my voice.
          </TimelineCard>
        </div>
        
        <div className={`mt-16 text-center max-w-3xl mx-auto transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg text-muted-foreground">
            This diverse background has given me a unique perspective that combines
            analytical thinking from my legal training, creative expression from acting,
            and technical skills from web development - all while maintaining my passion
            for voiceover work.
          </p>
        </div>
      </div>
    </section>
  );
}

interface TimelineCardProps {
  title: string;
  year: string;
  children: React.ReactNode;
  delay: number;
  isVisible: boolean;
}

function TimelineCard({ title, year, children, delay, isVisible }: TimelineCardProps) {
  return (
    <Card className={`transition-all duration-700 h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
      style={{ transitionDelay: `${delay}ms` }}>
      <CardContent className="pt-6 h-full flex flex-col">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {year}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground flex-grow">{children}</p>
      </CardContent>
    </Card>
  );
}
