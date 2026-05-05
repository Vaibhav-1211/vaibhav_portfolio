import { useMessages } from '../../hooks/queries';
import { useMarkMessageRead } from '../../hooks/mutations';
import { Mail, MailOpen, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const MessagesInbox = () => {
  const { data: messages, isLoading } = useMessages();
  const markReadMutation = useMarkMessageRead();

  const handleMarkRead = (id: string) => {
    markReadMutation.mutate(id, {
      onSuccess: () => toast.success('Marked as read')
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Messages Inbox</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {messages && messages.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {messages.map((message) => (
              <div key={message._id} className={`p-6 transition-colors ${message.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50/50 dark:bg-blue-900/10'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${message.read ? 'bg-gray-100 dark:bg-gray-700 text-gray-500' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'}`}>
                      {message.read ? <MailOpen className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className={`text-lg ${message.read ? 'font-medium text-gray-700 dark:text-gray-300' : 'font-bold text-gray-900 dark:text-white'}`}>
                        {message.name}
                      </h3>
                      <a href={`mailto:${message.email}`} className="text-sm text-blue-600 hover:underline">{message.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className={`mt-4 text-gray-600 dark:text-gray-300 whitespace-pre-wrap ${message.read ? '' : 'font-medium'}`}>
                  {message.message}
                </div>

                {!message.read && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button
                      onClick={() => handleMarkRead(message._id)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Mark as Read
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <MailOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Your inbox is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesInbox;
