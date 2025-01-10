import React, { useContext } from 'react'
import Cards from './Cards'
import Dash_nav from './Dash_nav'
import pdfContext from '../context/pdf/pdfContext';

const Dashboard = () => {

    let { selectedComponent, mode, border } = useContext(pdfContext)

    return (
        <div>
            <Dash_nav />
            <div className={`p-4 sm:ml-64 mt-4 min-h-screen bg-${mode === 'gray-50' ? 'gray-50' : 'gray-900'}`}>
                <div className={`dashboardCard p-4 border-2 border-${border} border-dashed rounded-lg dark:border-gray-700 mt-14 h-max`}>
                    <div className={`flex items-center justify-center flex-col h-auto rounded dark:bg-${mode === 'gray-50' ? 'gray-100' : 'gray-800'}`}>
                        {/* =========== Card section ================ */}
                        {selectedComponent || <Cards />}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
