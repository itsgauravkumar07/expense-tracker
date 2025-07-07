import { useEffect, useState } from "react";


function ExpenseTracker(){

    //useState for for filter
    const [selectedCategory, setSelectedCategory] = useState("all");


    //useState for Handle all expenses
    const [expenses, setExpenses] = useState([]);

    //It check when the component mount the data store in localstorage if yes than display that!! 
    useEffect((() =>{
            const data = localStorage.getItem("expenses");
            if(data){
                setExpenses(JSON.parse(data));
            }
    }), []);


    //useState for error
    const [titleError, setTitleError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [dateError, setDateError] = useState("");


    //useState for input fields
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");


    //Read typed value in input field
    const inputTitle = (e) =>{ setTitle(e.target.value); }
    const inputAmount = (e) =>{ setAmount(e.target.value); }
    const inputCategory = (e) =>{ setCategory(e.target.value); }
    const inputDate = (e) =>{ setDate(e.target.value); }
    

    //Add function
    const add = () =>{

        //for form validation
        if(title.trim() === ""){
          setTitleError("Title field is empty");
        } else if(amount.trim() === ""){
            setAmountError("Enter Amount");
        } else if(category.trim() === ""){
            setCategoryError("Enter Category");
        } else if(date.trim() === ""){
            setDateError("Select date");
        } else {
            
            const newExpense = {title, amount, category, date};
            const updatedExpenses = [...expenses, newExpense];
            setExpenses(updatedExpenses);
            
            localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    
            //clear all input fields after expense added to the list
            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");

            //Clear all error message
            setTitleError("");
            setAmountError("");
            setCategoryError("");
            setDateError("");
        }
    }



    //Clear all data from expense list
    const clearAll = () =>{
        const clear = setExpenses([]);
        localStorage.setItem(clear, '');
    }

    //Delete expense from expense list
    const deleteExpense = (index) =>{
       const updatedExpenseList = expenses.filter((_, i) => i !== index);
       setExpenses(updatedExpenseList);
        localStorage.setItem("expenses", JSON.stringify(updatedExpenseList));
    }

    //Show Summary
        const totalAmount = expenses.reduce((acc, curr) => acc+ Number(curr.amount),0);
        const totalItems = expenses.length;


    //Filter 
    const filterdExpenses = expenses.filter(expense => {
        return selectedCategory === "all" || expense.category === selectedCategory;
    })
       

    return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
        <div className="max-w-3xl mx-auto space-y-8 bg-white m-5 p-2 shadow rounded">
            <h2 className="flex justify-center text-2xl font-bold text-blue-600">Expense Tracker</h2>
           
            <div className="bg-blue-100 rounded p-4 m-6 shadow">
                <h2 className="font-medium">Summary</h2>
                <p className="font-light">Total Expenses: ₹{totalAmount}</p>
                <p className="font-light">Total Items: {totalItems}</p>
            </div>

              
             <div className="m-6">
                <h3 className="font-medium">Add Expense</h3>
                <form className="mt-4">

                    <label className="font-semibold">Title</label><br />
                    <input 
                    type="text"
                    placeholder="Enter expense Title"
                    onChange={inputTitle}
                    value={title}
                    className="border w-full rounded p-2"
                    /> <br /> {titleError}<br />

                    <label className="font-semibold">Amount</label><br />
                    <input 
                    type="number"
                    placeholder="Enter amount"
                    onChange={inputAmount}
                    value={amount}
                    className="border w-full rounded p-2"
                    /> <br />{amountError}<br />

                    <label className="font-semibold">Category</label>
                    <select onChange={inputCategory} value={category} className="border w-full rounded p-2">
                        <option value="" >Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                    <br />{categoryError}<br />

                    <label className="font-semibold">Date</label>
                    <input 
                    type="date"
                    onChange={inputDate}
                    value={date}
                    className="border w-full rounded p-2"
                    /><br />{dateError}<br />
                </form>

                    <button onClick={add} 
                    className="bg-blue-600 p-2 rounded text-white hover:bg-blue-700"
                    >Add Expense</button><br /> <br />
             </div>
                    <div className="m-6">
                        <div className="flex justify-between">
                            <h3 className="font-medium">All Expenses</h3> 
                            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className="border rounded">
                                <option value="all">All</option>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Shopping">Shopping</option>
                            </select>
                        </div>
                        
                    {filterdExpenses.length === 0 ? (
                        <p className="text-gray-500">No expenses found.</p>
                    ) : (
                        <div className="mt-4">
                        <ul className="space-y-2">
                        {filterdExpenses.map((expense, index) => (
                            <li key={index} 
                            className="flex justify-between items-center shadow-sm  bg-gray-200 p-2 rounded ">
                                <span>
                                     {expense.title}   -   ₹{expense.amount}   -   {expense.category}   -   {expense.date}
                                </span>
                            
                            <button onClick={() => deleteExpense(index)}
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"    
                            >Delete</button>
                            </li>
                            
                        ))}
                     </ul>
                    </div>
                    )}
                    
                    
                    <button onClick={clearAll}
                    className="bg-red-500 text-white rounded p-1 mt-2.5 hover:bg-red-600">Clear all</button>
                     </div>
            
     </div>
    </div>
    )
}

export default ExpenseTracker;