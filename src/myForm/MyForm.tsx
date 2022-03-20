import React from 'react';
import { useState } from "react";
import "./MyForm.css";
import UserType from '../models/userType'
import { MainFetchApi, url } from '../api/Api'

const initialUser: UserType = {
  name: "",
  email: "",
  password: "",
  text: "",
  img: "",
};

const refImage = React.createRef<HTMLInputElement>();

function MyForm() {
  const [user, setUser] = useState(initialUser);
  const [message, setMessage] = useState("");

  const messageCreate = (text: string) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.name === "img" &&
      event.target.files &&
      event.target.files[0]
    ) {
      if (event.target.files[0].size > 5242880) {
        messageCreate("the image is too large (max-size: 5Mb)");
        return;
      }
      let img: File = event.target.files[0];
      setUser({
        ...user,
        img: URL.createObjectURL(img),
        file: img,
      });
      return;
    }
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleTextChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value.replace(/\d/g, "");
    setUser({
      ...user,
      text: newText,
    });
    return;
  }

  const handleSubmit = async () => {
    // const keys: Array<keyof UserType> = ['name', 'email', 'password', 'text'];
    // keys.forEach((key, index) => {
    //   if (user[key] === "") {
    //     messageCreate(`Please enter your ${key}`);
    //     // setValidate(false);
    //     return;
    //   }
    // })
    if (user.email === '') {
      messageCreate(`Please enter your email`);
      return;
    }
    if (user.password === '') {
      messageCreate(`Please enter your password`);
      return;
    }
    if (!user.file) {
      messageCreate(`Please choose Photo`);
      return;
    }

    const imagePath = await MainFetchApi.uploadFile(user);
    if (imagePath?.includes('error')) {
      console.log("imagePath did not create");
      return;
    }
    const userDto: UserType = initialUser;
    Object.assign(userDto, user);
    if (imagePath) { userDto.img = imagePath; }
    delete userDto.file;
    const answer = await MainFetchApi.createUser(userDto);
    console.log("answer for createUser:", answer);
  };

  const handleFind = async () => {
    if (user.email === "" || user.password === "") {
      messageCreate(`Please enter your email anf password`);
      return;
    } else {
      const foundUser = await MainFetchApi.getUser(user.email, user.password);
      console.log("foundUser:", foundUser);
      if (foundUser) {
        const parts = foundUser.img.split("\\");
        const img = `${url}/users/user/image/${parts[parts.length - 1]}`;
        foundUser.img = img;
        setUser(foundUser);
      }
    }
  };

  const triggerClick = () => {
    // refImage.current.click();
  };

  return (
    <div className="form">
      <h2>Registration Form</h2>
      <form>
        <div>
          <label>Name:</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label>Email:</label>
        </div>
        <div>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label>Password:</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label>Enter information about yourself:</label>
        </div>
        <div>
          <textarea
            name="text"
            value={user.text}
            rows={2}
            onChange={handleTextChangeInput}
          />
        </div>
        <div>
          {user.img !== null && (
            <div className="preview-image">
              <img src={user.img} alt="" />
              {user.file !== null && user.file && (
                <div className="preview-info">
                  <div>Name: {user.file?.name} /</div>
                  <div> Size: {Math.round(user.file.size / 9.54)} Mb</div>
                </div>
              )}
            </div>
          )}
          <div className="block-image">
            <div className="block-image-picker">
              <input
                type="file"
                name="img"
                accept="image/*"
                // style={{ display: "none" }}
                onChange={handleChangeInput}
                ref={refImage}
              />
            </div>
            <div className="block-image-button">
              <button onClick={triggerClick} className="choose-image">
                Select Image
              </button>
            </div>
          </div>
        </div>
        <div>
          <input
            type="button"
            value="Submit"
            className="submit"
            onClick={handleSubmit}
          />
        </div>
        {message !== "" && <label className="message">{message}</label>}
        <div>
          <input
            type="button"
            value="Find"
            className="submit"
            onClick={handleFind}
          />
        </div>
      </form>
    </div>
  );
}

export default MyForm;
