import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';

import { db } from '../../firebase';

import Layout from "../../layouts/Main";
import { ChatShowStyles } from "../../styles/Chat/ChatShowStyles";

  
export default function JoinScreen({ navigation, route }) {
  const [roomId, setRoomId] = useState(route.params.my_id > route.params.op_id ? `${route.params.my_id}_${route.params.op_id}` : `${route.params.op_id}_${route.params.my_id}`);
  const [roomRef, setRoomRef] = useState();
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [localPC, setLocalPC] = useState(new RTCPeerConnection({
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
      iceCandidatePoolSize: 10,
  }));

  const onBackPress = () => {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();

    db.collection('rooms').doc(roomId).delete().then(() => {
      navigation.navigate("ChatShow", {id: route.params.op_id});
    });
  }

  useEffect(() => {
    startLocalStream();
    return;
  }, [navigation]);

  useEffect(() => {
    setRoomRef(db.collection('rooms').doc(roomId));
    db.collection('rooms').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if(change && change.type == 'removed')
          onBackPress();
      });
    })
    return;
  }, [navigation, db]);

  useEffect(() => {
    joinCall(roomId);
    return;
  }, [navigation, localStream, roomRef]);

  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };

    setLocalStream(await mediaDevices.getUserMedia(constraints));
  };

  const joinCall = async id => {
    try{
      const roomSnapshot = await roomRef.get();

      if (!roomSnapshot || !roomSnapshot.exists) return
      localPC.addStream(localStream);


      const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
      localPC.onicecandidate = e => {
        if (!e.candidate) {
          return;
        }
        calleeCandidatesCollection.add(e.candidate.toJSON());
      };

      localPC.onaddstream = e => {
        if (e.stream && remoteStream !== e.stream) {
          setRemoteStream(e.stream);
        }
      };

      const offer = roomSnapshot.data().offer;
      await localPC.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await localPC.createAnswer();
      await localPC.setLocalDescription(answer);
    
      const roomWithAnswer = { answer };
      await roomRef.update(roomWithAnswer);

      roomRef.collection('callerCandidates').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === 'added') {
            let data = change.doc.data();
            try{
              await localPC.addIceCandidate(new RTCIceCandidate(data));
            } catch (e) {}
          }
        });
      });

      setCachedLocalPC(localPC);
    } catch (e) {}
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };


  return (
    <Layout>
      <View style={ChatShowStyles.controlsWrapper}>
          <View style={ChatShowStyles.buttonWrapper}>
              <Button 
                  icon={<Icon name="phone-slash" type="font-awesome-5" size={32} color="#006D9B"/>} 
                  onPress={ onBackPress }
                  type='clear'
              />
          </View>

          <View>
              <Button 
                      icon={<Icon name="camera" type="font-awesome-5" size={25} color="#006D9B"/>} 
                      onPress={ switchCamera } 
                      style={ChatShowStyles.buttonWrapper}
                      type='clear'
                  />
          </View>

          <View>
            {!isMuted && 
              <Button 
                  icon={<Icon name="volume-mute" type="font-awesome-5" size={25} color="#006D9B"/>} 
                  onPress={ toggleMute } 
                  style={ChatShowStyles.buttonWrapper}
                  type='clear'
              />
            }
            {isMuted && 
            
              <Button 
                  icon={<Icon name="volume-up" type="font-awesome-5" size={25} color="#006D9B"/>} 
                  onPress={ toggleMute } 
                  style={ChatShowStyles.buttonWrapper}
                  type='clear'
              />
            }
          </View>
      </View>

      <View style={{ padding: 10, height: '100%' }} >
        <View style={styles.rtcview}>
          {localStream && <RTCView style={styles.rtc} streamURL={localStream && localStream.toURL()} />}
        </View>
        <View style={styles.rtcview}>
          {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream && remoteStream.toURL()} />}
        </View>
      </View>

    </Layout>
  )
}

const styles = StyleSheet.create({
  rtcview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 5,
    minHeight: 150
  },
  rtc: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: 300,
  },
});