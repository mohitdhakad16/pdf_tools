import React, { useContext, useState } from 'react'
import linkdin from '../images/linkedin.png'
import github from '../images/github.png'
import Dashboard_Items from './Dashboard_Items'
import pdfContext from '../context/pdf/pdfContext'


const Dash_nav = () => {

    let { handleModeClick, mode, filter, themeImg, border } = useContext(pdfContext);


    return (
        <>
            <nav className={`fixed top-0 z-50 w-full dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'} border-b dark:border-${border} transition-all`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className={`inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-${border} dark:focus:ring-gray-600`}>
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <div className="flex ml-2 md:mr-24">
                                <span className={`self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} cursor-pointer `}>PDF Tools</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <div className="flex relative rounded-md mx-2">
                                        <div className="socialIcon cursor-pointer" onClick={handleModeClick}>
                                            <img src={themeImg} alt="socail-icon" style={{ filter: `${filter}` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition -translate-x-full border-r border-${border} sm:translate-x-0 dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'} dark:border-white-700`} aria-label="Sidebar">
                <div className={`h-full px-3 pb-4 overflow-y-auto dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'}`}>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <div className={`flex items-center p-2 text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} rounded-lg group`}>
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ml-3">Menu</span>
                            </div>
                        </li>
                        <Dashboard_Items />
                    </ul>
                    <ul className={`pt-4 mt-4 space-y-2 font-medium border-t dark:border-${border}`}>

                        <div className="flex relative rounded-md mx-2">
                            <div className="socialIcon cursor-pointer">
                                <a href="https://www.linkedin.com/in/mohitdhakad16/" target='_blank'><img src={linkdin} alt="linkdin" style={{ filter: `${filter}` }} /></a>
                            </div>
                            <div className="socialIcon cursor-pointer">
                                <a href="https://github.com/mohitdhakad16" target='_blank'><img src={github} alt="github" style={{ filter: `${filter}` }} /></a>
                            </div>
                        </div>
                    </ul>
                </div>
            </aside>

        </>
    )
}

export default Dash_nav
