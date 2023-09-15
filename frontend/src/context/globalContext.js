import React, { useContext, useState } from "react"
import axios from 'axios'
import Expenses from "../Components/Expenses/Expenses";

const BASE_URL = "http://localhost:3000/api/v1/";


  const GlobalContext = React.createContext()
  
  export const GlobalProvider = ({ children }) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)


    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.massage)
            })
            getIncomes()
    }
 
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
         console.log(response.data)
    }
    
    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }
  

    const totalIncome = () =>{
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

         return totalIncome;
          }


         //calcualte incomes
         const addExpense = async (income) => {
            const response = await axios.post(`${BASE_URL}add-expense`, income)
                .catch((err) => {
                    setError(err.response.data.massage)
                })
                getExpenses()
        }
     
        const getExpenses = async () => {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            setExpenses(response.data)
             console.log(response.data)
        }
        
        const deleteExpense = async (id) => {
            const res  = await axios.delete(`${BASE_URL}delete-expenses/${id}`)
            getExpenses()
        }
        
        const totalExpenses = () => {
            let totalIncome = 0;
            expenses.forEach((income) =>{
                totalIncome = totalIncome + income.amount
            })
             return totalIncome;
              
            }
         const totalBalance= ()=>{
            return totalIncome() -totalExpenses()

         }
           const transactionsHistory = () =>{
            const history =[...incomes,...expenses]
            history.sort((a,b)=>{
                return new Date(b.createdAt)-new Date(a.createdAt)
            })

          return history.slice(0,3)

           }
            
    return (
         <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionsHistory,
            error

      }}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}











