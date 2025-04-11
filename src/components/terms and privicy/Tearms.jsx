import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Check, Shield, User, FileText, Eye, Star, AlertCircle, X, RefreshCw, Scale, Bell } from "lucide-react";

export default function TermsOfService() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [expandedSections, setExpandedSections] = useState([0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);

  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter(i => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  const handleAccept = () => {
    if (acceptedTerms) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const sectionIcons = [
    Shield, 
    User, 
    FileText, 
    Eye, 
    Star, 
    AlertCircle, 
    X, 
    Scale, 
    Bell
  ];

  const sections = [
    {
      title: "1. Introduction & Acceptance",
      content: "Welcome to our service! By accessing or using our platform, you agree to be bound by these Terms of Service. Please read these terms carefully before using our services. If you don't agree with any part of these terms, you may not use our service (but we hope you will!)."
    },
    {
      title: "2. User Accounts & Responsibilities",
      content: "You're responsible for keeping your account credentials confidential and for all activities that happen under your account. Please notify us immediately if you notice any unauthorized use. We may need to suspend accounts that don't follow our terms, but we'll always try to be fair about it."
    },
    {
      title: "3. Content Guidelines",
      content: "Our community thrives when everyone contributes positively! Users should not post content that is harmful, threatening, abusive, or otherwise objectionable. We might need to remove content that crosses these boundaries and, in serious cases, suspend accounts of repeat offenders."
    },
    {
      title: "4. Privacy Policy",
      content: "Your privacy matters enormously to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our service, you're consenting to these data practices—we promise to handle your information with care and respect."
    },
    {
      title: "5. Intellectual Property Rights",
      content: "The creative content, features, and functionality of our service—including text, graphics, logos, and software—belong to us or our partners and are protected by intellectual property laws. While we want you to enjoy our service, please don't copy, modify, or create derivative works without permission."
    },
    {
      title: "6. Limitation of Liability",
      content: "Legal speak alert! To the extent permitted by law, we're not liable for indirect or consequential damages resulting from your use of our service. Our total liability won't exceed what you've paid us in the past year. We don't expect any problems, but it's important we're clear about this."
    },
    {
      title: "7. Termination",
      content: "We may need to suspend accounts that violate these terms or harm our community. While we reserve the right to terminate access without notice, we typically try to give users a heads-up when possible. Our goal is maintaining a positive environment for everyone."
    },
    {
      title: "8. Governing Law",
      content: "These Terms of Service are governed by the laws of our jurisdiction, without regard to conflict of law provisions. Any legal matters related to your use of our service will be handled in our local courts. We hope it never comes to that!"
    },
    {
      title: "9. Changes to Terms",
      content: "We may update these terms occasionally. When we make significant changes, we'll let you know through our website or other communications. Continuing to use our service after changes means you accept the new terms. We try to keep things fair and transparent!"
    }
  ];

  // Add scroll event listener for navbar shadow
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setNavbarShadow(true);
      } else {
        setNavbarShadow(false);
      }
    });
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
        navbarShadow ? 'shadow-lg' : ''
      }`}>
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-16">
          <Link
            to="/signin"
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
            Return to sign in
          </Link>
          
          <div className="text-gray-800 font-bold tracking-wide">TERMS OF SERVICE</div>
        </div>
      </nav>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-confetti"></div>
        </div>
      )}
      
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 py-10 px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-white"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-blue-100 text-lg">The fun legal stuff we need to cover</p>
          <p className="mt-2 text-blue-100 text-sm">Last Updated: April 11, 2025</p>
        </div>

        {/* Terms Content */}
        <div className="py-8 px-8">
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
            <p className="text-blue-800 font-medium">
              We've tried to keep these terms clear, fair, and readable. Please take a moment to review them before using our platform!
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => {
              const IconComponent = sectionIcons[index];
              
              return (
                <div key={index} className="border border-blue-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                  <button 
                    className="w-full flex justify-between items-center p-5 bg-white hover:bg-blue-50 transition-all duration-200 text-left"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">{section.title}</h3>
                    </div>
                    {expandedSections.includes(index) ? 
                      <ChevronUp className="h-5 w-5 text-blue-500" /> : 
                      <ChevronDown className="h-5 w-5 text-blue-500" />
                    }
                  </button>
                  {expandedSections.includes(index) && (
                    <div className="p-5 bg-white border-t border-blue-100">
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Agreement Section */}
          <div className="mt-12 border-t border-blue-100 pt-8">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="flex items-center">
                <button 
                  onClick={() => setAcceptedTerms(!acceptedTerms)}
                  className={`flex-shrink-0 h-6 w-6 rounded-md border ${acceptedTerms ? 'bg-blue-500 border-blue-500' : 'border-blue-300'} flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {acceptedTerms && <Check className="h-4 w-4 text-white" />}
                </button>
                <label className="ml-3 text-blue-800 font-medium">
                  I've read and agree to the Terms of Service
                </label>
              </div>

              <div className="mt-8 flex justify-center">
                <button 
                  onClick={handleAccept}
                  className={`px-8 py-4 rounded-xl font-medium text-white shadow-md ${acceptedTerms ? 'bg-blue-500 hover:bg-blue-600 transform transition hover:-translate-y-1' : 'bg-blue-300 cursor-not-allowed'} transition-all duration-200`}
                  disabled={!acceptedTerms}
                >
                  {acceptedTerms ? "I Accept! Let's Go!" : "Please Accept to Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-6 px-8 border-t border-blue-200">
          <div className="text-center text-blue-700">
            <p className="mb-2 font-medium">Questions about these terms?</p>
            <p className="text-sm">
              We're here to help! Contact our friendly support team at <span className="font-semibold">LifeLog@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}