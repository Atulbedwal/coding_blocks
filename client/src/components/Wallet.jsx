'use client'

import { useEffect, useState } from 'react'
import { api, setAuthToken } from '../api/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Wallet as WalletIcon } from 'lucide-react'
import { getWallet, addMoneyToWallet } from '../api/wallet';

// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from '@/components/ui/popover'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"


const Wallet = () => {
  const [wallet, setWallet] = useState(null)
  const [amount, setAmount] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [canRecharge, setCanRecharge] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
      fetchWallet()
    }
  }, [])

  const fetchWallet = async () => {
    try {
      const walletData = await getWallet();
      setWallet(walletData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleRecharge = async () => {
    const rechargeAmount = parseFloat(amount);
    if (isNaN(rechargeAmount) || rechargeAmount <= 0 || !wallet) return;
  
    try {
      await addMoneyToWallet(rechargeAmount);
      await fetchWallet();
      setAmount('');
      setIsDialogOpen(false);
      setCanRecharge(false);
  
      setTimeout(() => {
        setCanRecharge(true);
      }, 10_000);
    } catch (error) {
      console.error('Recharge failed:', error);
    }
  };
  
  // const handleButtonClick = () => {
  //   console.log("Add Money Button Clicked")
  //   setIsDialogOpen(true) // Open the dialog on click
  // }

  return (
    <Card>
  <CardHeader className="pb-2">
    <CardTitle className="flex items-center">
      <WalletIcon className="h-5 w-5 mr-2" />
      My Wallet
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-center py-4">
      {wallet ? (
        <>
          <p className="text-sm text-gray-500 mb-1">Current Balance</p>
          <p className="text-4xl font-bold">₹{wallet.balance.toFixed(2)}</p>
          {!canRecharge && (
            <p className="text-xs text-amber-600 mt-2">
              Recharge available in 24 hours
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500">Loading wallet...</p>
      )}
    </div>
  </CardContent>
  <CardFooter className="relative">
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={!canRecharge}
        >
          Add Money
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle>Recharge Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleRecharge}>Add Money</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </CardFooter>
</Card>
  )
}

export default Wallet