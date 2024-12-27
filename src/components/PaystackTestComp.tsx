import { useState } from "react"
import { PaystackButton } from "react-paystack"

export default function PaystackComp(){
    let publicKey = 'pk_test_01a7b1f00ce37286a6a3e7d6f9d3ebd29bed7d2b'
    const amount = 4500000
  const [email, setEmail] = useState("")
  const [name] = useState("")
  const [phone, setPhone] = useState("")

  const componentProps = {
    email,
    amount,
    currency: 'NGN',
    metadata: {
      name,
      phone,
      custom_fields: [
        {
            display_name: 'description',
            variable_name: 'description',
            value: 'Funding Wallet'
        }
        // To pass extra metadata, add an object with the same fields as above
    ]
    },
    publicKey,
    text: "Pay Now",
  }

    return(
        <>
        <form className="p-4 mx-2">
            <input type="text" name="email" id="email" className="block rounded-xl p-2 my-2 outline-none border-blue-300 border-2" autoFocus onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" name="phone_numb" id="phone_numb" className="block rounded-xl p-2 my-2 outline-none border-blue-300 border-4" onChange={(e)=> setPhone(e.target.value)}/>
        </form>
        <PaystackButton {...componentProps} className="bg-green-500 rounded-xl text-white p-2 font-bold" />
        </>
    )
}