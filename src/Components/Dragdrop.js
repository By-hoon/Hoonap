import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from "uuid";
import { dbService } from "fbase";
import { storageService } from "fbase";

import styled from "styled-components";

const AddContainer = styled.div`
    margin-left: 50px;
`;

const ThumbsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
`;

const Thumb = styled.div`
    display: inline-flex;
    border-radius: 2;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 200px;
    height: 200px;
    padding: 4px;
    box-sizing: border-box;
`;

const ThumbInner = styled.div`
    display: flex;
    min-width: 0;
    overflow: hidden;
`;

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const SubmitForm = styled.form``;

const SubmitInput = styled.input``;


const MyDropzone = () => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    // useEffect(() => {
    //     files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [files]);

    const onSubmit = (event) => {
        event.preventDefault();
        let attachmentArray = [];
        let attachmentID = [];
        files.forEach(async (attachment) => {
            let attachmentUrl = "";
            if (attachment.preview !== "") {
                const attachmentRef = storageService
                    .ref()
                    .child(`storyimg/${uuidv4()}`);
                const response = await attachmentRef.put(attachment);
                attachmentUrl = await response.ref.getDownloadURL();
                attachmentArray.push(attachmentUrl);
                attachmentID.push(uuidv4());
                if (attachmentArray.length === files.length) {
                    const imagesObj = {
                        imageId: attachmentID,
                        attachmentArray,
                    };
                    await dbService.collection("temp_image").add(imagesObj);
                }
            }
        });
        setFiles([]);
    };

    return (
        <>
            <AddContainer>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <ThumbsContainer>
                    {files.map(file => (
                        <Thumb key={file.name}>
                            <ThumbInner>
                                <Img src={file.preview} />
                            </ThumbInner>
                        </Thumb>
                    ))}
                </ThumbsContainer>
            </AddContainer>
            <SubmitForm onSubmit={onSubmit}>
                <SubmitInput type="submit" value="이미지저장" />
            </SubmitForm>
        </>
    );
}
export default MyDropzone;