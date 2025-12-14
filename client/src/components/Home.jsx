import React from "react";
import { useState } from "react";
import { bookBaseUrl } from "../axiosInstance";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

function Home() {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTittle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    Id:"",
  });

  const [bookList , setBookList] = useState([]);
  const [isUpdating , setisUpdating] = useState(false);

  const getAllbookListData = async () => {
    try {
        const {data} = await bookBaseUrl.get("booklists");
            setBookList(data?.BookList)
        console.log("bookLists" , data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getAllbookListData()
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if(!isUpdating){
           if (
        !bookForm.BookName ||
        !bookForm.BookTittle ||
        !bookForm.Author ||
        !bookForm.SellingPrice
      ) {
        alert("All field are required");
      }

      const { data } = await bookBaseUrl.post( "/addbook", bookForm);
      if (data?.success) {
        alert(data?.Message);
        getAllbookListData();
        setBookForm({
          BookName: "",
          BookTittle: "",
          Author: "",
          SellingPrice: "",
          PublishDate: "",
          Id:"",
        });
      } 
      } else{
      const { data } = await bookBaseUrl.put( "/updatebook", bookForm);

         if (data?.Success) {
        alert(data?.Message);
        getAllbookListData();
        setBookForm({
          BookName: "",
          BookTittle: "",
          Author: "",
          SellingPrice: "",
          PublishDate: "",
          Id:"",
        });
        setisUpdating(false);
      } 
      }
     
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

const handleDelete = async (id) => {
    try{
        const {data} = await bookBaseURpost("deletebook" , {
            Id: id,
        })
        if(data?.Success){
            alert(data?.Message);
        }
    } catch (error){
        console.log(error);
    }
}

const handleUpdate = (data) => {
  setBookForm({
    BookName: data?.BookName,
    BookTittle: data?.BookTittle,
    Author: data.Author,
    SellingPrice: data.SellingPrice,
    PublishDate: data.PublishDate,
    Id:data?._id,
  });
  setisUpdating(true);
}

  console.log("book form", bookForm);

  return (
    <div className="w-full px-5 min-h-[cal(100vh-60px)]">
      <div className="w-full grid grid-cols-5 gap-3 my-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Book Name"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm  outline-gray-500 h-8 px-2"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Book Tittle</label>
          <input
            type="text"
            placeholder="Book Tittle"
            name="BookTittle"
            value={bookForm.BookTittle}
            onChange={handleFormChange}
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm  outline-gray-500 h-8 px-2"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Author</label>
          <input
            type="text"
            placeholder="Author"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm  outline-gray-500 h-8 px-2"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Selling Price</label>
          <input
            type="text"
            placeholder="Srlling Price"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm  outline-gray-500 h-8 px-2"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Publish Date</label>
          <input
            type="date"
            placeholder="Publish Date"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm  outline-gray-500 h-8 px-2"
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-gray-700 text-white h-9 w-22 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>

      <div className="w-full mt-10">
        <div className="w-full">
          <table className="w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gary-50">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Name
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book tittle
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Selling Price
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Publish Date
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {bookList?.map((book, index) => {
                   return(  <tr className="hover:bg-gray-200 " idx={index}>
                <td className="px-6 py-3 whitespace-nowrap">{book?.BookName}</td>
                <td className="px-6 py-3 whitespace-nowrap">{book?.BookTittle}</td>
                <td className="px-6 py-3 whitespace-nowrap">{book?.Author}</td>
                <td className="px-6 py-3 whitespace-nowrap">{book?.SellingPrice}</td>
                <td className="px-6 py-3 whitespace-nowrap">{book?.PublishDate}</td>
                <td className="px-6 py-3 whitespace-nowrap">
                    <div className="w-20 flex justify-center gap-5">
                    <div className="h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 rounded text-lg cursor-pointer" onClick={() =>handleDelete(book._id)}>
                        <span><MdDelete/></span>
                    </div>
                    <div className="h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 rounded text-lg cursor-pointer" onClick={() => handleUpdate(book)} >
                        <span><FaPen/></span>
                    </div>
                    </div>
                </td>

              </tr>
               ) })}
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
