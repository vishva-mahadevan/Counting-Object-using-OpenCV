import React,{useRef,useState} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

let cameraOpacity = 1;
const URL = "http://192.168.42.66:8000"


function CameraComponent({ navigation }) {
    // States for Cameras 
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [currImage, setCurrImage] = useState('');

    // States For Animation
    const [pressed, setPressed] = useState(false);
    const [response, setResponse] = useState(false);

    const camera = useRef(null);
    // State for Camera Ending


    // CONSTANTS 

    if (pressed)
        cameraOpacity = 0.9
    // END CONSTANTS


    // Functions
    async function pasteTextInScreen() {
        const response = await fetch(URL + '/paste', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.msg;

    }
    async function fetchText(imageUrl) {
        const formData = new FormData();
        formData.append('data', {
            uri: imageUrl,
            name: "image",
            type: "image/jpg"
        });

        const response = await fetch(URL + "/detectobjects", {
            method: 'POST',
            body: formData,
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },

        })
        let res = await response.json();
        return res.res;
    }

    async function takePicture() {
        const options = {
            skipProcessing: true,
            exif: false,
            quality: 0
        }

        let photo = await camera.current.takePictureAsync(options);
        const { uri } = await ImageManipulator.manipulateAsync(
            photo.uri,
            [
            ]
        );

        let cropphoto = await camera.current.takePictureAsync(options);
        const { cropuri } = await ImageManipulator.manipulateAsync(cropphoto.uri, [
            { resize: { width: 256, height: 512 } },
            { crop: { originX: 0, originY: 128, width: 256, height: 256 } },
        ]);


        setCurrImage(uri);
        console.log(cropuri);
        const response = await fetchText(uri);
        return response;
    }
    // END functions

    // Handlers
    async function onPressInHandler() {
        setPressed(true);
        const response = await takePicture();
        if (response === 'success') {
            setResponse(true);
            setPressed(false);
        }
    }

    async function onPressOutHandler() {
        
    }
    // End Handlers
    return (
        <View style={styles.container}>
            <View style={styles.container__sub}></View>
            <Camera style={{ flex: 1, opacity: cameraOpacity }} type={type} ratio="2:1" ref={camera}>
                <TouchableWithoutFeedback onPressIn={onPressInHandler} onPressOut={onPressOutHandler} >
                    <View style={styles.cameracontainer__touch}>
                    </View>
                </TouchableWithoutFeedback>
            </Camera>
            {response && currImage !== '' ? (
                <View pointerEvents="none" style={styles.resultImgView}>
                    <Image
                        style={styles.resultImg}
                        source={{ uri: currImage }}
                        resizeMode='contain'
                    />
                </View>
            ) : null}
        </View>
    )
}

export default CameraComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container__sub: {
        backgroundColor: "#000"
    },
    camera__container: {
        flex: 1,
    }
    ,
    cameracontainer__touch: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: 'row'
    },
    resultImgView: {
        position: "absolute",
        zIndex: 200,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    resultImg: {
        position: "absolute",
        zIndex: 300,
        top: "25%",
        left: 0,
        width: "100%",
        height: "50%",
    },

})
