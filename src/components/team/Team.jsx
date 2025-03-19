import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Nohaila El Banoudi",
    role: "CEO & Founder",
    image: "/src/assets/girl7.png",
    bio: "Visionary leader with a passion for innovation and building impactful solutions.",
  },
  {
    name: "Hajar Chouhou",
    role: "Lead Developer",
    image: "/src/assets/girl6.png",
    bio: "Expert in full-stack development with 8+ years of experience building scalable applications.",
  },
  {
    name: "Nahid El Ayadi",
    role: "UI/UX Designer",
    image: "/src/assets/girl4.png",
    bio: "Creative designer focused on crafting beautiful and intuitive user experiences.",
  },
  {
    name: "Sara El Morabit",
    role: "Marketing Manager",
    image: "/src/assets/girl 1.png",
    bio: "Strategic marketer with a deep understanding of digital channels and customer acquisition.",
  },
  {
    name: "Imane Assouik",
    role: "Project Manager",
    image: "/src/assets/girl5.png",
    bio: "Organized leader ensuring projects are delivered on time and within scope.",
  },
  {
    name: "Fadoua Hamdouni ", 
    role: "Content Strategist",
    image: "/src/assets/girl 1.png", 
    bio: "Talented writer creating compelling content that resonates with our audience.",
  },
  {
    name: "Aya Ayoujil",
    role: "Software Engineer",
    image: "/src/assets/girl 1.png", 
    bio: "Skilled engineer specializing in backend systems and performance optimization.",
  },
];

export default function Team() {
  const [isVisible, setIsVisible] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const observerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

  
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });
    
   
    cardsRef.current.forEach(card => {
      if (card) observerRef.current.observe(card);
    });
    
    // Navbar shadow handler
    const handleScroll = () => {
      setNavbarShadow(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      cardsRef.current.forEach(card => {
        if (card && observerRef.current) observerRef.current.unobserve(card);
      });
      observerRef.current = null;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCardHover = (index) => {
    setActiveCard(index);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
        navbarShadow ? 'shadow-lg' : ''
      }`}>
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center text-pink-600 font-medium hover:text-pink-700 transition-colors duration-300"
          >
            <svg 
              className="h-5 w-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return Home
          </Link>
          
          <div className="text-gray-800 font-bold tracking-wide">OUR TEAM</div>
        </div>
      </nav>
      
      {/* Team Section */}
      <section className="bg-gradient-to-b from-pink-50 via-white to-pink-50 py-24 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3 relative inline-block">
              <span className="inline-block pb-2 relative">
                Our Leadership Team
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-1000 delay-300"
                  style={{ width: isVisible ? '100%' : '0%' }}></span>
              </span>
            </h2>
            <p className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-4 transition-opacity duration-1000 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              Meet the exceptional professionals guiding our vision and driving innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="team-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-pink-100 opacity-0 transform translate-y-8 group"
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
              >
                <div className="relative overflow-hidden">
                  <div className="h-72 bg-pink-50">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Animated floating social links */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <a href="#" aria-label="LinkedIn profile" className="bg-white text-pink-500 p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="#" aria-label="Twitter profile" className="bg-white text-pink-500 p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" aria-label="Email" className="bg-white text-pink-500 p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="p-6 relative z-10">
                  <h3 className={`text-xl font-semibold text-gray-800 mb-1 transition-all duration-500 ${
                    activeCard === index ? 'text-pink-600' : ''
                  }`}>
                    {member.name}
                  </h3>
                  <div className="h-0.5 w-12 bg-pink-400/70 mb-3 transition-all duration-500 transform origin-left scale-x-0 group-hover:scale-x-100"></div>
                  <p className="text-pink-600 font-medium mb-3 text-sm">
                    {member.role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Stats Section */}
        <div className="container mx-auto max-w-6xl mt-24">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative">
              <div className="absolute inset-0 bg-[url('/src/assets/pattern.svg')] opacity-10 mix-blend-soft-light"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {[
                  { number: "7+", label: "Team Members" },
                  { number: "2+", label: "Years Experience" },
                  { number: "100+", label: "Happy Clients" },
                  { number: "25+", label: "Projects Completed" }
                ].map((stat, index) => (
                  <div key={index} className="p-8 text-center">
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/80 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-in {
          animation: fadeInUp 0.8s forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}