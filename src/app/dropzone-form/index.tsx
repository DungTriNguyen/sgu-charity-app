'use client';

import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';

interface IDropzonePreview {
  defaultValue: TUploadImage[] | [];
  isError: boolean;

  onChange: (e: TUploadImage[] | undefined) => void;
}

const DropzoneForm = (props: IDropzonePreview) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png', '.jpg', '.gif'],
    },
    onDrop: async (acceptedFiles) => {
      // console.log(acceptedFiles);
      const fileForm = await Promise.all(
        acceptedFiles.map(async (file: File) => {
          const base64 = await toBase64(file);
          return {
            name: file.name,
            base64,
          };
        })
      );
      // console.log(fileForm);

      props.onChange(fileForm as TUploadImage[]);
    },
  });

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const files = acceptedFiles.map((file) => {
    const url = URL.createObjectURL(file);
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <Image
          src={url as string}
          alt={file?.path || ''}
          width={100}
          height={100}
        />
      </li>
    );
  });

  return (
    <section className='container border p-4 rounded-md'>
      <div
        {...getRootProps({
          className: 'dropzone hover:bg-gray-100 cursor-pointer',
        })}
      >
        <input {...getInputProps()} multiple={true} />
        <p className='text-[#1DA1F2]'>
          Kéo/ thả &apos;n&apos; ảnh ở đây hoặc chọn file từ máy tính
        </p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
        {/* <button onClick={() => convertToBase64(acceptedFiles[0])}>Convert to Base64</button> */}
      </aside>
    </section>
  );
};

export default DropzoneForm;
