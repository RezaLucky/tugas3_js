class Vehicle {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    displayInfo() {
        return `${this.year} ${this.brand} ${this.model}`;
    }
}


class Car extends Vehicle {
    constructor(brand, model, year, doors) {
        super(brand, model, year);
        this.doors = doors;
    }
    
    displayInfo() {
        return `${super.displayInfo()} - ${this.doors} doors`;
    }
}


class Motorcycle extends Vehicle {
    constructor(brand, model, year, type) {
        super(brand, model, year);
        this.type = type;
    }
    
    displayInfo() {
        return `${super.displayInfo()} - ${this.type} type`;
    }
}


class Customer {
    constructor(nama, nomorTelepon, kendaraanDisewa) {
        this.nama = nama;
        this.nomorTelepon = nomorTelepon;
        this.kendaraanDisewa = kendaraanDisewa;
    }

    displayInfo() {
        return `${this.nama} (${this.nomorTelepon}) - Rented: ${this.kendaraanDisewa.displayInfo()}`;
    }
}


class TransportSystem {
    constructor() {
        this.vehicles = [];
        this.customers = [];
        this.transactions = [];
    }
    
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }
    
    listVehicles() {
        return this.vehicles.map(vehicle => vehicle.displayInfo()).join('\n');
    }

    addCustomer(customer) {
        this.customers.push(customer);
    }

    listCustomers() {
        return this.customers.map(customer => customer.displayInfo()).join('\n');
    }

    rentVehicle(customer, vehicle, rentalDate, returnDate) {
        const transaction = {
            customer: customer.nama,
            vehicle: vehicle.displayInfo(),
            rentalDate: rentalDate,
            returnDate: returnDate
        };
        this.transactions.push(transaction);
    }

    listTransactions() {
        return this.transactions.map(tx => 
            `Customer: ${tx.customer}, Vehicle: ${tx.vehicle}, Rental Date: ${tx.rentalDate}, Return Date: ${tx.returnDate}`
        ).join('\n');
    }

    listActiveRentals(currentDate) {
        return this.transactions
            .filter(tx => currentDate >= tx.rentalDate && currentDate <= tx.returnDate)
            .map(tx => `Customer: ${tx.customer}, Vehicle: ${tx.vehicle}, Rental Period: ${tx.rentalDate} to ${tx.returnDate}`)
            .join('\n');
    }
}


const system = new TransportSystem();
const car1 = new Car("Toyota", "Corolla", 2020, 4);
const bike1 = new Motorcycle("Yamaha", "R15", 2021, "Sport");

system.addVehicle(car1);
system.addVehicle(bike1);

const customer1 = new Customer("Reza Lucky", "123-456-7890", car1);
const customer2 = new Customer("Sandi Putra", "987-654-3210", bike1);

system.addCustomer(customer1);
system.addCustomer(customer2);

system.rentVehicle(customer1, car1, "2025-03-20", "2025-03-25");
system.rentVehicle(customer2, bike1, "2025-03-21", "2025-03-26");

console.log("Vehicles:\n" + system.listVehicles());
console.log("\nCustomers:\n" + system.listCustomers());
console.log("\nTransactions:\n" + system.listTransactions());
console.log("\nActive Rentals on 2025-03-22:\n" + system.listActiveRentals("2025-03-22"));
