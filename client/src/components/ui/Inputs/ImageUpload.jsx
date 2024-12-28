import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onFileSelect, value, onChange, name }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        onFileSelect(file);
        if (onChange) {
          onChange(file);
        }
      }
    },
    [onFileSelect, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="image-upload-container">
      <div
        {...getRootProps()}
        className="dropzone w-64 flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-800 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue"
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <input {...getInputProps()} name={name} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>
      {(preview || value) && (
        <div className="preview-container">
          <img
            src={
              preview ||
              (typeof value === "string" ? value : URL.createObjectURL(value))
            }
            alt="Preview"
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
