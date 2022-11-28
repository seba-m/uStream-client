import { useState } from "react";
import { SketchPicker } from "react-color";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Spinner } from "../Spinner";

import UserService from "../../services/User.service";

export function ChannelColorIdentity({ user }) {
  const [message, setMessage] = useState("");

  const [currentColor, setCurrentColor] = useState("");

  const handleOnChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleProfile = () => {
    UserService.updateChannelColor(currentColor)
      .then((error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setMessage(resMessage);
      })
  };

  return (
    <div>
      <SketchPicker disableAlpha color={currentColor} onChange={handleOnChange} />
      <div className="form-group">
        <button type="submit" onClick={handleProfile}>
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
