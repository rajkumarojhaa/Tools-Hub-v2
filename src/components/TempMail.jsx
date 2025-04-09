import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = '6131edcb4cmsh23ebb63bba81107p1b37d5jsn13862f0d1d3f';
const API_HOST = 'temp-mail-api3.p.rapidapi.com';

const TempMail = () => {
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate a random email
  const generateEmail = async () => {
    try {
      const response = await axios.get('https://temp-mail-api3.p.rapidapi.com/email/random', {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      });
      const generatedEmail = response.data.email;
      setEmail(generatedEmail);
      setMessages([]);
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error generating email:', error);
    }
  };

  // Copy email to clipboard
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success('Email copied to clipboard!');
  };

  // Fetch all messages for the email
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://temp-mail-api3.p.rapidapi.com/messages/${email}`,
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
          },
        }
      );
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific message by ID
  const fetchMessageById = async (messageId) => {
    try {
      const response = await axios.get(
        `https://temp-mail-api3.p.rapidapi.com/message/${email}/${messageId}`,
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
          },
        }
      );
      setSelectedMessage(response.data);
    } catch (error) {
      console.error('Error fetching message by ID:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white bg-[#111827] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🕵️ Temp Mail Viewer</h1>

      <button
        onClick={generateEmail}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
      >
        Generate Random Email
      </button>

      {email && (
        <div className="mb-4">
          <p className="text-lg font-semibold">
            📩 Email: <span className="text-green-400">{email}</span>
            <button
              onClick={copyEmail}
              className="ml-4 bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-sm"
            >
              Copy
            </button>
          </p>
          <button
            onClick={fetchMessages}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Fetch Messages
          </button>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-2">Fetching messages...</p>
        </div>
      )}

      {!loading && messages.length === 0 && email && (
        <div className="text-gray-400 mt-4">No messages found for this email.</div>
      )}

      {!loading && messages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">📬 Inbox Messages:</h2>
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li key={msg.id} className="bg-gray-800 p-4 rounded">
                <p><strong>From:</strong> {msg.from}</p>
                <p><strong>Subject:</strong> {msg.subject}</p>
                <button
                  onClick={() => fetchMessageById(msg.id)}
                  className="mt-2 bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-white"
                >
                  View Message
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedMessage && (
        <div className="bg-gray-900 p-6 rounded mt-4 text-white">
          <h2 className="text-xl font-bold mb-2">📨 Full Message</h2>
          <p><strong>From:</strong> {selectedMessage.sender_email}</p>
          <p><strong>Subject:</strong> {selectedMessage.subject}</p>

          <div className="bg-gray-800 p-4 mt-3 rounded">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  selectedMessage.htmlBody ||
                  selectedMessage.content ||
                  '<p>No content</p>',
              }}
            />
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TempMail;
