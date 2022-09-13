import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState("")
  const [preview, setPreview] = useState("")
  const navigate = useNavigate()

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file",file)
    formData.append("title",title)
    try {
      await axios.post(`${process.env.REACT_APP_BASE}/product`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      })
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Product Name"
                />
              </div>
          </div>

          <div className="field">
            <label htmlFor="" className="label">Image</label>
              <div className="control">
                <div className="file">
                  <label className="file-label">
                    <input type="file" className="file-input" onChange={loadImage} />
                    <span className="file-cta">
                      <span className="file-label">Choose a file...</span>
                    </span>
                  </label>
                </div>
              </div>
          </div>
          {preview ? (
              <figure className="image is-128x128">
                <img src={preview} alt="Preview Images" />
              </figure>
          ):("")}
          <div className="field mt-1">
            <div className="control">
              <button type="submit" className="button is-success">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
