package com.google.firebase.codelab.friendlychat;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.provider.Telephony;
import android.telephony.SmsManager;

/**
 * Created by Dhruv on 11/8/2016.
 */

public class SendSMS extends Thread {
    public Handler mHandler;


    //---sends an SMS message to another device---
    public void sendSMS(String phoneNumber, String message) {
        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(phoneNumber, null, message, null, null);

    }

}