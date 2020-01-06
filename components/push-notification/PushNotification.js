import React from "react";
import PushNoti from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
export default class PushNotification extends React.PureComponent {
  _scheduleNotification = notification => {
    notification.localNotificationSchedule({});
  };

  componentDidMount() {
    PushNoti.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        // console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        // process the notification
        // PushNoti.cancelLocalNotifications({ id: "123" });
        // PushNoti.localNotificationSchedule({
        // //   id: "123",
        //   title: "Notification Title",
        //   message: "Notification Message",
        //   date: new Date(Date.now() + 5 * 1000)
        // });

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "YOUR GCM (OR FCM) SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: false
    });

    PushNoti.scheduleLocalNotification({
    //   id: "123",
      title: "Notification Title",
      message: "Notification Message",
    //   repeat
      date: new Date(Date.now() + 5 * 1000)
    });

    // PushNoti.requestPermissions()
    //   .then(res => console.log(res))
    //   .catch(err => {});

    // PushNoti.checkPermissions(res => console.log(res))
  }

  componentWillUnmount() {
    PushNoti.clearAllNotifications();
  }

  render() {
    return <></>;
  }
}
