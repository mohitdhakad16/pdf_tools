import React, { useState, useRef, useContext } from 'react';
import pdfContext from '../../context/pdf/pdfContext';
import jsPDF from 'jspdf';
import Loader from '../Loader';
import colorPDF from '../../images/colorPDF.png'
import textFile from '../../images/note.png'

const TextPDF = () => {

    let { mode, border, maxFileNameLength } = useContext(pdfContext);

    let pdfFileName = (`${new Date().getTime()}.pdf`); // setting up the file name to show and save it

    const [selectedFiles, setSelectedFiles] = useState([]);     // setting the selected files
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);  // setting up the modal for generated pdf that it is generated or not
    const [showModal, setShowModal] = useState(false);          // setting up the modal to show/hide
    const [showDownloadButton, setShowDownloadButton] = useState(false);    // setting up the download button to show/hide
    const [displayedFiles, setDisplayedFiles] = useState([]); // New state to store displayed images


    const [previewModalVisible, setPreviewModalVisible] = useState(false);  // setting up the pdf content to showcase the generated pdf
    const [pdfContent, setPdfContent] = useState(null); // Define PDF content state

    const [showEditInput, setShowEditInput] = useState(false);
    const [editName, setEditName] = useState(pdfFileName);

    const fileInputRef = useRef(null);  // Adding a reference to the hidden file input so that we can trigger the file input into the button


    // 1) selecting the text file and displaying it over the dom screen
    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);   // converting the selected text file into array and then mapping through it then return the image url to showcase the image 
        const fileWithPreviews = files.map((file) => ({
            file,
            src: URL.createObjectURL(file),
        }));
        setDisplayedFiles((prevFiles) => [...prevFiles, ...fileWithPreviews]); // Update displayedFiles 
        setSelectedFiles(files); // Update selectedFiles
    };

    // 2) Deleting the text file 
    const handleDelete = (index) => {
        const updatedDisplayedFiles = [...displayedFiles];  // removing the array element by spread operator
        updatedDisplayedFiles.splice(index, 1); // Remove the selected image 
        setDisplayedFiles(updatedDisplayedFiles);   // then update the array
    };

    // 3) Editing the title of the pdf file
    const handleEditName = () => {
        setShowEditInput(true); // Show the input field when "Edit" button is clicked
    }

    // 4) Adding a reference of the input file on the button
    const handleSelectFilesClick = () => {
        fileInputRef.current.click();
        // added a reference to input field as we have set it to hidden so we are adding an reference to open the dailog box and select the files
    };

    // 5) Loginc for showing the modal for the creation of the pdf
    const handleConvertToPdf = () => {
        setIsGeneratingPdf(true);   // whe loader is loading set the generated pdf to true
        setShowModal(true);         // show and hide of the modal when the user clicks on convert pdf button

        setTimeout(() => {
            setIsGeneratingPdf(false);  // once the setTimeout gets completed set the generated pdf to false
            setShowDownloadButton(true);
        }, 5000);

        // creating a loader of 5 sec to show that the pdf file is being created
    };

    // 6) Closing of the modal 
    const handleCloseModal = () => {
        setShowModal(false); // Hide the modal after downloading PDF
    }

    // 7) Logic for creating the text file into the pdf file

    const handleDownloadPdf = async () => {
        const pdfName = editName.trim() !== "" ? editName : `${new Date().getTime()}.pdf`;

        const doc = new jsPDF();
        doc.setFontSize(12); // Set the font size
        const lineHeight = 7; // Adjust this for spacing

        let yPosition = 10;

        for (const file of selectedFiles) {
            const fileText = await file.text();

            if (fileText) {
                const lines = doc.splitTextToSize(fileText, 190); // Adjust width

                for (const line of lines) {
                    doc.text(10, yPosition, line);
                    yPosition += lineHeight;
                    if (yPosition >= 280) { // Adjust for new page
                        doc.addPage();
                        yPosition = 10;
                    }
                }
            }
        }

        doc.save(pdfName);

        setShowModal(false); // Hide the modal after downloading PDF
        setShowDownloadButton(false); // Reset the download button state
        setDisplayedFiles([]);   // Once the user clicks on the download button, the selected files array should be empty
        setSelectedFiles([])
    };


    const handlePreview = async () => {

        const doc = new jsPDF();
        doc.setFontSize(12); // Set the font size
        const lineHeight = 7; // Adjust this for spacing

        let yPosition = 10;

        for (const file of selectedFiles) {
            const fileText = await file.text();
            const lines = doc.splitTextToSize(fileText, 190); // Adjust width

            for (const line of lines) {
                doc.text(10, yPosition, line);
                yPosition += lineHeight;
                if (yPosition >= 280) { // Adjust for new page
                    doc.addPage();
                    yPosition = 10;
                }
            }
        }

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfContent(pdfUrl);
        setPreviewModalVisible(true);
        setShowModal(false); // Close the main modal
    };


    return (
        <div className={`w-full p-4 text-center border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-${mode} dark:border-gray-700`}>
            <h5 className={`mb-2 text-3xl font-bold text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} dark:text-gray`}>Text to PDF</h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg">User friendly web app to convert text files to PDF quickly and easily</p>

            <div className="py-4 text-center">
                {/* // setting up the input file into an button */}
                <button className="inline-block w-40 bg-yellow-300 border border-yellow-500 rounded-full p-3 cursor-pointer" onClick={handleSelectFilesClick}>
                    <span className="text-black font-medium">Select Files</span>
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileInputChange} accept=".txt" />
                </button>

                {/* if the length is less then 0 show nothing if yes show the files */}
                {displayedFiles.length > 0 && (
                    <div className="mt-4">
                        <h3 className={`text-lg font-semibold text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'}`}>Selected Files:</h3>
                        <ul className="mt-2 flex justify-center flex-wrap">
                            {/* Mapping through the selected files and displaying it over dom screen */}
                            {displayedFiles.map((file, index) => (
                                <div className={`imagebox mx-2 my-2`} key={index}>
                                    <div className="deleteButton text-left">
                                        <span className={`material-symbols-outlined cursor-pointer text-red-600`} onClick={() => { handleDelete(index) }}>delete</span>
                                    </div>
                                    <div className={`imgSection p-2 flex flex-col justify-center border-${border} border-2`}>
                                        <div className={`fileImg p-2 mx-2  cursor-pointer`}>
                                            <img src={textFile} alt={file.file.name} />
                                        </div>
                                    </div>
                                    <div className={`relative group cursor-pointer my-2 text-sm ${mode === 'gray-800' ? 'text-gray-50' : 'text-gray-800'}`}>
                                        {file.file.name.replace(/\s/g, '').length > maxFileNameLength
                                            ? `${file.file.name.replace(/\s/g, '').substring(0, Math.floor((maxFileNameLength - 2) / 2))}...${file.file.name.replace(/\s/g, '').substring(file.file.name.replace(/\s/g, '').length - Math.floor((maxFileNameLength - 3)))}`
                                            : file.file.name}
                                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden w-max bg-gray-700 text-white text-xs rounded px-2 py-1 group-hover:block"> {file.file.name} </span>
                                    </div>
                                </div>
                            ))}
                        </ul>
                        <button type="button" onClick={handleConvertToPdf} className="my-8 focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                            Create PDF
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className={`fixed top-0 left-0 right-0 z-50 h-full flex flex-col items-center justify-center bg-opacity-75 bg-${mode === 'gray-50' ? 'gray-400' : 'gray-950'}`}>

                    {isGeneratingPdf ? (
                        <>
                            {/* when the setTimeout is running show this modal  */}
                            <div className={`max-w-fit p-10 border border-gray-200 rounded-lg shadow dark:bg-${mode} dark:border-gray-700 h-auto`}>
                                <div className="relative">
                                    <h5 className={`mb-8 my-3 text-2xl font-bold tracking-tight text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} `}>PDF is being generated...</h5>
                                </div>
                                <Loader />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* when the setTimeout is completed show this modal */}
                            <div className={`p-12 max-w-fit flex justify-center items-center flex-col border border-${border} rounded-lg shadow dark:bg-${mode} dark:border-${border} h-auto`}>
                                <div className="relative">
                                    <button onClick={handleCloseModal} style={{ top: '-40px', right: '-20px' }} className={`text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} absolute text-lg`}>
                                        ✖ {/* Unicode character for 'X' icon */}
                                    </button>
                                    <h5 className={`mb-2 my-3 text-2xl font-bold tracking-tight text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'}`}>PDF is been generated</h5>
                                </div>
                                {showDownloadButton && (
                                    <>
                                        <div className={`fileImg p-2 mx-2 my-2 cursor-pointer`}>
                                            <img src={colorPDF} alt='pdf file' />
                                        </div>

                                        <div className="imagebox flex justify-center items-center">
                                            <span className={`material-symbols-outlined cursor-pointer text-green-600`} onClick={handleEditName}>edit</span>
                                            {showEditInput ? (
                                                <input type="text" className={`text-lg mx-4 my-2`} value={`${editName}`} onChange={(event) => setEditName(event.target.value)} onBlur={() => {
                                                    setShowEditInput(false);
                                                    if (editName.trim() === "") {
                                                        setEditName(`${new Date().getTime()}.pdf`);
                                                    }
                                                    else if (!editName.endsWith(".pdf")) {
                                                        setEditName(editName + ".pdf")
                                                    }
                                                }}
                                                />
                                            ) : (
                                                <div className={`text-lg text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} mx-4`}>
                                                    {editName}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <button onClick={handleDownloadPdf} className="my-2 mx-1 px-4  py-2 bg-yellow-500 font-medium text-black rounded-md text-center">
                                                Download PDF
                                            </button>
                                            <button onClick={handlePreview} className="my-2 mx-1 px-4 py-2 bg-red-500 font-medium text-white rounded-md text-center">
                                                Preview
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
            {previewModalVisible && (
                <div id="pdfPreviewModal" className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-opacity-75 bg-${mode === 'gray-50' ? 'gray-400' : 'gray-950'}`} onClick={() => { setPreviewModalVisible(false); setShowModal(true); }}>
                    <div className={`w-full h-full p-4 max-w-screen-lg relative`}>
                        <iframe
                            src={pdfContent}
                            title="PDF Preview"
                            className="w-full h-full border border-gray-300"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TextPDF
