import React, { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useDispatch, useSelector } from "react-redux"
import { addCat } from "../redux/actions"
import { Backdrop, CircularProgress } from "@mui/material"
export const CatDetails = ({ curCat }) => {
    const { cats } = useSelector(state => state.catsReducer);
    const data = cats.filter(item => item?.docId === curCat?.docId);
    const dispatch = useDispatch();
    const addtoCat = (url) => dispatch(addCat(url, name, clickCount, nicknames, curCat?.docId));
    const [name, setName] = useState(data[0]?.name);
    const [Image, setImage] = useState(null);
    const [imgUrl, setImgUrl] = useState(data[0]?.image);
    const [clickCount, setClickCount] = useState(data[0]?.clickCount);
    const [nicknames, setNicknames] = useState(data[0]?.nickname);
    const [isUploading, setIsUploading] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    }
    const handleSubmit = () => {
        if (!name) {
            alert("Please enter name!!");
            return;
        }
        else {
            if (!clickCount) {
                setClickCount(0);
            }
            if (Image === null) {
                addtoCat(imgUrl);
            }
            else {
                setIsUploading(true);
                handleUpload();
            }
        }
    }
    const handleUpload = () => {
        const storageRef = ref(storage, `images/${Image?.name}`)
        uploadBytes(storageRef, Image).then((snapshot) => {
            getDownloadURL(storageRef)
                .then(url => {
                    addtoCat(url)
                    setIsUploading(false);
                })
        });
    }
    if (isUploading) {
        return (
            <Backdrop
                sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
        )
    }
    else {
        return (
            <Card style={{ width: "18rem", marginTop: "10px" }}>
                <Card.Body>
                    {openForm === true ?
                        (
                            <>
                                <Button variant='primary' onClick={() => setOpenForm(false)}>Close Form</Button>
                                <br /><br />
                                <label>Cat Name</label>
                                <input type="text" key={data[0]?.name} defaultValue={data[0]?.name} onChange={(e) => setName(e.target.value)} />
                                <br /><br />
                                <label>Cat Image</label>
                                <input type={"url"} key={data[0]?.image} defaultValue={data[0]?.image} disabled />
                                <div style={{ marginTop: "5px" }}></div>
                                <input type="file" accept='image/*' alt="" onChange={handleChange} />
                                <br /><br />
                                <label>Cat Clicks</label>
                                <input type="number" key={data[0]?.clickCount} defaultValue={data[0]?.clickCount} onChange={(e) => setClickCount(e.target.value)} />
                                <br /><br />
                                <label>Nick names</label>
                                <input type="text" key={data[0]?.nickname} defaultValue={data[0]?.nickname} onChange={(e) => setNicknames(e.target.value)} />
                                <br /><br />
                                <Button variant='success' style={{
                                    marginRight: "10px"
                                }}
                                    onClick={handleSubmit}
                                >Save</Button>
                                <Button variant='danger'>Undo</Button>
                            </>)
                        : (
                            <Button style={{ height: "40px" }} onClick={() => setOpenForm(true)}>Open New Form</Button>)}
                </Card.Body>
            </Card>

        )
    }
}