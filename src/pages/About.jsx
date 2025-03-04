import React from 'react';
// import blog from '../images/blog.png';
// import todo from '../images/todolist.png';
// import book from '../images/health journal.png';
import { LuListTodo } from "react-icons/lu";
import { FaMicroblog } from "react-icons/fa";
import { RiHealthBookLine } from "react-icons/ri";

function About() {
    return (
        <div className="bg-blue p-12 flex flex-col items-center">
            {/* Centered LifeLog Section */}
            <div className="w-full md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-4xl font-bold text-indigo-600">LifeLog</h1>
                <p className="text-lg mt-4 text-gray-700">
                    LifeLog is your personal digital journal, designed to capture every moment and insight of your life journey. Whether you're tracking health, mood, daily tasks, or personal achievements, LifeLog provides a secure and intuitive platform to document, reflect, and understand your life better.
                </p>
            </div>

            {/* Image Section */}
            {/* <div className="flex justify-center gap-6 mt-12">
                <img src={blog} alt="LifeLog Blog" className="rounded-lg shadow-lg w-64 h-64 object-cover"/>
                <img src={todo} alt="LifeLog Todo" className="rounded-lg shadow-lg w-64 h-64 object-cover"/>
                <img src={book} alt="LifeLog Health Journal" className="rounded-lg shadow-lg w-64 h-64 object-cover"/>
            </div> */}

            {/* Services Section */}
            <section className="py-12">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
                    <li className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
                        <RiHealthBookLine className="text-indigo-600 text-3xl mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold">Journal:</h3>
                            <p className="text-gray-600 mt-2">Keep track of your well-being with logs that help you reflect, one step at a time.</p>
                        </div>
                    </li>
                    <li className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
                        <LuListTodo className="text-indigo-600 text-3xl mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold">To-Do List:</h3>
                            <p className="text-gray-600 mt-2">Simplify your tasks and stay productive with a smart and intuitive task manager.</p>
                        </div>
                    </li>
                    <li className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
                        <FaMicroblog className="text-indigo-600 text-3xl mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold">Blog:</h3>
                            <p className="text-gray-600 mt-2">Dive into a world of insights, tips, and inspiration curated to enrich your life.</p>
                        </div>
                    </li>
                </ul>
            </section>

            {/* Why LifeLog Section */}
            <div className="py-16 bg-gray-100 rounded-2xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-600">Why LifeLog?</h1>
                <div className="mt-6 max-w-4xl mx-auto text-lg text-gray-700 text-center">
                    <p>Because your story deserves to be recorded, your goals deserve to be achieved, and your journey deserves to be celebrated.</p>
                    <p className="mt-4">LifeLog isn’t just a tool—it’s your trusted companion in creating a life you love. Thank you for being part of our journey. Together, let’s make every day count!</p>
                </div>
            </div>
        </div>
    );
}

export default About;
