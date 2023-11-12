import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function ImageField({
  setImage,
  image,
  setImageField,
}: {
  setImage: (value: string) => void;
  image: string;
  setImageField: (value: boolean) => void;
}): JSX.Element {
  const { images } = useSelector((state: RootState) => state.listing);
  return (
    <div
      id="image-field"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form
        action=""
        id="image-field-form"
        onSubmit={(e) => {
          e.preventDefault();
          setImageField(false);
        }}
      >
        <input
          type="text"
          id="image-field-input"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <button id="image-field-btn" className="btn-message">
          <img
            className="btn-img"
            src={images.plast}
            alt="img"
          />
        </button>
      </form>
    </div>
  );
}

export default ImageField;
