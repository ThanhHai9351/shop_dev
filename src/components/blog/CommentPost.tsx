import { useState } from "react"
import { User, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const CommentPost = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "Nguyen Van A",
      content: "Bài viết rất hay và bổ ích!",
      timestamp: "10 phút trước",
    },
    {
      id: 2,
      username: "Tran Thi B",
      content: "Cảm ơn bạn đã chia sẻ!",
      timestamp: "5 phút trước",
    },
  ])
  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        username: "Người dùng mới",
        content: newComment,
        timestamp: "Vừa xong",
      }
      setComments([...comments, newCommentObj])
      setNewComment("")
    }
  }

  return (
    <div className='p-4 bg-white rounded-lg shadow-md mx-auto w-full'>
      <h2 className='text-lg font-semibold mb-4'>Bình luận</h2>

      <div className='space-y-4 max-h-60 overflow-y-auto mb-4'>
        {comments.map((comment) => (
          <div key={comment.id} className='flex items-start space-x-3'>
            <User className='w-6 h-6 text-gray-400' />
            <div>
              <h3 className='text-sm font-medium'>{comment.username}</h3>
              <p className='text-sm text-gray-700'>{comment.content}</p>
              <span className='text-xs text-gray-500'>{comment.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center space-x-2'>
        <input
          type='text'
          placeholder='Viết bình luận...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='flex-1 p-2 border rounded-lg focus:outline-none'
        />
        <Button size='icon' variant='secondary' onClick={handleAddComment}>
          <Send className='w-5 h-5 text-blue-500' />
        </Button>
      </div>
    </div>
  )
}

export default CommentPost
