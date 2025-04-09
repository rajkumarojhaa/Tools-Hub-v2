import React, { useState } from 'react';
import axios from 'axios';

const TempMail = () => {
  const [email, setEmail] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState('');

  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  const createTempMail = async () => {
    setLoading(true);
    setError('');
    setEmail('');
    setExpiresAt('');
    setMessages([]);
    setMessageError('');

    try {
      const response = await axios.request({
        method: 'POST',
        url: 'https://flash-temp-mail.p.rapidapi.com/mailbox/create',
        params: {
          free_domains: 'false',
        },
        headers: {
          'x-rapidapi-key': '6131edcb4cmsh23ebb63bba81107p1b37d5jsn13862f0d1d3f',
          'x-rapidapi-host': 'flash-temp-mail.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        data: {
          not_required: 'not_required',
        },
      });

      const { email_address, expires_at } = response.data;
      setEmail(email_address);
      setExpiresAt(new Date(expires_at * 1000).toLocaleString());

      // Automatically fetch messages after email is created
      fetchMessages(email_address);
    } catch (err) {
      console.error('Error generating email:', err);
      setError('Failed to create temporary email. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (generatedEmail) => {
    setMessageLoading(true);
    setMessageError('');
    setMessages([]);

    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://flash-temp-mail.p.rapidapi.com/mailbox/email',
        params: { email_address: generatedEmail },
        headers: {
          'x-rapidapi-key': '6131edcb4cmsh23ebb63bba81107p1b37d5jsn13862f0d1d3f',
          'x-rapidapi-host': 'flash-temp-mail.p.rapidapi.com',
        },
      });

      setMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessageError('Failed to fetch messages. Try again.');
    } finally {
      setMessageLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Flash Temp Mail</h2>

      {error && <p className="text-red-600">{error}</p>}

      {email && (
        <div className="mb-4 text-gray-700">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Expires At:</strong> {expiresAt}</p>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        <button
          onClick={createTempMail}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Generating...' : email ? 'Generate New Email' : 'Generate Email'}
        </button>

        {email && (
          <button
            onClick={handleCopy}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {copySuccess ? 'Copied!' : 'Copy Email'}
          </button>
        )}
      </div>

      {email && (
        <div className="mt-6 text-left">
          <h3 className="text-xl font-semibold mb-2">Inbox</h3>
          {messageLoading ? (
            <p className="text-gray-600">Fetching messages...</p>
          ) : messageError ? (
            <p className="text-red-600">{messageError}</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-600">No messages found yet.</p>
          ) : (
            <ul className="space-y-2">
              {messages.map((msg, idx) => (
                <li key={idx} className="border rounded p-3 bg-gray-100">
                  <p><strong>From:</strong> {msg.from}</p>
                  <p><strong>Subject:</strong> {msg.subject}</p>
                  <p className="text-sm text-gray-700 mt-2">{msg.body_text || 'No preview available.'}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TempMail;
