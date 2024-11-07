"use client";

import React, { useEffect, useState } from "react";
import "@/public/styles/TodoCard.css";
import Image from "next/image";
import User1 from "@/public/images/user1.jpg";
import User2 from "@/public/images/user2.jpg";
import User3 from "@/public/images/user3.png";
import User4 from "@/public/images/user4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faComments,
  faLayerGroup,
  faPaperclip,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function TodoCard({ columnIndex, rowIndex, attachmentCount }) {
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    rowIndex: null,
    columnIndex: null,
  });

  const [attaCount, setAttaCount] = useState(attachmentCount)

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleClickOutside = (e) => {
    // Check if the clicked element is not the modal content
    if (e.target.classList.contains("modal-overlay")) {
      setModalOpen({ isOpen: false, rowIndex: null, columnIndex: null });
    }
  };

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    if (modalOpen.isOpen && rowIndex !== null && columnIndex !== null) {
      getUploadedFiles();
    }
  }, [modalOpen.isOpen, rowIndex, columnIndex]); // Ensure that dependencies are stable

  async function getUploadedFiles() {
    const request = await fetch(
      `http://localhost:5000/files/${rowIndex}_${columnIndex}`
    );
    const response = await request.json();
    if (response.files) {
      setUploadedFiles(response.files);
      setAttaCount(response.files.length)
    } 
  }



  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", `${rowIndex}_${columnIndex}`);

    try {
      setUploadStatus("Uploading...");
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadStatus("File uploaded successfully.");
        setFile(null);
        setTimeout(() => {
          setUploadStatus(null);
        }, 5000);
        getUploadedFiles()
      } else {
        setUploadStatus(`Error: ${result.message}`);
        setTimeout(() => {
          setUploadStatus(null);
        }, 5000);
      }
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };


  return (
    <>
      <div className="bg-white p-3 grid gap-4 w-[27rem]" key={rowIndex}>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Image
              src={User1}
              height={30}
              width={30}
              className="rounded-full"
              alt="User"
            />
            <h1 className="font-semibold">Client Name</h1>
          </div>
          <div className="flex gap-3 items-center">
            <Image
              src={User2}
              height={30}
              width={30}
              className="rounded-full"
              alt="User"
            />
            <h1 className="font-semibold">Sadik Istiak</h1>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLayerGroup} />
            <p className="todoText">Lorem ipsum dolor sit amet curn...</p>
          </div>

          <div className="flex gap-2 items-center bg-[whitesmoke] p-1">
            <FontAwesomeIcon icon={faCalendarDays} />
            <p>1/2</p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-5">
          <Image
            src={User3}
            height={1000}
            width={1000}
            className="rounded-full cursor-pointer h-8 w-8"
            alt="User"
          />
          <Image
            src={User4}
            height={1000}
            width={1000}
            className="rounded-full cursor-pointer h-9 w-8"
            alt="User"
          />
          <p className="p-2 rounded-full cursor-pointer bg-[whitesmoke]">12+</p>
          <div className="flex gap-1 items-center cursor-pointer">
            <FontAwesomeIcon icon={faComments} />
            <p>15</p>
          </div>
          <div
            onClick={() => {
              setModalOpen({
                isOpen: true,
                rowIndex: rowIndex,
                columnIndex: columnIndex,
              });
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faPaperclip} />
            <p>{attaCount}</p>
          </div>

          <div className="flex gap-1 items-center cursor-pointer">
            <FontAwesomeIcon icon={faCalendarDays} />
            <p>30-12-2022</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen.isOpen && (
        <div
          className="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
          onClick={handleClickOutside}
        >
          <div className="modal-content bg-white p-6 rounded-lg">
            <button
              className="close-btn absolute top-2 right-2"
              onClick={() => {
                setModalOpen({
                  isOpen: false,
                  rowIndex: null,
                  columnIndex: null,
                });
              }}
            >
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </button>
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl">Attachments</h1>
              <button
                className="flex items-center gap-2 bg-[#e9e7e7] p-2 rounded-lg"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h1>Select File</h1>
              </button>
            </div>
            {uploadedFiles.length > 0 ? (
  <div>
    <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
    {uploadedFiles.map((file, index) => (
      <div key={index} className="file-item bg-[whitesmoke] p-2 mt-5 rounded-lg shadow-md">
        <a
          href={`http://localhost:5000/uploads/${rowIndex}_${columnIndex}/${file}`}
          target="_blank"
          rel="noopener noreferrer"
          className="file-link flex items-center space-x-2 text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faPaperclip} className="file-icon text-gray-600" />
          <span className="file-name truncate">{file}</span>
        </a>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500 mt-4">No files uploaded.</p>
)}


            {/* Hidden file input */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* File preview section */}
            {file && (
              <div className="mt-4">
                <p>Selected File: {file.name}</p>

                {/* Preview for image files */}
                {file.type.startsWith("image/") && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="max-w-xs max-h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Upload button */}
            {file && (
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white p-2 rounded-lg"
                  onClick={handleUpload}
                >
                  Upload File
                </button>
              </div>
            )}

            {/* Upload status message */}
            {uploadStatus && (
              <div className="mt-4">
                <p>{uploadStatus}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
