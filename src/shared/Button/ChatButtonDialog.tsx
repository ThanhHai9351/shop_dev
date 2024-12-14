import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetOverlay } from "@/components/ui/sheet"
import ChatMain from "@/components/chat/chat-main"

const ChatButtonDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openSheet = () => setIsOpen(true)

  return (
    <div>
      <div className='fixed bottom-4 right-4'>
        <Button
          variant='secondary'
          size='icon'
          className='rounded-full shadow-lg p-4 bg-blue-500 hover:bg-blue-600 text-white'
          aria-label='Chat'
          onClick={openSheet}
        >
          <MessageCircle className='w-6 h-6' />
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetOverlay className='fixed inset-0 bg-black bg-opacity-25' />
        <SheetContent className='fixed top-0 bottom-0 right-0 w-80 max-w-full bg-white rounded-l-lg shadow-lg p-4'>
          <div className='flex items-center justify-between border-b pb-2 mb-4'>
            <h2 className='text-lg font-semibold'>Chat với Shop</h2>
          </div>
          <ChatMain />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default ChatButtonDialog
