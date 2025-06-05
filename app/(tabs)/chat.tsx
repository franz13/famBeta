import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Send, Calendar, Bell } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface Message {
  id: number;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'Mama',
    senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    content: 'Cine poate merge să cumpere pâine?',
    timestamp: '10:30'
  },
  {
    id: 2,
    sender: 'Andrei',
    senderAvatar: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
    content: 'Eu pot merge după ce termin temele!',
    timestamp: '10:32'
  },
  {
    id: 3,
    sender: 'Tata',
    senderAvatar: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=300',
    content: 'Super, mulțumim Andrei! Nu uita să iei și lapte.',
    timestamp: '10:35'
  }
];

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'Andrei',
        senderAvatar: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
        content: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Calendar size={24} color={colors.primary} />
          <Text style={styles.headerButtonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Bell size={24} color={colors.primary} />
          <Text style={styles.headerButtonText}>Notificări</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageWrapper,
              msg.sender === 'Andrei' ? styles.myMessage : styles.otherMessage
            ]}
          >
            {msg.sender !== 'Andrei' && (
              <Image source={{ uri: msg.senderAvatar }} style={styles.avatar} />
            )}
            <View style={[
              styles.messageBubble,
              msg.sender === 'Andrei' ? styles.myBubble : styles.otherBubble
            ]}>
              {msg.sender !== 'Andrei' && (
                <Text style={styles.senderName}>{msg.sender}</Text>
              )}
              <Text style={[
                styles.messageText,
                msg.sender === 'Andrei' ? styles.myMessageText : styles.otherMessageText
              ]}>
                {msg.content}
              </Text>
              <Text style={styles.timestamp}>{msg.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Scrie un mesaj..."
          placeholderTextColor={colors.textLight}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled
          ]} 
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} color={message.trim() ? 'white' : colors.textLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  headerButtonText: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.primary,
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  messageText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  myMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: colors.text,
  },
  timestamp: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E9EEF4',
  },
});