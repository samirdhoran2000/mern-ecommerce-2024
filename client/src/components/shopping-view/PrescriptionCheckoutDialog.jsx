import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, Upload, X } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const PrescriptionCheckoutDialog = () => {

     const userID = JSON.parse(localStorage.getItem("userInfo"))?._id || "";
 
    console.log({ userID});
    
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        address: "",
        userId: userID,
        prescriptionImage: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, prescriptionImage: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("prescriptionImage", formData.prescriptionImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/prescription/upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",              
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(
          "Prescription uploaded successfully:",
          response.data.prescription
          );
          toast({
            title: "Prescription Uploaded",
            description:
              "Your prescription has been successfully uploaded and is pending review.",
            icon: <CheckCircle className="h-4 w-4" />,
          });

        setIsOpen(false);
        // You might want to show a success message or redirect the user
      } else {
        setError("Failed to upload prescription. Please try again.");
      }
    } catch (error) {
        console.error("Error uploading prescription:", error);
        toast({
          title: "Upload Failed",
          description:
            "There was an error uploading your prescription. Please try again.",
          icon: <AlertCircle className="h-4 w-4" />,
          variant: "destructive",
        });
      setError(
        "An error occurred while uploading the prescription. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, prescriptionImage: null }));
    setPreviewUrl(null);
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white hover:bg-gray-800"
      >
        Checkout with Prescription
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="bg-white text-black border-l border-gray-200 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">
              Prescription Checkout
            </SheetTitle>
            <SheetDescription>
              Please provide your details and upload your prescription.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prescription">Prescription Image</Label>
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Prescription preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="prescription"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or GIF (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="prescription"
                      name="prescriptionImage"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                      required
                    />
                  </label>
                </div>
              )}
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border-black text-black hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? "Ordering..." : "Order"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PrescriptionCheckoutDialog;
