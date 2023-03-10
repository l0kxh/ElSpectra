import React, { useEffect, useState } from 'react'
import "./Home.css"
import { Button, Card } from 'react-bootstrap';
import { CatDetails } from '../CatDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getCats } from '../../redux/actions';
import { doc,  updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import {Backdrop, CircularProgress} from "@mui/material"

const CatImage = ({ width, imgHeight, imgWidth, flex, mb, curCat, setCurCat }) => {
    const { cats } = useSelector(state => state.catsReducer);
    const data = cats.filter(item => item.docId === curCat?.docId);
    const handleClick = async () => {
        const docRef = doc(db, "Cats", curCat?.docId);
        await updateDoc(docRef, { clickCount: data[0]?.clickCount + 1 });
    }
    const x = data[0].clickCount
    const age = x>=0 && x<=5 ? "Infant" : x>=6 && x<=12 ? "Child" : x>=13 && x<=25 ? "Young" : x>=26 && x<=40 ? "Middle Age" : x>=41 && x<=60 ? "Old" : "Very Old"
    return (
        <div style={{ flex: flex, marginBottom: mb , marginTop:"10px"}} onClick={()=>setCurCat(data[0])}>
            <Card style={{ width: width }}>
                <Card.Body>
                    <Card.Title>{data[0]?.name}</Card.Title>
                    <Card.Text>No. of times clicked : {data[0]?.clickCount}</Card.Text>
                    <Card.Img width={imgWidth} height={imgHeight} src={data[0]?.image} onClick={handleClick} />
                    <Card.Text style={{marginTop:"5px"}}>{age}</Card.Text>
                    <Card.Text>{data[0]?.nickname}</Card.Text>
                    <Button variant='primary'>Learn More</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
const CatImageGallery = ({ width, imgHeight, imgWidth, flex, mb, curCat, setCurCat }) => {
    const { cats } = useSelector(state => state.catsReducer);
    const data = cats.filter(item => item.docId === curCat?.docId);
    const handleClick = async () => {
        const docRef = doc(db, "Cats", curCat?.docId);
        await updateDoc(docRef, { clickCount: data[0]?.clickCount + 1 });
    }
    return (
        <div style={{ flex: flex, marginBottom: mb, marginTop: "10px" }} onClick={() => setCurCat(data[0])}>
            <Card style={{ width: width }}>
                <Card.Body>
                    <Card.Title>{data[0]?.name}</Card.Title>
                    <Card.Text>No. of times clicked : {data[0]?.clickCount}</Card.Text>
                    <Card.Img width={imgWidth} height={imgHeight} src={data[0]?.image} onClick={handleClick} />
                        <Button variant='primary' style={{marginTop:"10px"}}>Learn More</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

function Home() {
    const { cats, isLoading } = useSelector(state => state.catsReducer);
    const dispatch = useDispatch();
    const [curCat, setCurCat] = useState();
    const fetchCats = () => dispatch(getCats());
    useEffect(() => {
        setTimeout(() => {
            fetchCats()
        },1000)
    }, [fetchCats]);
    const HandleChange = (item) => {
        setCurCat(item);
    }
    if (isLoading === true) {
        return (
            <Backdrop
                sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true  }
            >
                <CircularProgress color='inherit' />
            </Backdrop>
        )
    }
    else {
        if (!curCat) {
            setCurCat(cats[0]);
            console.log(cats)
        }
        return (
            <div>
                <p className='title'>Cat Clicker App</p>
                <hr />
                <div className='catsflex'>
                    <div className='catList'>
                        {cats.map((item) =>
                            <div key={item.docId} className='cats '
                                style={{
                                    backgroundColor: item.docId === curCat?.docId ? "#007bff" : "white",
                                    color: item.docId === curCat?.docId ? "white" : "gray"
                                }}
                                onClick={() => HandleChange(item)} >
                                <div >{item.name}</div>
                                <div className='catCount'>{item.clickCount}</div>
                            </div>
                        )}
                    </div>
                    <CatImage curCat={curCat} width={"18rem"} imgWidth={200} imgHeight={250} />
                    <CatDetails curCat={curCat} />
                </div>
                <hr />
                <div>
                    <p className='title'>Cats Image Gallery</p>
                    <div style={{ display: 'flex', flexWrap: "wrap", marginLeft: "65px" }}>
                        {cats.map((item) => <CatImageGallery setCurCat={setCurCat} curCat={item} key={item.docId}
                            width={"15rem"} imgHeight={150} imgWidth={100}
                            flex={"21%"}
                            mb={"15px"}
                        />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home