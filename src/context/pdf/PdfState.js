import React, { useState, useEffect } from 'react'
import pdfContext from './pdfContext'
import image from '../../images/dashboard icons/image.png'
import merge from '../../images/dashboard icons/merge.png'
import addNum from '../../images/one.png'
import Cards from '../../components/Cards'
import moon from '../../images/night.png'
import sun from '../../images/sun.png'
import ImagesTopdf from '../../components/specifications/ImagesTopdf'
import Mergepdf from '../../components/specifications/Mergepdf'
import AddPageNo from '../../components/specifications/AddPageNo'
import help from '../../images/dashboard icons/question.png'
import TextPDF from '../../components/specifications/TextPDF'
import textPDF from '../../images/text-format.png'

const PdfState = (props) => {

    let dashboardItems = [
        {
            id: 1,
            component: <ImagesTopdf />,
            imgSource: image,
            title: 'Images to PDF'
        },
        {
            id: 2,
            component: <Mergepdf />,
            imgSource: merge,
            title: 'Merge PDF'
        },
        {
            id: 3,
            component: <AddPageNo />,
            imgSource: addNum,
            title: 'Add Page Numbers'
        },
        {
            id: 4,
            component: <TextPDF />,
            imgSource: textPDF,
            title: 'Text to PDF'
        },
        {
            id: 5,
            imgSource: help,
            title: 'Help'
        }
    ];

    // ======= Dynamically replacing <Cards> component with the dashboard items ===========

    // Retrieve the last selected dashboard item ID from local storage
    const savedComponentId = localStorage.getItem('selectedComponentId');

    // Find the corresponding component or default to <Cards />
    const initialComponent = savedComponentId ? dashboardItems.find(item => item.id === Number(savedComponentId))?.component : <Cards />;

    const [selectedComponent, setSelectedComponent] = useState(initialComponent);

    const handleClick = (id) => {
        const clickedItem = dashboardItems.find(item => item.id === id);
        if (clickedItem) {
            setSelectedComponent(clickedItem.component);
            localStorage.setItem('selectedComponentId', id); // Save the selected item ID to local storage
        }
    };

    // ============== Light Mode and Dark Mode ==================

    const savedMode = localStorage.getItem('mode');     // declaring the variable and taking the value of the mode through getItem()

    // since here the value of getItem() is gray-50 so by default it will be gray-50

    const [mode, setMode] = useState(savedMode || 'gray-50');  // Initialize mode state based on local storage or default value
    const [border, setBorder] = useState('gray-200');          // setting the border for the dark mode
    const [filter, setFilter] = useState('');                  // setting the image filter for the dark mode
    const [themeImg, setThemeImg] = useState(moon);            // Changing the sun and moon image over the mode

    // Apply mode-specific styles when mode changes
    useEffect(() => {
        if (mode === 'gray-50') {
            setBorder('gray-300');
            setFilter('');
            setThemeImg(sun);

        } else {
            setBorder('gray-700');
            setFilter('invert(1)');
            setThemeImg(moon)
        }

        // once the styles are been set Store selected mode in local storage so even if we refresh the page the styles shouldn't get back to their default values
        localStorage.setItem('mode', mode);
    }, [mode]);

    const handleModeClick = () => {
        // Toggle between light and dark mode
        setMode(prevMode => (prevMode === 'gray-50' ? 'gray-800' : 'gray-50'));
        // here prevMode is a parameter in a function. This function is used as an argument to the setMode function, which is provided by the useState hook.
    }

    // setting up the file max length
    const maxFileNameLength = 10;

    return (
        <div>
            <pdfContext.Provider value={{
                dashboardItems, handleClick, selectedComponent, handleModeClick, setMode, mode, border, filter, themeImg, maxFileNameLength
            }}>
                {props.children}
            </pdfContext.Provider>
        </div>
    )
}

export default PdfState;
