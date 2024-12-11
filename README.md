# TableMate

TableMate is a React Native application designed to simplify bill splitting during meals. The app allows users to manage and distribute costs among group of customers with ease, making it an essential tool for dining out or shared expenses.

## Features

### 1. Customer Management
- Users can add or remove customers dynamically.
- The app displays customers in a grid format with individual totals.
- Each customer is represented by an icon and a default name like `Person 1`, `Person 2`, etc.

### 2. Item Management
- Users can add items along with their prices.
- Items are displayed in a bill-like format for easy reference.
- The app calculates the total amount for all items, including tax and tip adjustments.

### 3. Tax and Tip Calculation
- Users can input a tax percentage, which is applied proportionally to each customer's total.
- Tip amounts can be divided evenly among all customers.

### 4. Assigning Items to Customers
- Items can be assigned to specific customer for accurate bill splitting.
- The app keeps track of items assigned to each customer and updates their total dynamically.

### 5. Dynamic UI
- The app adjusts its layout dynamically based on the number of customers.
- A scrollable interface ensures accessibility for larger groups.

## Usage
1. **Add Customers**: Use the "+" and "-" buttons to adjust the number of customers.
2. **Add Items**: Open the "Add Items" dialog to input item names and prices.
3. **Assign Items**: Tap on a customer to assign specific items to them.
4. **View Totals**: Review each customer's total, which includes their share of the tax and tip.

## Future Features
- Allow users to add multiple items at once for faster input.
- Optimize and enhance the UI for a more seamless experience.
- Implement additional functionality for exporting or sharing results.

## Technologies
- **React Native**
- **TypeScript**

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/TableMate.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TableMate
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the app:
   ```bash
   npm start
   ```


