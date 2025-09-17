import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { groupMessagesByDate, formatDate } from "../../utils/formatDate";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && groupedMessages.length > 0 ? (
        groupedMessages.map((item, index) => {
          if (item.type === 'date') {
            return (
              <div key={item.id} className="flex justify-center my-2">
                <div className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                  {formatDate(item.date)}
                </div>
              </div>
            );
          }
          return (
            <div 
              key={item._id} 
              ref={index === groupedMessages.length - 1 ? lastMessageRef : null}
            >
              <Message message={item} />
            </div>
          );
        })
      ) : loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : (
        <p className='text-center text-gray-200 mt-4'>Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;