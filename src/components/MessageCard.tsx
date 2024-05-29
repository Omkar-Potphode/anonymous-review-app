'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Message } from '@/models/User'
import axios from 'axios'
import { useToast } from './ui/use-toast'
import dayjs from 'dayjs'


type MessageCardProps ={
    message:Message;
    onMessageDelete: (messageId:string)=> void
}

const MessageCard = ({message , onMessageDelete}:MessageCardProps) => {
    
    const {toast} = useToast()
    
    const hendelDeleteConfirm = async() =>{
        const response = await axios.delete(`api/delete-message${message._id}`)
        toast({
            title:response.data.message
        })
        onMessageDelete(message._id)
    }
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>{message.content}</CardTitle>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive"><X className='w-5 h-5'/></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={hendelDeleteConfirm}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                <CardDescription>
                    {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
                </CardDescription>
            </CardHeader>
            
        </Card>
    </div>
  )
}

export default MessageCard