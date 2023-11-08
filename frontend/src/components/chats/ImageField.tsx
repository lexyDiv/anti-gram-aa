import React from "react";

function ImageField({
  setImage,
  image,
  setImageField,
}: {
  setImage: (value: string) => void;
  image: string;
  setImageField: (value: boolean) => void;
}): JSX.Element {
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
            src="https://static.tildacdn.com/tild6661-6562-4964-a663-373336366431/dc45qXe9i.png"
            alt="img"
          />
        </button>
      </form>
    </div>
  );
}

export default ImageField;
