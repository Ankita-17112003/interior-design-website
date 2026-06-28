// components/sections/Team.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamMemberCard from './TeamMemberCard';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState({});

  const teamMembers = [
    {
      id: 1,
      name: "Emily Peterson",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "15+ years transforming spaces into timeless masterpieces with passion and precision.",
      expertise: ["Luxury Interiors", "Concept Development", "Client Strategy"],
      social: {
        linkedin: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Michael Scott",
      role: "Lead Architect",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Award-winning architect specializing in sustainable and innovative design solutions.",
      expertise: ["Sustainable Design", "Structural Planning", "3D Visualization"],
      social: {
        linkedin: "#",
        instagram: "#",
        twitter: "#"
      }
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Intersection Observer for cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => ({
              ...prev,
              [entry.target.dataset.id]: true
            }));
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll('[data-team-card]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-orange-50/20 to-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left decorative element */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        {/* Right decorative element */}
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed" />
        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-3 text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            <span className="w-8 h-px bg-orange-300" />
            Leadership Team
            <span className="w-8 h-px bg-orange-300" />
          </span>
          
         <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-stone-800 mb-4">
  The Minds Behind the Magic
</h2>

<p className="text-stone-500 max-w-2xl mx-auto text-sm sm:text-base">
  Creative direction by two industry experts committed to design excellence 
  and client satisfaction.
</p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mt-6 rounded-full" />
        </div>

        {/* Team Grid - Centered for 2 members */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                data-team-card
                data-id={member.id}
                className="flex justify-center"
              >
                <TeamMemberCard
                  member={member}
                  index={index}
                  isVisible={visibleCards[member.id]}
                />
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Team;