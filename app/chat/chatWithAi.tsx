import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const chatWithAi= () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! Ask me anything.' },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { role: 'user', content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
          // Optional:
          // 'HTTP-Referer': '<YOUR_SITE_URL>',
          // 'X-Title': '<YOUR_SITE_NAME>',
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
          messages: [
            {
              "role" : 'user' ,
            "content" : `${inputText}`
          }
          ],
        }),
      });

      const data = await response.json();

        console.log(data);
        const aiMessage = data.choices[0].message;
        setMessages((prev) => [...prev, aiMessage]);
    
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.chatContainer}>
        <ScrollView style={styles.chatBox} contentContainerStyle={{ padding: 10 }}>
          {messages.length === 0 ? (
            <Text style={styles.placeholder}>Start chatting...</Text>
          ) : (
            messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text style={styles.messageText}>{msg.content}</Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            style={styles.textInput}
            multiline
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={loading}>
            <Text style={styles.sendButtonText}>{loading ? '...' : 'Send'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  chatContainer: {
    flex: 1,
  },
  chatBox: {
    flex: 1,
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  messageBubble: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007aff',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcdcdc',
    margin:30
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom:50
  },
  textInput: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default chatWithAi;
