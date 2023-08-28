import React, { useContext } from 'react'
import Cards from './Cards'
import Dash_nav from './Dash_nav'
import pdfContext from '../context/pdf/pdfContext';

const Dashboard = () => {

    let { selectedComponent, mode, border } = useContext(pdfContext)

    return (
        <div>
            <Dash_nav />

            <div className={`p-4 sm:ml-64 mt-4 bg-${mode === 'gray-50' ? 'gray-50' : 'gray-900'}`}>
                <div className={`dashboardCard p-4 border-2 border-${border} border-dashed rounded-lg dark:border-gray-700 mt-14 h-max`}>
                    <div className={`flex items-center justify-center flex-col h-auto rounded dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'}`}>
                        {/* =========== Card section ================ */}
                        {selectedComponent || <Cards />}
                    </div>
                    <h2 className={` text-xl md:text-2xl text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} my-6 font-medium`}>Things I learned from this Project :</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`flex items-center justify-center p-6 rounded dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'}`}>
                            <p className={`text-1xl text-gray-400 text-${mode === 'gray-800'?'gray-50':'gray-800'}`}>
                            I actively employed the Tailwind CSS framework, with a particular focus on utilizing the Flowbite library, to elevate the app's aesthetic appeal and optimize its responsiveness. 
                            </p>
                        </div>
                        <div className={`flex items-center justify-center p-6 rounded dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'}`}>
                            <p className={`text-1xl text-gray-400 text-${mode === 'gray-800'?'gray-50':'gray-800'}`}>
                           I have used various React PDF libraries, these libraries played a crucial role in enabling me to enhance the functionality and capabilities of the application. libraries I integrated into the project are: jsPDF, react PDF, pdf-lib, pdfjs.
                            </p>
                        </div>
                        <div className={`flex items-center justify-center p-6 rounded dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'}`}>
                            <p className={`text-1xl text-gray-400 text-${mode === 'gray-800'?'gray-50':'gray-800'}`}>
                            Through this project, I honed my skills in React's state management and component lifecycle, enabling me to create interactive and responsive user interfaces.
                            </p>
                        </div>
                        <div className={`flex items-center justify-center p-6 rounded dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'}`}>
                            <p className={`text-1xl text-gray-400 text-${mode === 'gray-800'?'gray-50':'gray-800'}`}>
                            I used the Context API to efficiently manage the app's data and state changes in an organized and centralized manner. This approach ensured smoother interactions between different parts of the app and improved overall performance
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
