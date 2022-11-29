import { useState } from "react";
import { SketchPicker } from "react-color";

import { Spinner } from "../Spinner";

import UserService from "../../services/User.service";

export function ChannelColorIdentity() {
  const [message, setMessage] = useState("");

  const [currentColor, setCurrentColor] = useState("");

  const handleOnChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleProfile = () => {
    UserService.updateChannelColor({
      color: currentColor,
    }).then((error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    });
  };

  return (
    <div>
      <h2>Your Color Identity</h2>
      <SketchPicker
        disableAlpha
        color={currentColor}
        onChange={handleOnChange}
      />
      <div className="form-group">
        <button type="submit" onClick={handleProfile}>
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
