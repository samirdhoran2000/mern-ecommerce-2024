import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";

function AdminPrescriptionOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [prescriptionOrders, setPrescriptionOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchPrescriptionOrders();
  }, []);

  async function fetchPrescriptionOrders() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/prescription/get`,
        {
          withCredentials: true,
        }
      );
      const data = await response?.data;
      if (data.success) {
        setPrescriptionOrders(data.prescriptions);
      }
    } catch (error) {
      console.error("Error fetching prescription orders:", error);
    }
  }

  function handleFetchOrderDetails(order) {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setOpenDetailsDialog(true);
  }

  async function handleUpdateOrderStatus() {
    if (!selectedOrder || !newStatus) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/shop/prescription/update-status/${selectedOrder._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      const data = await response?.data;
      if (data.success) {
        // Update the local state
        setPrescriptionOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder._id
              ? { ...order, status: newStatus }
              : order
          )
        );
        // Update the selected order
        setSelectedOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
        // Close the dialog
        setOpenDetailsDialog(false);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }
  const handleImageClick = (image) => {
    window.open(image, "_blank");
  };

  const PrescriptionOrderDetailsView = ({ order }) => (
    <DialogContent
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogHeader>
        <DialogTitle>Prescription Order Details</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <img
          src={order?.prescriptionImage}
          alt="Prescription"
          className="w-full mb-4 rounded-lg"
          onClick={()=>{handleImageClick(order?.prescriptionImage);}}
        />
        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <p>
          <strong>Mobile:</strong> {order.mobile}
        </p>
        <p>
          <strong>Address:</strong> {order.address}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
      <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
        <Select
          value={newStatus}
          onValueChange={(value) => setNewStatus(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Update Status" />
          </SelectTrigger>
          <SelectContent>
            {[
              { id: "pending", label: "Pending" },
              { id: "inProcess", label: "In Process" },
              { id: "inShipping", label: "In Shipping" },
              { id: "delivered", label: "Delivered" },
              { id: "rejected", label: "Rejected" },
            ].map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleUpdateOrderStatus}
          disabled={newStatus === order.status}
        >
          Update Status
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Prescription Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptionOrders.length > 0 ? (
              prescriptionOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        order.status === "delivered"
                          ? "bg-green-500"
                          : order.status === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleFetchOrderDetails(order)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No prescription orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog
        open={openDetailsDialog}
        onOpenChange={(isOpen) => {
          setOpenDetailsDialog(isOpen);
          if (!isOpen) {
            setSelectedOrder(null);
            setNewStatus("");
          }
        }}
      >
        {selectedOrder && (
          <PrescriptionOrderDetailsView order={selectedOrder} />
        )}
      </Dialog>
    </Card>
  );
}

export default AdminPrescriptionOrdersView;
