import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import io from "socket.io-client"; //must use for react native

const socketUrl = "http://127.0.0.1:3000"; //Run ifconfig on Mac or ipconfig on windows to get the ipAddress for your wifi
export default function App() {
  const socket = React.useRef(null);
  const [state, setState] = React.useState({
    isConnected: false, //ideally we will store this in our redux store :)
    chatMessage: "",
    chatMessages: [],
  });

  React.useEffect(() => {
    (async () => {
      socket.current = openSocket();

      socket.current.on("connect", () => onConnectionStateUpdate());
      socket.current.on("disconnect", () => onConnectionStateUpdate());

      /** Here we receive messages from our server through this socket connection*/
      socket.current.on("ping", (msg) => {
        setState((currState) => ({
          ...currState,
          chatMessages: [...currState.chatMessages, msg],
        }));
      });
    })();
    return () => {
      socket.current.off("connect");
      socket.current.off("disconnect");
      socket.current.off("ping");
    };
  }, []);

  const onConnectionStateUpdate = () => {
    setState((currState) => ({
      ...currState,
      isConnected: socket.current.connected,
    }));
  };

  const submitChatMessage = () => {
    //NOTE: that we use the 'emit' method to send messages
    socket.current.emit("chat_message", state.chatMessage);
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
            chatMessage /**ideally your will have your uniqueId for the chat message here :) */
          }
        >
          {chatMessage}
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
