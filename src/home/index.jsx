import "./index.css";

import { useState } from 'react';
import { Storage } from "aws-amplify";
import { useRef } from "react";
import { useEffect } from "react";

const Home = props => {

    const [fileData, setFileData] = useState();
    const [selected, setSelected] = useState(false);
    const uploadRef = useRef();

    const uploadFile = async () => {
        console.log(fileData)
        if (!fileData){
            alert("No file!");
            return;
        }
        const result = await Storage.put(props.user.username + "." + fileData.type, fileData, {
            contentType: fileData.type,
            level: "private"
        });
        alert("Upload success!");
        console.log(result);
    }

    useEffect(()=> {
        console.log(fileData)
        if (fileData){
            setSelected(true);
        }
    }, [fileData]);

    return (
        <div>
            <div className="welcome">Welcome {props.user.attributes.preferred_username}</div>
            <div className="signout" onClick={props.signOut}>Sign out</div>
            {
                props.user.attributes.nickname === 'driver'
                ?
                <div>
                    <div className="desc">
                        As a driver, you are asked to upload files for identification check.
                    </div>
                    <div className="upload" onClick={() => {
                        uploadRef.current.click();
                    }}>
                        <div className="icon">{selected ? "OK" : "+"}</div>
                        <input ref={uploadRef}  className="uploadInput" type='file' onChange={e => {
                            console.log(e.target.files);
                            setFileData(e.target.files[0]);
                        }} />
                    </div>
                    <div className="button" onClick={uploadFile}>
                        upload
                    </div>
                </div>
                :
                <div className="user">
                    Something awesome is coming ...
                </div>   
            }
        </div>
    )
};

export default Home;



/**
 * 
 * 外部 
 * const [isDriver, setIsDriver] = useState(false);
 * 
 * <Radio onClick={e => setIsDriver(e.target.value === "driver")}/>
 * 
 * {
 *      isDriver
 *      ?
 *      
 * }
 * 
 */