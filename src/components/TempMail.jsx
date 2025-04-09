import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Temp Mail API
const API_KEY = 'd7669af8f1mshe84c78539dc02d3p1cc6fdjsn4c0f9d6cdb30';
const API_HOST = 'temp-mail-api3.p.rapidapi.com';

const TempMail = () => {
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success('Email copied to clipboard!');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">🕵️ Temp Mail Viewer</h1>
          <p className="text-gray-300 text-sm md:text-base">Generate disposable emails and view inbox instantly</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={generateEmail}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-all text-sm md:text-base"
          >
            Generate Email
          </button>

          {email && (
            <div className="bg-gray-800 px-4 py-2 rounded-lg flex flex-col sm:flex-row items-center gap-2">
              <span className="text-green-400 text-sm break-all">{email}</span>
              <div className="flex gap-2 mt-1 sm:mt-0">
                <button
                  onClick={copyEmail}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                >
                  Copy
                </button>
                <button
                  onClick={fetchMessages}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                >
                  Fetch Messages
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center my-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="mt-2 text-gray-400">Fetching messages...</p>
          </div>
        )}

        {/* Message List */}
        {!loading && email && (
          <>
            {messages.length === 0 ? (
              <div className="text-center text-gray-400">No messages found for this email.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-all"
                  >
                    <p><strong>From:</strong> {msg.from}</p>
                    <p><strong>Subject:</strong> {msg.subject}</p>
                    <button
                      onClick={() => fetchMessageById(msg.id)}
                      className="mt-3 bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm"
                    >
                      View Message
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Selected Message Content */}
        {selectedMessage && (
          <div className="bg-gray-900 p-6 rounded-lg mt-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">📨 Full Message</h2>
            <p className="mb-2"><strong>From:</strong> {selectedMessage.sender_email}</p>
            <p className="mb-2"><strong>Subject:</strong> {selectedMessage.subject}</p>
            <div className="bg-gray-800 p-4 mt-4 rounded-lg max-h-[400px] overflow-y-auto">
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

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default TempMail;
