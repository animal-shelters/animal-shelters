import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function UploadComponent() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 10;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      maxFileSize={20000000}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <PrimaryButton
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Dodaj zdjęcie
          </PrimaryButton>
          &nbsp;
          <SecondaryButton onClick={onImageRemoveAll}>Usuń wszystkie zdjęcia</SecondaryButton>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.dataURL} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <PrimaryButton onClick={() => onImageUpdate(index)}>Aktualizuj</PrimaryButton>
                <SecondaryButton onClick={() => onImageRemove(index)}>Usuń</SecondaryButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}
