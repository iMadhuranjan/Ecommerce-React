import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  isEditMode
}) => {
  const InputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);

    const selectedFile = event.target.files[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  async function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const fileUploaded = event.dataTransfer.files[0];
    if (fileUploaded) {
      {
        setImageFile(fileUploaded);
        // console.log(fileUploaded.name);
      }
    }
  }

  function remvoeImage() {
    setImageFile(null);
    if (InputRef.current) {
      InputRef.current.value = "";
    }
  }

  async function uploadImageToClodnary() {
    try {
      const data = new FormData();
      data.append("my_file", imageFile);

      const UploadData = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      if (UploadData.data.success) {
        setUploadedImageUrl(UploadData.data.result.url);
        
      }
    } catch (err) {
      console.error("Error uploading image:");
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToClodnary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block"> Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? "opacity-40": null} `}>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={InputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {console.log(isEditMode + "Edit Mode")}
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={"flex flex-col justify-center items-center h-32 cursor-pointer border rounded-md mb-5"}
          >
            <UploadCloudIcon className="w-8 h-8 text-muted-foreground mb-3" />
            <span> Drag & Drop or Upload Image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between border-2 p-2">
            <div className="flex items-center">
              <FileIcon />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              onClick={remvoeImage}
              className="text-muted-foreground hover:text-foreground h-17 w-2 "
            >
              <XIcon className="h-2 w-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
