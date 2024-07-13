// Define the interface for a single entry
export interface IWeightEntry {
    id: string;
    weight: number;
    wastage: number;
    touch: number;
    NetWeight: number;
  }
  
  // Define the interface for the overall data structure
export  interface CustomerSales {
    date: string;
    customerName: string;
    customerId: string;
    new: IWeightEntry[];
    old: IWeightEntry[];
  }
  
  // Example data matching the CustomerData interface
  const data: CustomerSales = {
    date: "2024-07-13",
    customerName: "Surya teja",
    customerId: "random number",
    new: [
      { id: "",
        weight: 98,
        wastage: 0,
        touch: 78,
        NetWeight: 98,
      },
      {
        id: "",
        weight: 98,
        wastage: 0,
        touch: 78,
        NetWeight: 98,
      },
      {
        id: "",
        weight: 98,
        wastage: 0,
        touch: 78,
        NetWeight: 98,
      },
    ],
    old: [
      {
        id: "",
        weight: 98,
        wastage: 0,
        touch: 78,
        NetWeight: 98,
      },
      {
        id: "",
        weight: 98,
        wastage: 0,
        touch: 78,
        NetWeight: 98,
      },
      {
        id: "",
        weight: 98,
        wastage: 0,
        touch: 78,
        NetWeight: 98,
      },
    ],
  };
  