// ================================================
// 💬 MESSAGES PAGE - Real-Time Chat Interface
// ================================================
// One-to-one chat using Socket.IO
// Premium minimalist design
// ================================================

// Import React and hooks
import React, { useState, useEffect, useRef } from 'react';

// Import navigation
import { useLocation } from 'react-router-dom';

// Import context hooks
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

// Import UI components
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// ================================================
// MESSAGES COMPONENT
// ================================================
function Messages() {
    const { user } = useAuth();
    const { socket } = useSocket();
    const location = useLocation();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // ============================================
    // EFFECT: Fetch Conversations & Handle "Contact Seller"
    // ============================================
    useEffect(function () {
        async function fetchConversations() {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const response = await fetch(`${apiUrl}/api/messages/conversations`, {
                    credentials: 'include'
                });
                const data = await response.json();

                if (data.success) {
                    setConversations(data.data);

                    // Handle "Contact Seller" redirection
                    if (location.state && location.state.recipient) {
                        const recipientId = location.state.recipient.id;
                        const existingConv = data.data.find(c => c.participant.id === recipientId);

                        if (existingConv) {
                            selectConversation(existingConv);
                        } else {
                            // If user not in list, create temp conversation
                            const tempConv = {
                                id: recipientId,
                                participant: {
                                    id: recipientId,
                                    name: location.state.recipient.name,
                                    status: 'online',
                                    avatar: location.state.recipient.avatar
                                },
                                lastMessage: {
                                    text: 'Start chatting...',
                                    timestamp: new Date()
                                },
                                unreadCount: 0
                            };
                            setConversations(prev => [tempConv, ...prev]);
                            selectConversation(tempConv);
                        }

                        // Pre-fill message if provided
                        if (location.state.message) {
                            setNewMessage(location.state.message);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching conversations:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchConversations();
    }, [location.state]); // Re-run if location state changes

    // ============================================
    // EFFECT: Focus Input when pre-filled
    // ============================================
    useEffect(function () {
        if (newMessage && inputRef.current) {
            inputRef.current.focus();
        }
    }, [newMessage]);

    // ============================================
    // EFFECT: Handle Socket Events
    // ============================================
    useEffect(function () {
        if (!socket) {
            return;
        }

        function handlePrivateMessage(message) {
            console.log('📩 Received message:', message);

            // Only update messages if it belongs to selected conversation
            if (selectedConversation &&
                (message.senderId === selectedConversation.participant.id || message.senderId === user.id)) {

                setMessages(function (prev) {
                    const exists = prev.some(m => (m._id || m.id) === (message._id || message.id));
                    if (exists) return prev;

                    return [...prev, {
                        ...message,
                        sender: message.senderId,
                        timestamp: new Date(message.timestamp)
                    }];
                });
            }

            // Always update last message in conversation list
            updateConversationLastMessage(message);
        }

        function handleTypingStart(data) {
            if (selectedConversation && data.senderId === selectedConversation.participant.id) {
                setIsTyping(true);
            }
        }

        function handleTypingStop(data) {
            if (selectedConversation && data.senderId === selectedConversation.participant.id) {
                setIsTyping(false);
            }
        }

        socket.on('private_message', handlePrivateMessage);
        socket.on('typing_start', handleTypingStart);
        socket.on('typing_stop', handleTypingStop);

        return function () {
            socket.off('private_message', handlePrivateMessage);
            socket.off('typing_start', handleTypingStart);
            socket.off('typing_stop', handleTypingStop);
        };
    }, [socket, selectedConversation, user]);

    useEffect(function () {
        scrollToBottom();
    }, [messages]);

    function updateConversationLastMessage(message) {
        setConversations(function (prev) {
            return prev.map(function (conv) {
                // Update if this conversation involves the sender or recipient
                if (conv.participant.id === message.senderId ||
                    conv.participant.id === message.recipientId) {
                    return {
                        ...conv,
                        lastMessage: {
                            text: message.text,
                            timestamp: new Date(message.timestamp)
                        }
                    };
                }
                return conv;
            });
        });
    }

    async function selectConversation(conversation) {
        setSelectedConversation(conversation);
        setMessages([]);
        setIsTyping(false);

        // Fetch history
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/messages/history/${conversation.participant.id}`, {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                setMessages(data.data.map(m => ({
                    ...m,
                    sender: m.senderId,
                    timestamp: new Date(m.createdAt || m.timestamp)
                })));
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    }

    function sendMessage(event) {
        event.preventDefault();

        const trimmedMessage = newMessage.trim();
        if (!trimmedMessage) {
            return;
        }

        if (!selectedConversation) {
            return;
        }

        if (!socket) {
            console.error('Socket not connected');
            return;
        }

        const currentUserId = user ? user.id : 'unknown';
        const messageId = Date.now().toString();
        const timestamp = new Date().toISOString();

        // Optimistically add message
        setMessages(function (prev) {
            return [...prev, {
                id: messageId,
                sender: currentUserId,
                text: trimmedMessage,
                timestamp: new Date(timestamp)
            }];
        });

        // Send via socket
        socket.emit('private_message', {
            id: messageId,
            senderId: currentUserId,
            recipientId: selectedConversation.participant.id,
            text: trimmedMessage,
            timestamp: timestamp
        });

        // Update list immediately
        updateConversationLastMessage({
            senderId: currentUserId,
            recipientId: selectedConversation.participant.id,
            text: trimmedMessage,
            timestamp: timestamp
        });

        setNewMessage('');

        socket.emit('typing_stop', {
            senderId: currentUserId,
            recipientId: selectedConversation.participant.id
        });
    }

    function handleMessageChange(event) {
        setNewMessage(event.target.value);

        if (socket && selectedConversation) {
            const currentUserId = user ? user.id : 'unknown';
            if (event.target.value.length > 0) {
                socket.emit('typing_start', {
                    senderId: currentUserId,
                    recipientId: selectedConversation.participant.id
                });
            } else {
                socket.emit('typing_stop', {
                    senderId: currentUserId,
                    recipientId: selectedConversation.participant.id
                });
            }
        }
    }

    function scrollToBottom() {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function formatTime(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function getStatusColor(status) {
        if (status === 'online') {
            return 'bg-green-500';
        }
        if (status === 'away') {
            return 'bg-yellow-500';
        }
        return 'bg-neutral-400';
    }

    function getParticipantInitial(name) {
        if (name && name.length > 0) {
            return name.charAt(0).toUpperCase();
        }
        return '?';
    }

    function isOwnMessage(message) {
        const currentUserId = user ? user.id : '';
        const senderId = message.senderId || message.sender;
        return senderId === currentUserId;
    }

    // ============================================
    // RENDER
    // ============================================
    return (
        <div className="min-h-screen bg-neutral-50 pt-24">
            <div className="container-custom pb-8">
                <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Messages</h1>

                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm" style={{ height: '70vh' }}>
                    <div className="flex h-full">

                        {/* Conversations List */}
                        <div className="w-1/3 border-r border-neutral-200 overflow-y-auto">

                            {/* Search Box */}
                            <div className="p-4 border-b border-neutral-200">
                                <Input
                                    type="search"
                                    placeholder="Search conversations..."
                                />
                            </div>

                            {/* Conversation Items */}
                            {conversations.length === 0 ? (
                                <div className="p-8 text-center text-neutral-400 text-sm">
                                    No users found.
                                </div>
                            ) : (
                                conversations.map(function (conversation) {
                                    const isSelected = selectedConversation && selectedConversation.id === conversation.id;

                                    return (
                                        <div
                                            key={conversation.id}
                                            onClick={function () { selectConversation(conversation); }}
                                            className={
                                                'p-4 cursor-pointer hover:bg-neutral-50 border-b border-neutral-100 transition-colors ' +
                                                (isSelected ? 'bg-neutral-100' : '')
                                            }
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* Avatar */}
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-semibold text-lg overflow-hidden">
                                                        {conversation.participant.avatar ? (
                                                            <img src={conversation.participant.avatar} alt={conversation.participant.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            getParticipantInitial(conversation.participant.name)
                                                        )}
                                                    </div>
                                                    <div className={'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ' + getStatusColor(conversation.participant.status)}></div>
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-medium text-neutral-900 truncate">
                                                            {conversation.participant.name}
                                                        </h3>
                                                        <span className="text-xs text-neutral-400">
                                                            {formatTime(conversation.lastMessage.timestamp)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-neutral-500 truncate">
                                                        {conversation.lastMessage.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 flex flex-col">

                            {selectedConversation ? (
                                <>
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-semibold overflow-hidden">
                                            {selectedConversation.participant.avatar ? (
                                                <img src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} className="w-full h-full object-cover" />
                                            ) : (
                                                getParticipantInitial(selectedConversation.participant.name)
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="font-medium text-neutral-900">
                                                {selectedConversation.participant.name}
                                            </h2>
                                            <span className="text-xs text-neutral-500">
                                                {isTyping ? 'Typing...' : 'Online'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
                                        {messages.length === 0 && (
                                            <div className="text-center text-neutral-400 py-12">
                                                <p>No messages yet.</p>
                                                <p className="text-sm mt-2">Send a message to start the conversation!</p>
                                            </div>
                                        )}

                                        {messages.map(function (message) {
                                            const ownMessage = isOwnMessage(message);

                                            return (
                                                <div
                                                    key={message.id}
                                                    className={'flex ' + (ownMessage ? 'justify-end' : 'justify-start')}
                                                >
                                                    <div
                                                        className={
                                                            'max-w-[70%] rounded-2xl px-4 py-2 ' +
                                                            (ownMessage
                                                                ? 'bg-neutral-900 text-white rounded-tr-none'
                                                                : 'bg-white text-neutral-900 rounded-tl-none border border-neutral-200')
                                                        }
                                                    >
                                                        <p>{message.text}</p>
                                                        <span className={'text-xs mt-1 block ' + (ownMessage ? 'text-neutral-400' : 'text-neutral-400')}>
                                                            {formatTime(message.timestamp)}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Scroll anchor */}
                                        <div ref={messagesEndRef}></div>
                                    </div>

                                    {/* Message Input */}
                                    <div className="p-4 border-t border-neutral-200 bg-white">
                                        <form onSubmit={sendMessage} className="flex gap-2">
                                            <Input
                                                ref={inputRef}
                                                type="text"
                                                value={newMessage}
                                                onChange={handleMessageChange}
                                                placeholder="Type a message..."
                                                className="flex-1"
                                            />
                                            <Button type="submit" variant="primary">
                                                Send
                                            </Button>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                // No conversation selected
                                <div className="flex-1 flex items-center justify-center text-neutral-400">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 mx-auto mb-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-neutral-900 mb-2">
                                            Select a conversation
                                        </h3>
                                        <p className="text-neutral-500">
                                            Choose a conversation from the list to start messaging
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the component
export default Messages;

