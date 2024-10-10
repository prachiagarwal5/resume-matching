import { Phone, Mail, Github, Linkedin, Link } from "lucide-react"

export default function Component() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg  ml-80">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Aryan Mittal</h1>
        <div className="flex justify-center space-x-4 text-sm">
          <span className="flex items-center"><Phone className="w-4 h-4 mr-1" /> +91 9711063833</span>
          <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> aryanmittal_it20b10_07@dtu.ac.in</span>
          <span className="flex items-center">2K20/IT/33</span>
          <a href="#" className="flex items-center"><Github className="w-4 h-4 mr-1" /> Github</a>
          <a href="#" className="flex items-center"><Linkedin className="w-4 h-4 mr-1" /> Linkedin</a>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-300">EDUCATION</h2>
        <div className="mb-2">
          <h3 className="font-semibold">B.TECH (Information technology) <span className="font-normal">2020-2024</span></h3>
          <p>Delhi Technological University, New Delhi</p>
          <p>8.5 CGPA</p>
        </div>
        <div className="mb-2">
          <h3 className="font-semibold">CBSE (Class XII) <span className="font-normal">2019</span></h3>
          <p>St. Xavier's Senior Secondary. School</p>
          <p>89.4%</p>
        </div>
        <div>
          <h3 className="font-semibold">CBSE (Class X) <span className="font-normal">2017</span></h3>
          <p>St. Xavier's Senior Secondary. School</p>
          <p>9.2 CGPA</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-300">ACADEMIC PROJECT</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Covid-19 Detector</h3>
          <ul className="list-disc pl-5">
            <li>Built a CNN based deep learning model in Keras, utilizing TensorFlow as the backend, to detect Covid-19 using chest X-ray images of patients.</li>
            <li>The sequential deep learning model aims to differentiate between the X-rays of infected individuals and healthy individuals' X-rays.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Face Recognition</h3>
          <ul className="list-disc pl-5">
            <li>Used OpenCV, Haar cascade classifier and python libraries to create a program which can detect faces in an image.</li>
            <li>It uses machine learning techniques to identify, collect, store, and evaluate face characteristics so that they can be matched to photos of people in a database.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Movie recommendation system</h3>
          <ul className="list-disc pl-5">
            <li>Machine Learning project which recommends movies similar to the movie searched by the user.</li>
            <li>Used Python and its inbuilt libraries to make a recommendation system.</li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-300">INTERNSHIP</h2>
        <h3 className="font-semibold">Research Intern, Defence Research and Development Organization (DRDO) <span className="font-normal">May 2023 - July 2023</span></h3>
        <ul className="list-disc pl-5">
          <li>Successfully implemented Hight Cipher (Cipher suitable for low-resource devices) in Python using a 128-bit master key and 64-bit plain key.</li>
          <li>Engaged in exploring techniques to employ deep learning for attacking the HIGHT cipher. Our aim is to analyze the vulnerabilities of this cipher and devise strategies to exploit them using advanced deep learning methodologies.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-300">TECHNICAL SKILLS</h2>
        <ul className="list-disc pl-5">
          <li><strong>Programming Languages:</strong> Java, C/C++, Python</li>
          <li><strong>Technical Skills:</strong> Data Structures and Algorithms, Object Oriented Programming, Machine Learning, Data Science using NumPy, Pandas, and Matplotlib.</li>
          <li><strong>Database:</strong> MySQL, Database Management Systems.</li>
          <li><strong>Leetcode profile:</strong> <a href="https://leetcode.com/aryanmittal10/" className="text-blue-600 hover:underline">https://leetcode.com/aryanmittal10/</a></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-300">CERTIFICATIONS</h2>
        <ul className="list-disc pl-5">
          <li>Published a research paper on concentrated solar radiation as a method for desalination. <a href="#" className="text-blue-600 hover:underline">LINK</a></li>
          <li>Advanced Data Structures and Algorithm Pepcoding education private limited</li>
          <li>Machine Learning by Coding Blocks</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-300">POSITIONS OF RESPONSIBILITY</h2>
        <ul className="list-disc pl-5">
          <li>
            <strong>Team member Neural AI Society</strong> (AI/ML society of DTU)
            <ul className="list-disc pl-5">
              <li>Formulated and executed strategies as a key member of the managing team for the tech fest and hackathon.</li>
            </ul>
          </li>
          <li>
            <strong>Student Mentor in the Desh Ke Mentor (DKM)</strong> an initiative of the Government of NCT of Delhi
            <a href="#" className="text-blue-600 hover:underline ml-2">LINK</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-300">EXTRA-CURRICULAR ACTIVITIES AND ACHIEVEMENTS</h2>
        <ul className="list-disc pl-5">
          <li>Took part in an Inter-Zonal table tennis tournament.</li>
          <li>Team captain for interzonal Table Tennis tournament.</li>
          <li>Voluntary work: Kilkari International playschool (Teaching).</li>
        </ul>
      </section>
    </div>
  )
}