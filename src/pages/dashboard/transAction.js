import { addDoc, collection, getDoc, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";

import { setTrans } from "./transSlice";

export const postTransaction = (data) => async (dispatch) => {
  try {
    const docRefPending = addDoc(collection(db, "transactions"), data);

    toast.promise(docRefPending, {
      pending: "Please wait ...",
    });

    const docRef = await docRefPending;
    console.log(docRef);

    if (docRef?.id) {
      dispatch(fetchTransactions(data.userId));
      toast.success("The transaction has been added successfully");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const fetchTransactions = (uid) => async (dispatch) => {
  const data = [];

  //get data from the firestore

  try {
    const q = query(collection(db, "transactions"), where("userId" === uid));

    const querySnapshot = await getDoc(q);

    let trans = [];
    querySnapshot.forEach((doc) => {
      const { id } = doc;
      console.log(doc);
      const data = { ...doc.data(), id };
      trans.push(data);
    });

    dispatch(setTrans(trans));
  } catch (error) {
    toast.error(error.message);
  }

  dispatch(setTrans(data));
};
