import React, { useContext } from 'react'
import fileImg from '../images/paper.png'
import upload from '../images/file.png'
import downloadPdf from '../images/download-pdf.png'
import chooseFile from '../images/choose.png'
import pdfContext from '../context/pdf/pdfContext'

const Cards = () => {

    let { mode, filter, border } = useContext(pdfContext);

    let card = [
        {
            id: 1,
            imgSource: fileImg,
            title: <>Select your <b>Format</b></>   // wraping the text in a JSX fragment to use it as an html format
        },
        {
            id: 2,
            imgSource: chooseFile,
            title: <>Choose your <b>file</b></>
        },
        {
            id: 3,
            imgSource: upload,
            title: <><b>Upload</b> it</>
        },
        {
            id: 4,
            imgSource: downloadPdf,
            title: <><b>Download</b> it</>
        },
    ]

    return (
        <div>
            <div className="container my-10">
                <h2 className={`text-3xl text-${mode === 'gray-800' ? 'gray-50' : 'gray-800'} text-center my-4 font-medium`}>How to use PDF Tools</h2>
                <div className="cards">
                    {card.map((item) => (
                        <div className={`box text-center border-2 border-${border}`} key={item.id}>
                            <div className="cardImg">
                                <img src={item.imgSource} alt="help img" style={{filter:`${filter}`}}/>
                            </div>
                            <div className={`card-text mt-3 mx-2 mt-sm-2 text-${mode === 'gray-800'?'gray-50':'gray-800'}`}>{item.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Cards
