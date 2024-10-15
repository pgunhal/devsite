"use client";

import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function HomePage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [activeExperience, setActiveExperience] = useState(1);


  const handleMouseEnter = (projectId: number) => {
    setActiveModal(projectId);
  };

  const handleMouseLeave = () => {
    setActiveModal(null);
  };

  return (
    <>
      <nav className="bg-background-light text-white p-5 fixed w-full top-0 z-10 shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-wide">Pranav Gunhal</h1>
        </div>
        <ul className="flex space-x-8 text-lg">
          <li><a href="#about" className="hover:text-lime-green transition duration-300">About</a></li>
          <li><a href="#projects" className="hover:text-lime-green transition duration-300">Projects</a></li>
          <li><a href="#experience" className="hover:text-lime-green transition duration-300">Experience</a></li>
          <li><a href="#personal" className="hover:text-lime-green transition duration-300">Personal</a></li>
        </ul>
        <a href="#contact" className="bg-lime-green px-6 py-2 rounded-full hover:bg-white hover:text-background-dark transition-colors duration-300">Get In Touch</a>
      </nav>

      <section className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold typing">
          &gt;&gt;Hi, I'm <span className="text-lime-green animate-text-focus-in">Pranav Gunhal_</span>
          </h1>
          <p className="text-xl mt-6 text-gray-text">AI Developer & Student with a passion for building impactful solutions.</p>
          <div className="mt-8 space-x-4">
            <a href="#projects" className="bg-lime-green px-6 py-3 rounded hover:bg-white hover:text-background-dark transition-colors duration-300">View Portfolio</a>
            <a href="#contact" className="bg-gray-600 px-6 py-3 rounded hover:bg-gray-700 transition-colors duration-300">Contact Me</a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-background-dark text-white flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img src="/images/pranav.png" alt="Pranav Gunhal" className="w-64 h-64 rounded-full shadow-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="relative">
            <div className="absolute top-0 -left-5 h-full w-1 bg-lime-green"></div>
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
              <p className="text-lg text-gray-text">
                I’m an experienced developer and student at UCSB passionate about creating scalable, 
            real-world solutions with ML. With a background in machine learning, sustainable tech, and software development, 
            I enjoy leveraging my technical skills to tackle modern challenges.              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="projects" className="py-20 bg-background-light text-white">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-10">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
                        <div 
              className="bg-background-dark p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 relative" 
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <img src="/images/herbalyst.png" alt="Herbalyst" className="w-full h-48 object-contain rounded mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">Herbalyst</h3>
              <p className="text-gray-text">AI-powered iOS app for personalized herbal tea recommendations</p>
              {activeModal === 1 && (
                <div className="absolute inset-0 bg-black bg-opacity-90 p-8 rounded-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">Herbalyst</h3>
                  <p>I developed an AI-powered iOS app using Flutter and GPT-4 API to offer custom tea recommendations. I also integrated a medication tracker under Dr. Corky Wicks (Belhaven University) and PPX-TEC.</p>
                  <p className="text-lime-green mt-4">Skills: Flutter, XCode, Firebase, GPT-4, React</p>
                </div>
              )}
            </div>

            <div 
              className="bg-background-dark p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 relative" 
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <img src="/images/ijaia.png" alt="AI Politics" className="w-full h-48 object-contain rounded mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">Election Research</h3>
              <p className="text-gray-text">Transformer-based model for predicting Indian election outcomes</p>
              {activeModal === 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-90 p-8 rounded-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">AI + Politics Research</h3>
                  <p>I created a pipeline for Indian language processing and built a transformer model for Indian election prediction. Presented at CSSE 2023 and published in IJAIA.</p>
                  <p className="text-lime-green mt-4">Skills: Python, PyTorch, AutoML, SpaCY, NLTK</p>
                </div>
              )}
            </div>

            <div 
              className="bg-background-dark p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 relative" 
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <img src="/images/brain-ai.png" alt="AI Mental Health" className="w-full h-48 object-contain rounded mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">AI + Mental Health</h3>
              <p className="text-gray-text">CNN-LSTM model for semantic coherence in mental health diagnostics</p>
              {activeModal === 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-90 p-8 rounded-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">Semantic Coherence</h3>
                  <p>I designed a CNN-LSTM model to assess semantic coherence of posts on Reddit, improving mental health diagnostics. Paper pending publication in IEEE through BigData.</p>
                  <p className="text-lime-green mt-4">Skills: Python, TensorFlow, Keras, NLTK</p>
                </div>
              )}
            </div>

            <div 
              className="bg-background-dark p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 relative" 
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
            >
              <img src="/images/kanParsing.png" alt="Indic Parsing" className="w-full h-48 object-contain rounded mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">Indic Language Parsing</h3>
              <p className="text-gray-text">Novel algorithm to parse and process Indic characters</p>
              {activeModal === 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-90 p-8 rounded-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">Indic Language Parsing</h3>
                  <p>I invented an algorithm to convert Brahmic scripts into English equivalents and subsequently analyze them to better understand Hindu religious texts.</p>
                  <p className="text-lime-green mt-4">Skills: Python, PyTorch, AutoML, SpaCY, NLTK</p>
                </div>
              )}
            </div>


            <div 
              className="bg-background-dark p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 relative" 
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
            >
              <img src="/images/stanceModel.png" alt="Stance Model" className="w-full h-48 object-contain rounded mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">Transformer Research</h3>
              <p className="text-gray-text">Transformer neural network for sentiment analysis</p>
              {activeModal === 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-90 p-8 rounded-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">Blast AI Research</h3>
                  <p>I led a team of 6 to develop novel transformer archictecture for local election prediction (2020 Prop 16 in CA). We presented our findings virtually at ICTC 2022 and published proceedings in IEEE. </p>
                  <p className="text-lime-green mt-4">Skills: Tensorflow, HuggingFace, RoBERTa</p>
                </div>
              )}
            </div>


          
          <div 
              className="bg-background-dark p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 relative" 
              onMouseEnter={() => handleMouseEnter(6)}
              onMouseLeave={handleMouseLeave}
            >
              <img src="/images/aic.png" alt="AIC" className="w-full h-48 object-contain rounded mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">AI Coalition</h3>
              <p className="text-gray-text">Research and Coding Courses for High Schoolers </p>
              {activeModal === 6 && (
                <div className="absolute inset-0 bg-black bg-opacity-90 p-8 rounded-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">AI Coalition</h3>
                  <p>As VP and Director of Curriculum, I devised and taught courses and workshops for high schoolers teaching Python, Intro to ML, Intro to Research. I also maintained a blog on AI Ethics in the Real World on the AIC website. </p>
                  <p className="text-lime-green mt-4">Skills: Jupyter, Python, HubSpot, Colab </p>
                </div>
              )}
            </div>


          </div>
        </div>
      </section>


      <section id="experience" className="py-20 bg-background-dark text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Experience</h2>

        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col">
            <button
              className={`tab-button mb-4 w-full text-left px-4 py-2 transition duration-300 ${
                activeExperience === 1 ? 'text-lime-green border-l-4 border-lime-green' : 'text-gray-400 hover:text-lime-green'
              }`}
              onMouseEnter={() => setActiveExperience(1)}
            >
            Kannada Kali             
            </button>

            <button
              className={`tab-button w-full text-left px-4 py-2 transition duration-300 ${
                activeExperience === 2 ? 'text-lime-green border-l-4 border-lime-green' : 'text-gray-400 hover:text-lime-green'
              }`}
              onMouseEnter={() => setActiveExperience(2)}
            >
              Jetson App
            </button>

            <button
              className={`tab-button w-full text-left px-4 py-2 transition duration-300 ${
                activeExperience === 3 ? 'text-lime-green border-l-4 border-lime-green' : 'text-gray-400 hover:text-lime-green'
              }`}
              onMouseEnter={() => setActiveExperience(3)}
            >
              App Dev League
            </button>
          </div>

          <div className="md:w-2/3 transition duration-500">
            {activeExperience === 1 && (
              <div className="tab-content p-6 rounded-lg bg-background-light border-l-4 border-lime-green">
                <h3 className="text-3xl font-bold mb-2">Web Developer</h3>
                <p className="text-gray-300 mb-4">
                I developed a full-stack web application using React.js and Node.js, helping 400 students 
                efficiently record and submit homework assignments. I optimized a curriculum management system 
                for teachers with real-time updates and automated grading. Additionally, I taught the Kannada 
                language and culture for 6 years, designing engaging lessons and teaching over 200 students.
            </p>
                <p className="text-lime-green">Skills: React, Node.js, Google Cloud Platform</p>
              </div>
            )}

            {activeExperience === 2 && (
              <div className="tab-content p-6 rounded-lg bg-background-light border-l-4 border-lime-green">
                <h3 className="text-3xl font-bold mb-2">Product and Marketing Intern</h3>
                <p className="text-gray-300 mb-4">
                
                I worked closely with the CFO to redesign the user experience for a teen entrepreneurship app,
                 focusing on creating a more user-friendly interface. I led a team of 15 interns in developing 
                 an AI-powered idea generation system and conducted market research by interviewing over 50 
                 entrepreneurs. Using the feedback, we improved the app's features and presented a refined 
                 proposal to investors.                
                  </p>
                <p className="text-lime-green">Skills: Qualtrix, Figma, GPT-4 API</p>
              </div>
            )}

            {activeExperience === 3 && (
              <div className="tab-content p-6 rounded-lg bg-background-light border-l-4 border-lime-green">
                <h3 className="text-3xl font-bold mb-2">Web Dev and AI Instructor</h3>
                <p className="text-gray-300 mb-4">
                I created AI/ML curriculum modules for the Devnetic app, making interactive lessons accessible 
                for beginner and intermediate learners. I also led workshops on basic web development at tech 
                events, teaching over 100 participants essential coding skills. Additionally, I managed logistics
                 for the ADL Appathon, coordinating keynote speakers and securing corporate sponsorships, which 
                 boosted engagement and funding for the event attended by over 300 people.
                </p>
                <p className="text-lime-green">Skills: Javascript, Python, DaVinci, Mailchimp</p>
              </div>
            )}  
          </div>
        </div>
      </div>
    </section>
              

    <section id="personal" className="py-20 bg-background-light text-white flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
         
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="relative">
            <div className="absolute top-0 -left-5 h-full w-1 bg-lime-green"></div>
            <h2 className="text-4xl font-bold mb-4">Personal</h2>
              <p className="text-lg text-gray-text">
               In my free time, I enjoy biking and sketching. 
               I love exploring new cuisines and trying out different vegan recipes too. 
               I spend time reading up on emerging technologies as well, 
               especially in AI and machine learning, to stay current with industry trends. 
               When I want to unwind, I like to watch documentaries, particularly ones 
               focused on history and science. I also run a religious art <a href="https://narasimhasniche.weebly.com" className="underline hover:text-lime-green transition duration-300">blog</a>  with some of my sketches. 

              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img src="/images/leisure.png" alt="fun" className="w-64 rounded-lg shadow-lg object-fill" />
          </div>
        </div>
      </section>



      <section id="contact" className="py-20 bg-background-dark text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-text mb-8">
            Interested in collaborating on a project or just want to say hi? Please reach out!
          </p>
          {/* <a href="mailto:pranav.gunhal@gmail.com" className="bg-lime-green px-8 py-4 rounded-lg hover:bg-white hover:text-background-dark transition-colors duration-300">Send me an email</a> */}
        </div>

        <div className="container mx-auto flex justify-center space-x-6">
    <a href="https://linkedin.com/in/pranav-gunhal" target="_blank" className="text-3xl hover:text-lime-green transition duration-300">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="mailto:pranav.gunhal@gmail.com" target="_blank" className="text-3xl hover:text-lime-green transition duration-300">
      <i className="fas fa-envelope"></i>
    </a>
    <a href="https://github.com/pgunhal" target="_blank" className="text-3xl hover:text-lime-green transition duration-300">
      <i className="fab fa-github"></i>
    </a>
  </div>
      </section>




    </>
  );
}
