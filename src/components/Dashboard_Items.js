import React, { useContext } from 'react';
import pdfContext from '../context/pdf/pdfContext';

const Dashboard_Items = () => {

    let { dashboardItems, handleClick, mode, border, filter } = useContext(pdfContext)

    return (
        <div>
            {dashboardItems.map((item) => (
                <li key={item.id}>
                    <div onClick={() => { handleClick(item.id); }} className={`flex items-center p-2 text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} rounded-lg hover:bg-gray-100 dark:hover:bg-${border} group no-underline cursor-pointer`}>
                        <div className="icons">
                            <img src={item.imgSource} alt="images to pdf" style={{ filter: `${filter}` }} />
                        </div>
                        <span className="flex-1 ml-3 whitespace-nowrap">{item.title}</span>
                    </div>
                </li>
            ))}
        </div>
    );
}

export default Dashboard_Items;
