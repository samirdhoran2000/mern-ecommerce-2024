import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const OrderWithPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

    const fetchPrescriptions = async () => {
      
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/prescription/get`,
        {
          withCredentials: true,
        }
      );
      const data = await response?.data;
      if (data.success) {
        setPrescriptions(data.prescriptions);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handleFetchPrescriptionDetails = (prescription) => {
    setPrescriptionDetails(prescription);
    setOpenDetailsDialog(true);
  };

  const PrescriptionDetailsView = ({ details }) => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Prescription Details</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <img
          src={details?.prescriptionImage}
          alt="Prescription"
          className="w-full mb-4"
        />
        <p>
          <strong>Name:</strong> {details?.name}
        </p>
        <p>
          <strong>Mobile:</strong> {details?.mobile}
        </p>
        <p>
          <strong>Address:</strong> {details?.address}
        </p>
        <p>
          <strong>Status:</strong> {details?.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(details?.createdAt).toLocaleString()}
        </p>
      </div>
    </DialogContent>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescription Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription) => (
              <TableRow key={prescription._id}>
                <TableCell>{prescription._id}</TableCell>
                <TableCell>{prescription.name}</TableCell>
                <TableCell>{prescription.mobile}</TableCell>
                <TableCell>
                  <Badge
                    className={`py-1 px-3 ${
                      prescription.status === "confirmed"
                        ? "bg-green-500"
                        : prescription.status === "rejected"
                        ? "bg-red-600"
                        : "bg-black"
                    }`}
                  >
                    {prescription.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(prescription.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={(isOpen) => {
                      setOpenDetailsDialog(isOpen);
                      if (!isOpen) setPrescriptionDetails(null);
                    }}
                  >
                    <Button
                      onClick={() =>
                        handleFetchPrescriptionDetails(prescription)
                      }
                    >
                      View Details
                    </Button>
                    {prescriptionDetails && (
                      <PrescriptionDetailsView details={prescriptionDetails} />
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderWithPrescription;
