import React from "react";
import { Message } from "../../types/Message";

function MessageDate({ message }: { message: Message }): JSX.Element {
  const date = JSON.parse(message.date);
  return (
    <div className="date">
      <p className="date-item">{date.year}</p>
      <p className="date-item">{date.month}</p>
      <p className="date-item">{date.day}</p>
    </div>
  );
}

export default MessageDate;
