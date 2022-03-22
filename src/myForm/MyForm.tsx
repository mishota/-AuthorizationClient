import React, { useEffect } from 'react';
import { useState } from "react";
import "./MyForm.css";
import UserType from '../models/userType'
import { MainFetchApi } from '../api/Api'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

export const initialUser: UserType = {
  name: "",
  email: "",
  password: "",
  text: "",
  img: "",
};

const refImage = React.createRef<HTMLInputElement>();

const MyForm: React.FC = () => {
  const { user, isAuth } = useTypedSelector(state => state.auth);

  const { fetchUser, fetchCreateUser } = useActions();

  const [newUser, setUser] = useState(initialUser);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAuth) {
      if (user.email !== "" && user.password !== "") {
        fetchUser(user.email, user.password);
      }
    }
  }, [isAuth])

  useEffect(() => {
    if (user.email !== "" && user.password !== "") {
      setUser(user);
    }
  }, [user])

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
        ...newUser,
        img: URL.createObjectURL(img),
        file: img,
      });
      return;
    }
    setUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleTextChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value.replace(/\d/g, "");
    setUser({
      ...newUser,
      text: newText,
    });
    return;
  }

  const handleSubmit = async () => {
    if (newUser.email === '') {
      messageCreate(`Please enter your email`);
      return;
    }
    if (newUser.password === '') {
      messageCreate(`Please enter your password`);
      return;
    }
    if (!newUser.file) {
      messageCreate(`Please choose Photo`);
      return;
    }

    const imagePath = await MainFetchApi.uploadFile(newUser);
    if (imagePath?.includes('error')) {
      console.log("imagePath did not create");
      return;
    }
    const userDto: UserType = initialUser;
    Object.assign(userDto, newUser);
    if (imagePath) { userDto.img = imagePath; }
    delete userDto.file;
    console.warn('userDto', userDto)
    fetchCreateUser(userDto);
  };

  const handleFind = async () => {
    if (newUser.email === "" || newUser.password === "") {
      messageCreate(`Please enter your email and password`);
      return;
    } else {
      fetchUser(newUser.email, newUser.password);
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
            value={newUser.name}
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
            value={newUser.email}
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
            value={newUser.password}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label>Enter information about yourself:</label>
        </div>
        <div>
          <textarea
            name="text"
            value={newUser.text}
            rows={2}
            onChange={handleTextChangeInput}
          />
        </div>
        <div>
          {newUser.img !== null && (
            <div className="preview-image">
              <img src={newUser.img} alt="" />
              {newUser.file !== null && newUser.file && (
                <div className="preview-info">
                  <div>Name: {newUser.file?.name} /</div>
                  <div> Size: {Math.round(newUser.file.size / 9.54)} Mb</div>
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
        {!isAuth &&
          <div>
            <input
              type="button"
              value="Register"
              className="submit"
              onClick={handleSubmit}
            />
          </div>
        }
        {message !== "" && <label className="message">{message}</label>}
        <div>
          <input
            type="button"
            value="Enter"
            className="submit"
            onClick={handleFind}
          />
        </div>
      </form>
    </div>
  );
}

export default MyForm;
