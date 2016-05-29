
keytool -genkey -v -keystore tback-v1-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore tback-v1-key.keystore D:\www\phone\2tback\platforms\android\build\outputs\apk\android-release-unsigned.apk alias_name

cd /d D:\Program Files\Android\sdk\build-tools\22.0.1

zipalign -v 4 D:\www\phone\2tback\platforms\android\build\outputs\apk\android-release-unsigned.apk D:\www\phone\2tback\platforms\android\build\outputs\apk\2tback.apk