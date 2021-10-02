# Simple React Native App

We saw learned how to implement simple WebSockets in ReactNative. Full tutorial [here](https://www.youtube.com/watch?v=cfggyE1Ptbc&t=83s)

More UseFul Links here

- [https://www.youtube.com/watch?v=NU-HfZY3ATQ&t=516s](https://www.youtube.com/watch?v=NU-HfZY3ATQ&t=516s) Full Code [here](https://github.com/machadop1407/react-socketio-chat-app)
- [https://github.com/expo/examples/tree/master/with-socket-io](https://github.com/expo/examples/tree/master/with-socket-io)
- [https://brentmarquez.com/uncategorized/how-to-get-socket-io-to-work-with-react-native/](https://brentmarquez.com/uncategorized/how-to-get-socket-io-to-work-with-react-native/)
- [https://socket.io/docs/v4/](https://socket.io/docs/v4/)
- if you want to use pure js look at [How to implement WebSockets in React Native](https://blog.logrocket.com/how-to-implement-websockets-in-react-native/), [https://reactnative.dev/docs/network](https://reactnative.dev/docs/network), look at [here](https://github.com/hnasr/javascript_playground/blob/master/websocket-demo/index.js) as well
- [Writing WebSocket client applications](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)
- [https://github.com/socketio/socket.io/blob/master/examples/react-native/App.js](https://github.com/socketio/socket.io/blob/master/examples/react-native/App.js)

# Important TroubleShooting

- For android, if you want the websocket to connect correctly to your local server run `adb -s <device_name> reverse tcp:<SERVER_PORT> tcp:<SERVER_PORT>`. You will have to run this command for how may android devices you have connect to your laptop. See more explanation [here](https://github.com/storybook-eol/react-native-storybook/issues/107). For ios, you don't have to worry much about anything
- To see list of android devices connected to your computer run `adb devices`
- [https://reactnative.dev/docs/running-on-device#method-1-using-adb-reverse-recommended-2](https://reactnative.dev/docs/running-on-device#method-1-using-adb-reverse-recommended-2)
