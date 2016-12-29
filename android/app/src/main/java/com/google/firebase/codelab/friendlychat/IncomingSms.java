package com.google.firebase.codelab.friendlychat;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.telephony.SmsMessage;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

/**
 * Created by Dhruv on 11/8/2016.
 */

public class IncomingSms extends BroadcastReceiver {

    //final SmsManager sms = SmsManager.getDefault();
    public static final String MESSAGES_CHILD = "TestUser";
    private FirebaseAnalytics mFirebaseAnalytics;
    private static final String MESSAGE_SENT_EVENT = "message_sent";
    private static final String TAG = "Incomingsms";
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG,"recived sms");
        DatabaseReference mFirebaseDatabaseReference;
        mFirebaseDatabaseReference = FirebaseDatabase.getInstance().getReference();
        String num = "";
        String body = "";
        //mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);

        Bundle myBundle = intent.getExtras();
        SmsMessage [] messages = null;
        String strMessage = "";

        if (myBundle != null)
        {
            Object [] pdus = (Object[]) myBundle.get("pdus");

            messages = new SmsMessage[pdus.length];

            for (int i = 0; i < messages.length; i++) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    String format = myBundle.getString("format");
                    messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i], format);
                }
                else {
                    messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
                }
                if(i == 0){
                    num +=messages[i].getOriginatingAddress();
                }
                body += messages[i].getMessageBody();
                strMessage += "SMS From: " + messages[i].getOriginatingAddress();
                strMessage += " : ";
                strMessage += messages[i].getMessageBody();
                strMessage += "\n";
            }

            FriendlyMessage friendlyMessage = new FriendlyMessage(num,body);
            //Log.d(TAG,friendlyMessage.getDevideID());
            //mFirebaseDatabaseReference.child(MESSAGES_CHILD).push().setValue(friendlyMessage);
            //mFirebaseAnalytics.logEvent(MESSAGE_SENT_EVENT, null);

            //Log.e("SMS", strMessage);
            //Toast.makeText(context, strMessage, Toast.LENGTH_SHORT).show();
        }
    }

}
