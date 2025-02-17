import React, { useContext, useEffect, useState } from "react";
import { db } from "../config";
import { AuthContext } from "../Context/AuthContext";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import Reviews from "./Reviews";

function DetailsMovieAuth() {
  const { user } = useContext(AuthContext);
  const [reviewsMsgs, setReviewsMsgs] = useState([]);
  const [review, setReview] = useState("");

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const getReviews = async () => {
    // try {
    //   const querySnapshot = await getDocs(collection(db, "Reviews"));
    //   const myMsgs = [];
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //     myMsgs.push(doc.data());
    //   });
    //   console.log("myMsgs>", myMsgs);
    //   setReviewsMsgs(myMsgs);
    // } catch (error) {
    //   console.log("error", error);
    // }

    const q = query(collection(db, "Reviews"), orderBy("date"));
    
    onSnapshot(q, (querySnapshot) => {
      const myMsgs = [];
      
      querySnapshot.forEach((doc) => {

        myMsgs.push(doc.data());
      });
      setReviewsMsgs(myMsgs);
      console.log("Reviews:", myMsgs);
    });
  };

  const msgDate = (date) => {
    return new Date(date * 1000).toLocaleString();
  };

  const handleMessageChange = (e) => {
    setReview(e.target.value);
  };

  
  const handleSubmit = async () => {
    console.log("review", review);
    try {
      // await setDoc(doc(db, "Reviews", user.email),  {
      //   text: review,
      //   date: new Date(),
      //   author: user.email,
      // });//? to create a new document with a custom id (user email)
      const docRef = await addDoc(collection(db, "Reviews"), {
        text: review,
        date: new Date(),
        author: user.email,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("suceesssss");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      <div className="star-rating">
        <p className="p-uppercase">Your rating:</p>
        {[...Array(5)].map((index, i) => {
          index += 1;
          return (
            <React.Fragment key={i}>
              <button
                type="button"
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      <div className="container-comment" action="">
        <p className="p-uppercase">Review this movie:</p>
        <input
          type="text"
          value={review}
          placeholder="Review here"
          name="message"
          onChange={handleMessageChange}
          required
        />
        <label htmlFor="message"></label>
        <br></br>
        <button className="button" type="submit" onClick={handleSubmit}>
          Submit review
        </button>
      </div>
      <p className="p-uppercase">Users reviews:</p>
      <div>
        {reviewsMsgs &&
          reviewsMsgs.map((msg, index) => {
            return (
              <div className="container-review" key={index}>
                <p>{msg.author} wrote:</p>
                <h4>"{msg.text}"</h4>
                <p>{msgDate(msg.date.seconds)}</p>
              </div>
            );
          })}
          <Reviews/>
      </div>
    </div>
  );
}

export default DetailsMovieAuth;
