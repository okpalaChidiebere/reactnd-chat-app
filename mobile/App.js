import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const socketUrl = "ws://127.0.0.1:3000"; //Run ifconfig on Mac or ipconfig on windows to get the ipAddress for your wifi
const CHAT_ACTION = "chat_message";
export default function App() {
  const socket = React.useRef(null);
  const [state, setState] = React.useState({
    isConnected: false, //ideally we will store this in our redux store :)
    chatMessage: "",
    chatMessages: [],
  });

  React.useEffect(() => {
    (async () => {
      socket.current = new WebSocket(socketUrl);

      socket.current.onopen = () => {
        onConnectionStateUpdate();

        //socket.current.send("something"); // send a message
      };

      //listen for whenever we receive messages
      socket.current.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        var time = new Date(msg.date);

        switch (msg.type) {
          case "id":
            //clientID = msg.id;
            //setUsername();
            break;
          case CHAT_ACTION:
            setState((currState) => ({
              ...currState,
              chatMessages: [...currState.chatMessages, msg],
            }));
            break;
        }
      };

      socket.current.onerror = (e) => {
        // an error occurred
        console.log(e.message);
      };

      socket.current.onclose = (e) => {
        onConnectionStateUpdate();
        // connection closed
        console.log(e.code, e.reason);
      };
    })();
    return () => {
      socket.current.close();
    };
  }, []);

  const onConnectionStateUpdate = () => {
    if (socket.current.readyState === socket.current.CLOSED) {
      setState((currState) => ({
        ...currState,
        isConnected: false,
      }));
    } else if (socket.current.readyState === socket.current.OPEN) {
      setState((currState) => ({
        ...currState,
        isConnected: true,
      }));
    }
  };

  const submitChatMessage = () => {
    const msg = {
      type: CHAT_ACTION,
      text: state.chatMessage,
      //id: clientID,
      date: Date.now(),
    };
    socket.current.send(JSON.stringify(msg));

    setState((currState) => ({
      ...currState,
      chatMessage: "",
    }));
  };

  const { chatMessage, chatMessages } = state;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={{ height: 40, borderWidth: 2 }}
        autoCorrect={false}
        value={chatMessage}
        onSubmitEditing={() => submitChatMessage()} //when we press the enter key, then we run the submitChatMessage method
        onChangeText={(chatMessage) => {
          setState((currState) => ({
            ...currState,
            chatMessage,
          }));
        }}
      />
      {chatMessages.map((chatMessage) => (
        <Text
          key={
            `${chatMessage.date}` /**ideally your will have your uniqueId for the chat message here :) */
          }
        >
          {chatMessage.text}
        </Text>
      ))}
    </View>
  );
}

function openSocket() {
  const conn = io(socketUrl, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
  });
  return conn;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
  },
});
