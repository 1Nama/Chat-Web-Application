export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the date is today
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  
  // Check if the date is yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // Check if the date is within the last 7 days
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  if (date > lastWeek) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
  
  // For older dates, return the full date
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const groupMessagesByDate = (messages) => {
  if (!messages || messages.length === 0) return [];
  
  const groupedMessages = [];
  let currentDate = null;
  
  messages.forEach((message) => {
    const messageDate = new Date(message.createdAt).toDateString();
    
    if (currentDate !== messageDate) {
      currentDate = messageDate;
      groupedMessages.push({
        type: 'date',
        date: message.createdAt,
        id: `date-${messageDate}`
      });
    }
    
    groupedMessages.push({
      ...message,
      type: 'message'
    });
  });
  
  return groupedMessages;
};
