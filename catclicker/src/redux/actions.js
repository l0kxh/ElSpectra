import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db} from "../firebase";
export const GET_CATS = 'GET_CATS';
export const ADD_TO_CATS = 'ADD_TO_CATS';
export const UPDATE_CAT = 'UPDATE_CAT'
export const CAT_CLICK = 'CAT_CLICK';

const catsCollectionRef = collection(db, "Cats");
export const getCats = () => {
    try {
        return async dispatch => {
            const res = await getDocs(catsCollectionRef);

            var data = [];
            res.docs.map((doc) => {
                var temp = doc.data();
                temp["docId"] = doc.id;
                data = [...data, temp];
            });
            if (data) {
                dispatch({
                    type: GET_CATS,
                    payload: data,
                });
            }
            else {
                console.log("Unable to fetch");
            }
        }
    }
    catch (err) { console.log(err); }
}

export const addCat = (url, name, clickCount, nicknames, id) => {
    try {
        return async dispatch => {
            const docRef = collection(db, "Cats");
            const nameQuery = query(docRef, where("name", "==", name))
            getDocs(nameQuery)
                .then((querySnapshot) => {
                    if (querySnapshot.size <= 0) {
                        addDoc(catsCollectionRef,
                            {
                                name: name,
                                image: url,
                                clickCount: Number(clickCount),
                                nickname: nicknames,
                            }
                        ).then(res => {
                            dispatch({
                                type: ADD_TO_CATS,
                                payload: {
                                    name: name,
                                    image: url,
                                    clickCount: Number(clickCount),
                                    nickname: nicknames,
                                    docId: res.id,
                                }
                            })
                        })
                    }
                    else {
                        const catRef = doc(db, "Cats", id);
                        updateDoc(catRef, { image: url, clickCount: Number(clickCount), nickname: nicknames })
                            .then(dispatch({
                                type: UPDATE_CAT,
                                payload: {
                                    name: name,
                                    image: url,
                                    clickCount: Number(clickCount),
                                    nickname: nicknames,
                                    docId: id,
                                }
                            }))
                    }
                })

        }
    }
    catch (err) {
        console.log(err);
    }
}