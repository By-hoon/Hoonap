import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from "uuid";
import { dbService } from "fbase";
import { storageService } from "fbase";

import styled from "styled-components";

const AddContainer = styled.div`
    width: 100%;
    margin-left: 20px;
    margin-bottom: 50px;
`;

const DropContainer = styled.div`
    position: relative;
    margin: auto;
    width: 60%;
    min-height: 350px;
    background-color: #dfe6e9;
    height: auto;
    box-shadow : 2px 10px 10px #999;
`;

const DropInput = styled.input``;

const DropSpan = styled.span`
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 44%;
    font-size: 30px;
    color: white;
`;

const ThumbsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
    padding: 10px;
`;

const Thumb = styled.div`
    display: inline-flex;
    border-radius: 2;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 160px;
    height: 160px;
    padding: 4px;
    box-sizing: border-box;
`;

const ThumbInner = styled.div`
    display: flex;
    min-width: 0;
    overflow: hidden;
`;

const Img = styled.img`
    border-radius: 10px;
    object-fit: contain;
    width: 100%;
    height: 100%;
`;

const BtnContainer = styled.div`
    text-align: center;
    margin-left: 50px;
`;

const BtnStyle = styled.span`
    position: relative;
    display: inline-block;
    padding: 12px 36px;
    margin: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    text-transform: uppercase;
    outline-style: none;
    border: 1px solid white;
    overflow: hidden;
    cursor: pointer;
    &:hover{
        transition: 0.5s ease-in-out;
        background-color: tomato;
    }
    animation: opacityChange 1s linear 1 ;
        @keyframes opacityChange{
            0%{opacity: 0;}
            100%{opacity: 1;}
    } 
`;

const MyDropzone = ({ mainImages }) => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const onSubmit = (event) => {
        event.preventDefault();
        let attachmentArray = [];
        let attachmentID = [];
        files.forEach(async (attachment) => {
            let attachmentUrl = "";
            if (attachment.preview !== "") {
                const imageId = uuidv4();
                const attachmentRef = storageService
                    .ref()
                    .child(`storyimg/${imageId}`);
                const response = await attachmentRef.put(attachment);
                attachmentUrl = await response.ref.getDownloadURL();
                attachmentArray.push(attachmentUrl);
                attachmentID.push(imageId);
                if (attachmentArray.length === files.length) {
                    const imagesObj = {
                        imageId: attachmentID,
                        attachmentArray,
                    };
                    if (mainImages) {
                        const tempImg = dbService.doc(`temp_image/${mainImages.id}`);
                        delete mainImages.id;
                        mainImages.attachmentArray.forEach((savedImg, index) => {
                            imagesObj.imageId.push(mainImages.imageId[index]);
                            imagesObj.attachmentArray.push(savedImg);
                        })
                        await tempImg.set(imagesObj);
                    }
                    else await dbService.collection("temp_image").add(imagesObj);
                }
            }
        });
        setFiles([]);
    };

    return (
        <>
            <AddContainer>
                <DropContainer {...getRootProps()}>
                    <DropInput {...getInputProps()} />
                    <DropSpan>Drop Box</DropSpan>
                    <ThumbsContainer>
                        {files.map(file => (
                            <Thumb key={file.name}>
                                <ThumbInner>
                                    <Img src={file.preview} />
                                </ThumbInner>
                            </Thumb>
                        ))}
                    </ThumbsContainer>
                </DropContainer>
            </AddContainer>
            <BtnContainer>
                <BtnStyle onClick={onSubmit}>이미지 저장</BtnStyle>
            </BtnContainer>
        </>
    );
}
export default MyDropzone;