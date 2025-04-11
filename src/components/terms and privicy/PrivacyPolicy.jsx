import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Lock, Database, Shield, Eye, Clock, Globe, FileText, Settings, MessageCircle, Info } from "lucide-react";

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState([0]);
  const [darkMode, setDarkMode] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);

  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter(i => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  const sectionIcons = [
    Lock, 
    Database, 
    Shield, 
    Eye, 
    Clock, 
    Globe, 
    FileText, 
    Settings, 
    MessageCircle,
    Info
  ];

  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to our Privacy Policy! At our company, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our services. We've made every effort to keep this policy clear, transparent, and easy to understand."
    },
    {
      title: "2. Information We Collect",
      content: "We collect information that you provide directly to us, such as when you create an account, fill out forms, or communicate with us. This might include your name, email address, phone number, and billing information. We also automatically collect certain information when you use our services, including your IP address, device information, browser type, and how you interact with our platform."
    },
    {
      title: "3. How We Use Your Information",
      content: "We use your information to provide and improve our services, process your transactions, communicate with you, and ensure the security of your account. We may also use this information for analytics purposes, to personalize your experience, and to comply with legal obligations. Rest assured, we're committed to using your data responsibly and transparently."
    },
    {
      title: "4. Information Sharing",
      content: "We value your privacy and do not sell your personal information to third parties. However, we may share information with service providers who help us operate our business, with your consent, or when required by law. Our service providers are bound by strict confidentiality agreements and are only permitted to use your information for specific purposes."
    },
    {
      title: "5. Data Retention",
      content: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When we no longer need your data, we will securely delete or anonymize it to prevent it from being reconstructed or read."
    },
    {
      title: "6. International Transfers",
      content: "Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. Whenever we transfer your information internationally, we implement appropriate safeguards to ensure your data remains protected in accordance with this Privacy Policy."
    },
    {
      title: "7. Your Rights & Choices",
      content: "Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or restrict the use of your data. You can also opt out of certain types of processing, such as marketing communications. We make it easy for you to exercise these rights through your account settings or by contacting us directly."
    },
    {
      title: "8. Security Measures",
      content: "We implement a variety of security measures to protect your information, including encryption, access controls, and regular security assessments. While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We continuously work to improve our security practices to better safeguard your data."
    },
    {
      title: "9. Contact Information",
      content: "If you have any questions or concerns about our Privacy Policy or data practices, please don't hesitate to contact us. You can reach our dedicated privacy team at privacy@example.com or through the contact form on our website. We're committed to addressing your concerns promptly and thoroughly."
    },
    {
      title: "10. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make significant changes, we'll notify you through our website or by email. We encourage you to review this policy periodically to stay informed about how we're protecting your information."
    }
  ];

  const baseClasses = darkMode ? 
    "min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white transition-colors duration-300 pt-20" : 
    "min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 pt-20";

  const cardClasses = darkMode ?
    "max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden" :
    "max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden";

  const headerClasses = darkMode ?
    "bg-gradient-to-r from-blue-700 to-indigo-800 py-10 px-8 text-center relative overflow-hidden" :
    "bg-gradient-to-r from-blue-400 to-blue-600 py-10 px-8 text-center relative overflow-hidden";

  const sectionClasses = darkMode ?
    "border border-gray-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md" :
    "border border-blue-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md";

  const buttonClasses = darkMode ?
    "w-full flex justify-between items-center p-5 bg-gray-800 hover:bg-gray-700 transition-all duration-200 text-left" :
    "w-full flex justify-between items-center p-5 bg-white hover:bg-blue-50 transition-all duration-200 text-left";

  const expandedClasses = darkMode ?
    "p-5 bg-gray-800 border-t border-gray-700" :
    "p-5 bg-white border-t border-blue-100";

  const infoBoxClasses = darkMode ?
    "bg-gray-700 rounded-xl p-6 mb-8 border border-gray-600" :
    "bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100";

  const footerClasses = darkMode ?
    "bg-gradient-to-r from-gray-800 to-gray-700 py-6 px-8 border-t border-gray-700" :
    "bg-gradient-to-r from-blue-100 to-blue-200 py-6 px-8 border-t border-blue-200";

  const iconBgClasses = darkMode ?
    "bg-gray-700 p-2 rounded-lg mr-4" :
    "bg-blue-100 p-2 rounded-lg mr-4";

  const iconClasses = darkMode ?
    "h-5 w-5 text-blue-400" :
    "h-5 w-5 text-blue-600";

  const navbarClasses = darkMode ? 
    `fixed top-0 left-0 right-0 bg-gray-900 z-50 transition-all duration-300 ${navbarShadow ? 'shadow-lg' : ''}` : 
    `fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${navbarShadow ? 'shadow-lg' : ''}`;

  const navLinkClasses = darkMode ?
    "flex items-center text-pink-400 font-medium hover:text-pink-300 transition-colors duration-300" :
    "flex items-center text-pink-600 font-medium hover:text-pink-700 transition-colors duration-300";

  const navTitleClasses = darkMode ?
    "text-white font-bold tracking-wide" :
    "text-gray-800 font-bold tracking-wide";


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
    <div className={baseClasses}>
      {/* Navigation Bar */}
      <nav className={navbarClasses}>
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-16">
          <Link
            to="/signin"
            className={navLinkClasses}
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
            Return sign in 
          </Link>
          
          <div className={navTitleClasses}>PRIVACY POLICY</div>
        </div>
      </nav>

      <div className={cardClasses}>
        {/* Header */}
        <div className={headerClasses}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-white"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-blue-100 text-lg">How we respect and protect your data</p>
          <p className="mt-2 text-blue-100 text-sm">Last Updated: April 11, 2025</p>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
          >
            {darkMode ? 
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              : 
              <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            }
          </button>
        </div>

        {/* Content */}
        <div className="py-8 px-8">
          <div className={infoBoxClasses}>
            <p className={darkMode ? "text-blue-300 font-medium" : "text-blue-800 font-medium"}>
              We believe privacy is a fundamental right. This policy explains how we collect, use, and protect your personal information in simple, clear terms.
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => {
              const IconComponent = sectionIcons[index % sectionIcons.length];
              
              return (
                <div key={index} className={sectionClasses}>
                  <button 
                    className={buttonClasses}
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center">
                      <div className={iconBgClasses}>
                        <IconComponent className={iconClasses} />
                      </div>
                      <h3 className={darkMode ? "text-lg font-medium text-white" : "text-lg font-medium text-gray-800"}>{section.title}</h3>
                    </div>
                    {expandedSections.includes(index) ? 
                      <ChevronUp className={darkMode ? "h-5 w-5 text-blue-400" : "h-5 w-5 text-blue-500"} /> : 
                      <ChevronDown className={darkMode ? "h-5 w-5 text-blue-400" : "h-5 w-5 text-blue-500"} />
                    }
                  </button>
                  {expandedSections.includes(index) && (
                    <div className={expandedClasses}>
                      <p className={darkMode ? "text-gray-300 leading-relaxed" : "text-gray-600 leading-relaxed"}>{section.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional Feature */}
          <div className="mt-12 border-t border-blue-100 pt-8">
            <div className={infoBoxClasses}>
              <h3 className={darkMode ? "text-xl font-semibold text-white mb-4" : "text-xl font-semibold text-blue-800 mb-4"}>Privacy Preference Center</h3>
              <p className={darkMode ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>
                You can customize your privacy preferences below. These settings determine how we use your data across our platform.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={iconBgClasses}>
                      <Eye className={iconClasses} />
                    </div>
                    <div>
                      <h4 className={darkMode ? "font-medium text-white" : "font-medium text-gray-800"}>Essential Cookies</h4>
                      <p className={darkMode ? "text-sm text-gray-400" : "text-sm text-gray-500"}>Required for basic site functionality</p>
                    </div>
                  </div>
                  <div className="bg-blue-500 rounded-full w-10 h-6 flex items-center px-1 cursor-not-allowed">
                    <div className="bg-white w-4 h-4 rounded-full ml-auto"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={iconBgClasses}>
                      <Globe className={iconClasses} />
                    </div>
                    <div>
                      <h4 className={darkMode ? "font-medium text-white" : "font-medium text-gray-800"}>Analytics Cookies</h4>
                      <p className={darkMode ? "text-sm text-gray-400" : "text-sm text-gray-500"}>Help us improve our website</p>
                    </div>
                  </div>
                  <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-10 h-6 flex items-center px-1 cursor-pointer">
                    <div className="bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={iconBgClasses}>
                      <MessageCircle className={iconClasses} />
                    </div>
                    <div>
                      <h4 className={darkMode ? "font-medium text-white" : "font-medium text-gray-800"}>Marketing Cookies</h4>
                      <p className={darkMode ? "text-sm text-gray-400" : "text-sm text-gray-500"}>Used for personalized advertising</p>
                    </div>
                  </div>
                  <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-10 h-6 flex items-center px-1 cursor-pointer">
                    <div className="bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className={darkMode ? 
                  "px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors" : 
                  "px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                }>
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={footerClasses}>
          <div className="text-center">
            <p className={darkMode ? "mb-2 font-medium text-blue-300" : "mb-2 font-medium text-blue-700"}>
              Have questions about how we handle your data?
            </p>
            <p className={darkMode ? "text-sm text-blue-200" : "text-sm text-blue-700"}>
              Our privacy team is here to help at <span className="font-semibold">LifeLog@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}