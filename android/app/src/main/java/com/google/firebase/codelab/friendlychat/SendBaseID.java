package com.google.firebase.codelab.friendlychat;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Dhruv on 11/6/2016.
 */

public class SendBaseID extends AsyncTask<String, Void, Void> {
    private static final String TAG = "SendBaseID";

    @Override
    protected Void doInBackground(String... strings) {
        StringBuilder sb = new StringBuilder();
        JSONObject js = new JSONObject();
        String json = "";
        String http = "http://192.168.0.109:8080/";
        HttpURLConnection urlConnection=null;
        try {
            js.put("ID","IDa");
            js.put("token",strings[0]);
            json = js.toString();

            URL url = new URL(http);
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoOutput(true);
            urlConnection.setRequestMethod("POST");
            urlConnection.setUseCaches(false);
            urlConnection.setConnectTimeout(10000);
            urlConnection.setReadTimeout(10000);
            urlConnection.setRequestProperty("Content-Type","application/json");
            urlConnection.setRequestProperty("Host", "android.schoolportal.gr");
            urlConnection.connect();
            OutputStreamWriter out = new   OutputStreamWriter(urlConnection.getOutputStream());
            out.write(json);
            out.close();


            int HttpResult =urlConnection.getResponseCode();
            if(HttpResult ==HttpURLConnection.HTTP_OK){
                BufferedReader br = new BufferedReader(new InputStreamReader(
                        urlConnection.getInputStream(),"utf-8"));
                String line = null;
                while ((line = br.readLine()) != null) {
                    sb.append(line + "\n");
                }
                br.close();

                Log.d(TAG,sb.toString());

            }else{
                Log.d(TAG,urlConnection.getResponseMessage());
            }

        }catch (JSONException e){
            Log.d(TAG,"Creating jason faild");
        }catch (MalformedURLException u){
            Log.d(TAG,"MalformedURLException");
        }catch (IOException e){
            Log.d(TAG,"IOException");
        }
        return null;
    }
}
