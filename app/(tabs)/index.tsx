import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import AddItemDialog from './../../components/AddItemDialog';
import AssignItemsDialog from './../../components/AssignItemsDialog';

const HomeScreen = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isItemAssignDialogVisible, setItemAssignDialogVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Open/close dialog
  const openDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);

  // Item interface
  interface Item {
    id: number;
    name: string;
    price: number;
  }

  // State for items
  const [items, setItems] = useState<Item[]>([]);

  // Handle saving item to the list
  const handleSaveItem = (item: Omit<Item, 'id'>) => {
    setItems([...items, { id: items.length + 1, ...item }]);
    setDialogVisible(false);
  };

  const [taxRate, setTaxRate] = useState(0); // Tax rate as a percentage
  const [tipAmount, setTipAmount] = useState(0); // Total tip amount

  // Handle assigning item to a person
  const [assignedItems, setAssignedItems] = useState<{ [key: number]: Item[] }>({});

  const handleAssignItemToPerson = (item: Item) => {
    if (selectedPerson !== null) {
      // Assign item to the selected person
      const updatedAssignedItems = { ...assignedItems };
      updatedAssignedItems[selectedPerson] = [
        ...(updatedAssignedItems[selectedPerson] || []),
        item,
      ];

      setAssignedItems(updatedAssignedItems);
      // Remove the item from the available items list
      setItems(items.filter((i) => i.id !== item.id));
      setItemAssignDialogVisible(false);
    }
  };

  // Handle increasing/decreasing number of people
  const [peopleCount, setPeopleCount] = useState(2); // Default number of members

  const handleIncrease = () => setPeopleCount(peopleCount + 1);
  const handleDecrease = () => setPeopleCount(Math.max(1, peopleCount - 1));

  // Generate member data based on peopleCount
  const members = Array.from({ length: peopleCount }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    items: assignedItems[i + 1] || [],
  }));

  return (
    <View style={styles.container}>
      {/* Members Grid in ScrollView */}
      <Text style={styles.membersLabel}>Members</Text>
      <ScrollView
        contentContainerStyle={styles.membersScroll}
        showsVerticalScrollIndicator={true} // Enable scroll indicator
      >
        <View style={styles.membersGrid}>
        {members.map((member) => {
          // Calculate the total cost for the member
          const total = member.items.reduce((sum, item) => (sum + item.price)*(1+taxRate) , 0);

          return (
            <TouchableOpacity
              key={member.id}
              onPress={() => {
                setSelectedPerson(member.id);
                setItemAssignDialogVisible(true);
              }}
            >
            <View style={styles.memberCard}>
                <View style={styles.iconWrapper}>
                  <IconSymbol size={40} color="#808080" name="person" />
                </View>
                <Text style={styles.memberText}>P{member.id}</Text>
                <Text style={styles.totalText}>${total.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      {/* Footer Section */}
      <View style={styles.addMemberButtons}>

        {/* Counter Section */}
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.arrowButton}>
            <Text style={styles.arrowText}>-</Text>
          </TouchableOpacity>
          <View style={styles.numberBox}>
            <Text style={styles.numberText}>{peopleCount}</Text>
          </View>
          <TouchableOpacity onPress={handleIncrease} style={styles.arrowButton}>
            <Text style={styles.arrowText}>+</Text>
          </TouchableOpacity>
        </View>

                
        {/* Add Item Dialog */}
        <AddItemDialog
          visible={isDialogVisible}
          onClose={closeDialog}
          onSave={handleSaveItem}
        />

      </View>

        {/* Items List */}
        <View style={styles.billContainer}>
          <Text style={styles.billHeader}>Items List</Text>
          <ScrollView style={styles.billContent}>
            <View>
              {items.map((item) => (
                <View key={item.id} style={styles.billRow}>
                  <Text style={styles.billItemName}>{item.name}</Text>
                  <Text style={styles.billItemPrice}>${item.price.toFixed(2)}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={openDialog}>
              <Text style={styles.addButtonText}>Add Items</Text>
            </TouchableOpacity>

          </ScrollView>
    
          <View style={styles.billFooter}>
            <Text style={styles.billTotalLabel}>Total:</Text>
            <Text style={styles.billTotalValue}>
              ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.billFooter}>
            <Text style={styles.billTotalLabel}>Tax {taxRate}%:</Text>
            <Text style={styles.billTotalValue}>
              ${items.reduce((sum, item) => (sum + item.price) * (1+taxRate), 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.billFooter}>
            <Text style={styles.billTotalLabel}>Tip {tipAmount}% :</Text>
            <Text style={styles.billTotalValue}>
              ${items.reduce((sum, item) => (sum + item.price) * (1+tipAmount), 0).toFixed(2)}
            </Text>
          </View>
        </View>


      

      {/* Assign Items Dialog */}
      <AssignItemsDialog
        visible={isItemAssignDialogVisible}
        onClose={() => setItemAssignDialogVisible(false)}
        items={items}
        onAssign={handleAssignItemToPerson}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Space between scrollable grid and footer
    padding: 20,
  },
  membersScroll: {
    paddingBottom: 20, // Extra padding to ensure scrolling feels smooth
  },
  membersLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  membersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  memberCard: {
    width: 100, // Card width
    height: 120, // Card height
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  billContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  billHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Courier', // Monospace font for a receipt-like appearance
  },
  billContent: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginVertical: 10,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  billItemName: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Courier', // Fixed-width font
  },
  billItemPrice: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Courier', // Fixed-width font
  },
  billFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  billTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Courier', // Fixed-width font
  },
  billTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Courier', // Fixed-width font
  },

  iconWrapper: {
    marginBottom: 10,
  },
  memberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  memberIcon: {
    width: 60,
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addMemberButtons: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrowButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  numberBox: {
    marginHorizontal: 10,
    padding: 10,
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  numberText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsList: {
    marginTop: 20,
  },
  assignButton: {
    padding: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginTop: 10,
  },
  assignButtonText: {
    color: 'white',
    fontSize: 12,
  },
  assignedItem: {
    fontSize: 12,
    color: '#555',
  },
});

export default HomeScreen;
